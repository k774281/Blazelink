# BlazeLink landing (Next.js)

The dark, section-by-section landing page in three languages: `/` (中文), `/en/`, `/ja/`.

```bash
npm install
npm run dev        # http://localhost:3000 (the repo's launch config uses 3003)
npm run build      # static export in out/, uploaded to /landing/ on the WordPress host
```

- Copy lives in `app/_data/{zh,en,ja}.js` (same shape in all three).
- Markup is `app/_components/Landing.jsx`; all motion (paging, blur transitions,
  background dust, hero nebula, morphing hero particles) is `app/_lib/landing-fx.js`.
- Headings use MiSans TC, subset to the characters in the copy. After changing copy,
  re-run `npm run fonts:subset` (needs `pip install fonttools brotli` and the MiSans
  woff2 files, by default in `~/Downloads/MiSans TC/woff2`).
