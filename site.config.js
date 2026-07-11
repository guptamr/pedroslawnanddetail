/* site.config.js — central configuration for Pedro's Lawn & Detail
 * Update these values to change contact info, service area, or form endpoint.
 * The site reads this file at load time — no rebuild required.
 * PLAN.md §12 references this file.
 */
(function () {
  'use strict';
  window.SITE_CONFIG = {
    brand: {
      name: "Pedro's Lawn & Detail",
      tagline: 'Local lawn care & car detailing in St. Thomas, Ontario'
    },
    contact: {
      // Phone / email / social channels are intentionally hidden from the public site.
      // The contact form (Forminit) is the only visible way to reach the business.
      phone: null,
      phoneDisplay: null,
      email: 'aliziapeters2000@gmail.com',
      facebook: null,
      instagram: null
    },
    location: {
      city: 'St. Thomas',
      region: 'Ontario',
      country: 'Canada',
      areaServed: 'St. Thomas and surrounding areas'
    },
    form: {
      // -----------------------------------------------------------------
      // FORMINIT SETUP (one-time, ~60 seconds)
      // -----------------------------------------------------------------
      // Free tier: 100 submissions/month, 10MB file storage, file uploads
      // included. No credit card required.
      //
      // Steps:
      // 1. Go to https://app.forminit.com/register
      // 2. Sign up with Peter's email (aliziapeters2000@gmail.com).
      // 3. Click "Create Form" → give it any name, e.g. "Pedro Quote Form".
      // 4. Copy the form endpoint shown (looks like
      //    https://app.forminit.com/f/abc123xyz).
      // 5. Paste just the form ID (the bit after /f/) into `formId` below.
      // 6. Commit + push — the form activates immediately.
      // -----------------------------------------------------------------
      formId: 'YOUR-FORMINIT-FORM-ID',
      endpoint: 'https://app.forminit.com/f/YOUR-FORMINIT-FORM-ID',
      redirectAfter: 'https://guptamr.github.io/pedroslawnanddetail/?thanks=1#contact',
      subject: "New quote request — Pedro's Lawn & Detail"
    }
  };
})();
