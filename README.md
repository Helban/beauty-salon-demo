# Luméa — beauty salon website (demo)

A single-page marketing site for a fictional beauty salon, built to show how a
premium salon/spa site looks and performs when it is hand-coded instead of
assembled from a heavy WordPress theme. No framework, no build step, no page
builder. Just semantic HTML, one CSS file, and ~150 lines of vanilla JS.

**Live demo:** _deploy to Netlify/Vercel/GitHub Pages, then put the URL here._

![Luméa beauty salon demo](https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=60)

## Why it exists

Salon clients on freelancing platforms almost always ask for the same brief:
modern WordPress site, 6 sections, strong technical SEO, fast loading, premium
mobile-first look. This demo is the reference build for that brief. It covers
every common requirement and ships with Core Web Vitals already in the green,
which is usually the hardest part of those jobs to deliver on WordPress.

## What it includes

| Brief requirement | How it is covered here |
|---|---|
| 6 sections | Hero, O nas, Usługi, Realizacje/Galeria, Blog, Kontakt (single-page, anchor nav) |
| Slider | Hero image slider, auto-advance + dot controls, pauses on hover |
| Contact form | Client-side validation, inline errors, focus management, accessible status message |
| Google Maps | Embedded map, lazy-loaded so it does not block first paint |
| Blog | Three article teaser cards with date, category, excerpt |
| Technical SEO | Semantic headings, meta description, Open Graph, canonical, `JSON-LD` `BeautySalon` schema, `sitemap.xml`, `robots.txt` |
| Performance / Core Web Vitals | LCP image preloaded with `fetchpriority`, every image has fixed dimensions (no layout shift), below-the-fold images lazy-loaded, fonts loaded with `display=swap` |
| Premium responsive design | Mobile-first CSS, breakpoints at 560 / 620 / 760 / 820 / 920 / 980, Playfair Display + Inter, rose-gold and ivory palette |
| Accessibility | Skip link, visible focus states, `aria` on nav and slider, labelled form fields, `prefers-reduced-motion` support, AA contrast |

## Stack

- HTML5, semantic and accessible
- Modern CSS with custom properties, grid, `clamp()`, container max-width, no preprocessor
- Vanilla JavaScript for the slider, lightbox, mobile menu, and form validation
- Google Fonts (Playfair Display + Inter)
- Demo photos hotlinked from Unsplash via their image CDN

## Project structure

```
beauty-salon-demo/
├── index.html        # all markup + structured data
├── css/styles.css    # design tokens + components, mobile-first
├── js/main.js        # slider, lightbox, nav, form validation
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

## Run locally

No build needed. Any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Drag the folder onto Netlify Drop, or connect the repo to Vercel or GitHub
Pages. It is fully static, so hosting is free on all three.

## Notes for a real project

A production build for a paying salon would change two things:

1. **Self-host the photos.** The demo hotlinks Unsplash so it looks real out of
   the box. A real build serves the client's own photos, resized and converted
   to WebP/AVIF, from the same domain. That pushes the Lighthouse performance
   score higher still and removes the third-party dependency.
2. **Wire the contact form to a real endpoint.** Right now the form validates
   and confirms in the browser only. In production it posts to an email service
   (Formspree, a serverless function, or the client's CRM/booking tool).

If the client specifically needs WordPress for self-service editing, the same
design, sections, and performance budget map onto a lightweight block theme. The
markup and CSS here are the design source of truth either way.
