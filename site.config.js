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
      // Leave null/empty until Pedro confirms — the phone card auto-hides
      phone: null,               // e.g. "+15195551234"
      phoneDisplay: null,        // e.g. "(519) 555-1234"
      email: 'aliziapeters2000@gmail.com',
      facebook: null,            // e.g. "https://www.facebook.com/..."
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
