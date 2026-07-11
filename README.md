# Pedro's Lawn & Detail

Local lawn care and interior car detailing in St. Thomas, Ontario. Zero-build static site hosted on GitHub Pages.

**Live:** https://guptamr.github.io/pedroslawnanddetail/

---

## Structure

```
index.html             Single-page site (9 sections + lightbox)
site.config.js         ⭐ Central contact/form config — edit here to update phone, email, socials, form target
css/style.css          Design tokens + all styles (mobile-first)
js/main.js             Vanilla JS (IIFE) — nav, gallery, lightbox, form UX
images/                Real before-and-after photos (see images/CREDITS.md)
scripts/               Image processing helpers
CNAME                  Empty — populate when a custom domain is purchased
PLAN.md                Full implementation plan
```

## Local preview

```bash
# From the repo root, either:
python3 -m http.server 8080
# or
npx http-server -p 8080 -c-1 .
```

Open http://localhost:8080

## Deploy

Every push to `main` publishes to GitHub Pages within ~60 seconds:

```bash
git add .
git commit -m "Describe change"
git push
```

## Contact form (Web3Forms)

The quote form on the live site posts to [Web3Forms](https://web3forms.com/) which emails submissions (plus any attached photos) to whichever address you configure.

### One-time setup

1. Go to https://web3forms.com/ and enter Peter's email (e.g. `aliziapeters2000@gmail.com`).
2. Click the verification link Web3Forms emails you.
3. Copy the access key they display.
4. Open [`site.config.js`](./site.config.js) and replace `YOUR-WEB3FORMS-ACCESS-KEY-HERE` with the real key.
5. Commit and push. The form activates immediately.

**Free tier limits:** 250 submissions/month, up to 5 files + 10 MB total per submission. No credit card required.

## Updating contact info

Open [site.config.js](./site.config.js) and edit values under `contact`:

```js
contact: {
  phone: null,          // Not shown publicly — leave null
  phoneDisplay: null,   // Not shown publicly — leave null
  email: "aliziapeters2000@gmail.com",  // Only used for reference; the form goes via Web3Forms
  facebook: null,       // Not shown publicly — leave null
  instagram: null
}
```

The public site currently exposes **no** direct phone / email / social channels — the contact form is the only inbound route. Set any of the above to a real value if you later want to expose it (the site config-binder will wire it up automatically for future contact cards).

## Contact form

Form posts to [FormSubmit](https://formsubmit.co) → delivers to `aliziapeters2000@gmail.com`. After the first real submission, click the verification link in the inbox to activate the form.

## Replacing placeholder reviews

The **What Customers Say** section ships with 3 sample reviews clearly marked with a "Placeholder review" badge (see [PLAN.md §6.7](./PLAN.md#67-reviews--star-ratings-decorative-placeholder)). To swap in real ones:

1. Open `index.html` and find the `<!-- PLACEHOLDER REVIEWS -->` comment.
2. Replace the three `.review` cards' quote and attribution text.
3. Delete the `<span class="review__badge">Placeholder review</span>` line from each card.

## Custom domain (future)

When Pedro buys a domain, follow [PLAN.md §14](./PLAN.md#14-custom-domain-future) — populate `CNAME` and add DNS records at the registrar.
