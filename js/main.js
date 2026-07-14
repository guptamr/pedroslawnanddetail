/* =============================================================
   Pedro's Lawn & Detail — main.js
   Vanilla JS, IIFE, strict mode, no dependencies.
   Section map mirrors PLAN.md §16 Phase 4.
   ============================================================= */
(function () {
  'use strict';

  /* -----------------------------------------------------------
     1. CONFIG BINDER
     ----------------------------------------------------------- */
  function getConfigValue(path) {
    var config = window.SITE_CONFIG || {};
    var keys = String(path || '').split('.');
    var value = config;
    for (var i = 0; i < keys.length; i++) {
      if (value == null) return null;
      value = value[keys[i]];
    }
    return value == null || value === '' ? null : value;
  }

  /* Compression settings */
  var MAX_UPLOAD_FILES = 5;
  var COMPRESS_MAX_PX  = 1200;   // resize longest side to this
  var COMPRESS_QUALITY = 0.65;   // JPEG quality ~65%
  var compressedFiles  = [];     // [{blob, name, size}]

  function humanBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function bindConfig() {
    // 1a. Hide blocks whose required config value is falsy
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-config-required]'),
      function (el) {
        var val = getConfigValue(el.getAttribute('data-config-required'));
        if (!val) el.setAttribute('hidden', '');
        else el.removeAttribute('hidden');
      }
    );

    // 1b. Set text content
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-config-text]'),
      function (el) {
        var val = getConfigValue(el.getAttribute('data-config-text'));
        if (val) el.textContent = val;
      }
    );

    // 1c. Set href (tel: prefix unless value starts with http)
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-config-href]'),
      function (el) {
        var val = getConfigValue(el.getAttribute('data-config-href'));
        if (!val) return;
        el.setAttribute('href', /^https?:\/\//.test(val) ? val : 'tel:' + val);
      }
    );

    // 1d. Set mailto: href
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-config-href-mail]'),
      function (el) {
        var val = getConfigValue(el.getAttribute('data-config-href-mail'));
        if (val) el.setAttribute('href', 'mailto:' + val);
      }
    );

    // 1e. Update contact form endpoint + hidden fields from config
    var form = document.getElementById('contactForm');
    if (!form) return;

    // Build the endpoint URL from the configured formId if available,
    // otherwise fall back to the full endpoint string.
    var formId = getConfigValue('form.formId');
    var endpoint = formId && formId !== 'YOUR-FORMINIT-FORM-ID'
      ? 'https://app.forminit.com/f/' + formId
      : getConfigValue('form.endpoint');
    if (endpoint) form.setAttribute('action', endpoint);

    var nextInput = form.querySelector('[data-form-next]');
    var nextVal = getConfigValue('form.redirectAfter');
    if (nextInput && nextVal) nextInput.value = nextVal;

    var subjInput = form.querySelector('[data-form-subject]');
    var subjVal = getConfigValue('form.subject');
    if (subjInput && subjVal) subjInput.value = subjVal;
  }

  /* -----------------------------------------------------------
     2. STICKY HEADER
     ----------------------------------------------------------- */
  function initStickyHeader() {
    var header = document.querySelector('[data-site-header]');
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
      ticking = false;
    }
    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* -----------------------------------------------------------
     3. MOBILE NAV DRAWER
     ----------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav    = document.getElementById('primary-nav');
    var bdrop  = document.getElementById('navBackdrop');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      if (bdrop) {
        bdrop.hidden = !open;
        if (open) bdrop.style.display = 'block';
        else bdrop.style.display = '';
      }
    }

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    // Close on any nav-link click
    Array.prototype.forEach.call(nav.querySelectorAll('[data-nav-link]'), function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    // Escape closes
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
    });

    // Backdrop click closes
    if (bdrop) {
      bdrop.addEventListener('click', function () { setOpen(false); });
    } else {
      // Fallback: click outside nav
      document.addEventListener('click', function (e) {
        if (!nav.classList.contains('is-open')) return;
        if (nav.contains(e.target) || toggle.contains(e.target)) return;
        setOpen(false);
      });
    }

    // Reset at tablet+
    var mql = window.matchMedia('(min-width: 768px)');
    var onChange = function () { if (mql.matches) setOpen(false); };
    if (typeof mql.addEventListener === 'function') mql.addEventListener('change', onChange);
    else if (typeof mql.addListener === 'function') mql.addListener(onChange);
  }

  /* -----------------------------------------------------------
     4. SERVICE PRESELECT
     ----------------------------------------------------------- */
  function preselectService(value) {
    var select = document.getElementById('service');
    if (!select || !value) return;
    var normalized = decodeURIComponent(String(value)).trim().toLowerCase();
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value.toLowerCase() === normalized) {
        select.selectedIndex = i;
        return;
      }
    }
  }

  function initServicePreselect() {
    // Intercept anchor clicks like href="#contact?service=Lawn%20Care"
    Array.prototype.forEach.call(
      document.querySelectorAll('a[href*="#contact?service="]'),
      function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          var href = a.getAttribute('href') || '';
          var match = href.match(/service=([^&]+)/);
          if (match) preselectService(match[1]);
          var contact = document.getElementById('contact');
          if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (history.replaceState) history.replaceState(null, '', '#contact');
        });
      }
    );

    // Honor ?service= URL param on load
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.has('service')) preselectService(params.get('service'));
    } catch (_) { /* URLSearchParams not supported — silent skip */ }
  }

  /* -----------------------------------------------------------
     5. GALLERY FILTERS
     ----------------------------------------------------------- */
  function initGalleryFilters() {
    var buttons = document.querySelectorAll('.filter-btn');
    var items = document.querySelectorAll('.gallery__item');
    var emptyMsg = document.getElementById('galleryEmpty');
    if (buttons.length === 0 || items.length === 0) return;

    function applyFilter(filter) {
      var visibleCount = 0;
      Array.prototype.forEach.call(items, function (item) {
        var cat = item.getAttribute('data-category');
        var visible = filter === 'all' || cat === filter;
        item.classList.toggle('is-hidden', !visible);
        if (visible) visibleCount++;
      });
      if (emptyMsg) emptyMsg.hidden = visibleCount > 0;
      lightboxRebuildList();
    }

    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter') || 'all';
        Array.prototype.forEach.call(buttons, function (b) {
          var active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        applyFilter(filter);
      });
    });
  }

  /* -----------------------------------------------------------
     6. LIGHTBOX
     ----------------------------------------------------------- */
  var lightboxState = { items: [], index: 0 };

  function lightboxRebuildList() {
    lightboxState.items = Array.prototype.slice.call(
      document.querySelectorAll('.gallery__item:not(.is-hidden)')
    );
  }

  function decodeEntities(str) {
    var tmp = document.createElement('div');
    tmp.innerHTML = String(str || '');
    return tmp.textContent || '';
  }

  function lightboxOpen(index) {
    var dlg = document.getElementById('lightbox');
    if (!dlg || lightboxState.items.length === 0) return;
    var len = lightboxState.items.length;
    lightboxState.index = ((index % len) + len) % len;
    var item = lightboxState.items[lightboxState.index];
    var img = dlg.querySelector('[data-lightbox-img]');
    var caption = dlg.querySelector('[data-lightbox-caption]');
    var srcImg = item.querySelector('img');

    if (img) {
      img.setAttribute('src', item.getAttribute('href'));
      img.setAttribute('alt', srcImg ? srcImg.getAttribute('alt') || '' : '');
    }
    if (caption) caption.textContent = decodeEntities(item.getAttribute('data-caption'));

    if (typeof dlg.showModal === 'function' && !dlg.open) dlg.showModal();
    else dlg.setAttribute('open', '');
    document.body.classList.add('nav-open');
  }

  function lightboxClose() {
    var dlg = document.getElementById('lightbox');
    if (!dlg) return;
    if (typeof dlg.close === 'function') dlg.close();
    else dlg.removeAttribute('open');
    document.body.classList.remove('nav-open');
  }

  function lightboxStep(delta) {
    lightboxOpen(lightboxState.index + delta);
  }

  function initLightbox() {
    var dlg = document.getElementById('lightbox');
    if (!dlg) return;

    lightboxRebuildList();

    // Click on any gallery item opens lightbox at its position
    Array.prototype.forEach.call(
      document.querySelectorAll('.gallery__item'),
      function (item) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          lightboxRebuildList();
          var idx = lightboxState.items.indexOf(item);
          lightboxOpen(idx >= 0 ? idx : 0);
        });
      }
    );

    var prev = dlg.querySelector('[data-lightbox-prev]');
    var next = dlg.querySelector('[data-lightbox-next]');
    if (prev) prev.addEventListener('click', function () { lightboxStep(-1); });
    if (next) next.addEventListener('click', function () { lightboxStep(1); });

    // Keyboard nav
    document.addEventListener('keydown', function (e) {
      if (!dlg.open) return;
      if (e.key === 'ArrowLeft')  { e.preventDefault(); lightboxStep(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); lightboxStep(1); }
    });

    // Backdrop click closes (click on the dialog itself — not the figure inside)
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg) lightboxClose();
    });

    // Cleanup on native close (Esc, form-method-dialog submit)
    dlg.addEventListener('close', function () {
      document.body.classList.remove('nav-open');
    });
  }

  /* -----------------------------------------------------------
     7. SCROLL REVEAL
     ----------------------------------------------------------- */
  function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (elements.length === 0) return;

    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(elements, function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    Array.prototype.forEach.call(elements, function (el) { observer.observe(el); });
  }

  /* -----------------------------------------------------------
     8. FORM UX
     ----------------------------------------------------------- */
  function initFormUX() {
    var form = document.getElementById('contactForm');
    var status = document.getElementById('formStatus');

    // Show success banner if returning after native form redirect (?thanks=1)
    // (fallback — should not normally trigger with the AJAX approach below)
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.has('thanks') && status) {
        status.hidden = false;
        status.classList.add('is-success');
        status.textContent =
          'Thanks! We received your quote request and will get back to you shortly.';
        if (form) form.reset();
        setTimeout(function () {
          status.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
        if (history.replaceState) {
          history.replaceState(null, '', window.location.pathname + '#contact');
        }
      }
    } catch (_) { /* URLSearchParams not supported — silent skip */ }

    if (!form) return;

    // --- AJAX submit: prevent full-page redirect, stay on our page ---
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Block if uploader has a pending error
      var uploaderErr = form.querySelector('[data-uploader-error]');
      if (uploaderErr && !uploaderErr.hidden) {
        uploaderErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      var btn = form.querySelector('[data-form-submit]');
      var btnText = form.querySelector('[data-form-submit-text]');
      if (btn) btn.disabled = true;
      if (btnText) btnText.textContent = 'Sending…';
      if (status) { status.hidden = true; status.className = 'form__status'; }

      var formId = getConfigValue('form.formId') || 'yzct3bz18ap';
      var endpoint = 'https://forminit.com/f/' + formId;

      // Build FormData — use compressed images instead of raw input files
      var fd = new FormData(form);
      try { fd.delete('fi-file-attachments[]'); } catch (_) { /* older browsers */ }
      compressedFiles.forEach(function (f) {
        fd.append('fi-file-attachments[]', f.blob, f.name);
      });

      fetch(endpoint, {
        method: 'POST',
        body: fd,
        redirect: 'manual'   // capture Forminit's 302 without following it
      })
      .then(function (res) {
        // 'opaqueredirect' means Forminit returned a 302 — submission accepted
        if (res.type === 'opaqueredirect' || res.ok) {
          // Success
          if (status) {
            status.hidden = false;
            status.classList.add('is-success');
            status.textContent =
              '✅ Thanks! We received your quote request and will be in touch within one business day.';
          }
          form.reset();
          // Also reset the uploader list
          var list = form.querySelector('[data-uploader-list]');
          if (list) { list.innerHTML = ''; list.hidden = true; }
          if (status) status.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          // Non-redirect, non-OK response — try to parse the error
          return res.text().then(function (body) {
            var parsed;
            try { parsed = JSON.parse(body); } catch (_) { parsed = null; }
            var msg = (parsed && parsed.message) ? parsed.message : 'Submission failed (HTTP ' + res.status + ')';
            throw new Error(msg);
          });
        }
      })
      .catch(function (err) {
        if (btn) btn.disabled = false;
        if (btnText) btnText.textContent = 'Request My Quote';
        if (status) {
          status.hidden = false;
          status.classList.add('is-error');
          // Human-friendly error message
          var msg = err && err.message;
          if (msg && msg.indexOf('TOO_MANY_REQUESTS') !== -1) {
            status.textContent = 'Please wait a few seconds before submitting again.';
          } else if (msg && msg.toLowerCase().indexOf('network') !== -1) {
            status.textContent = 'Network error — check your connection and try again.';
          } else {
            status.textContent = 'Something went wrong. Please try again or send us a message directly.';
          }
          status.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        console.error('[form] submission error:', err);
      });
    });
  }

  /* -----------------------------------------------------------
     9. FOOTER YEAR
     ----------------------------------------------------------- */
  function initFooterYear() {
    var el = document.getElementById('footerYear');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* -----------------------------------------------------------
     10. BOOTSTRAP
     ----------------------------------------------------------- */
  function boot() {
    bindConfig();
    initStickyHeader();
    initMobileNav();
    initServicePreselect();
    initGalleryFilters();
    initLightbox();
    initScrollReveal();
    initFormUX();
    initFooterYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
