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
      // The contact form (Web3Forms) is the only visible way to reach the business.
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
      // WEB3FORMS SETUP (one-time, ~30 seconds)
      // -----------------------------------------------------------------
      // 1. Go to https://web3forms.com/
      // 2. Enter Peter's real email (e.g. aliziapeters2000@gmail.com)
      //    — this is where quote requests + attached photos will arrive.
      // 3. Click the verification link Web3Forms emails you.
      // 4. Copy the access key they show you.
      // 5. Paste it below in place of YOUR-WEB3FORMS-ACCESS-KEY-HERE.
      // 6. Commit + push — the form starts working immediately.
      //
      // Free tier: 250 submissions/month, up to 5 files, 10 MB total per
      // submission. No credit card required.
      // -----------------------------------------------------------------
      accessKey: 'YOUR-WEB3FORMS-ACCESS-KEY-HERE',
      endpoint: 'https://api.web3forms.com/submit',
      redirectAfter: 'https://guptamr.github.io/pedroslawnanddetail/?thanks=1#contact',
      subject: "New quote request — Pedro's Lawn & Detail"
    }
  };
})();
