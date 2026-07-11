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
      // Phone + Email intentionally not exposed on the public site.
      // The contact form still routes email to `form.endpoint` below (invisible to visitors).
      // ------------------------------------------------------------
      // TODO: replace `facebook` with Peter's actual Marketplace profile URL.
      // How to grab it: open Peter's Marketplace profile in the Facebook app
      //   → tap the ⋯ in the top-right → "Copy link"
      //   → paste it here (should look like
      //     https://www.facebook.com/marketplace/profile/1234567890 or
      //     https://www.facebook.com/peta.harder).
      phone: null,
      phoneDisplay: null,
      email: 'aliziapeters2000@gmail.com',
      facebook: 'https://www.facebook.com/marketplace/',
      instagram: null
    },
    location: {
      city: 'St. Thomas',
      region: 'Ontario',
      country: 'Canada',
      areaServed: 'St. Thomas and surrounding areas'
    },
    form: {
      endpoint: 'https://formsubmit.co/aliziapeters2000@gmail.com',
      redirectAfter: 'https://guptamr.github.io/pedroslawnanddetail/?thanks=1#contact',
      subject: "New quote request — Pedro's Lawn & Detail"
    }
  };
})();
