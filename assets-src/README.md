# assets-src

Master files. **Nothing in here is served** — it is not part of the build.

Put originals here as they arrive from BSM: full-resolution photographs, logo
artwork, scans. Then run

```bash
npm run media            # only what changed
npm run media -- --force # everything
```

which walks every folder below, resizes each image and writes a **WebP** to the
same relative path under `public/`. SVG files are copied unchanged.

```
assets-src/                      public/
  brand/bsm-logo.jpg        →      brand/bsm-logo.webp
  brand/bsm-mark.svg        →      brand/bsm-mark.svg
  media/photos/*.jpg        →      media/photos/*.webp      (≤1800px, q80)
  media/services/*.jpg      →      media/services/*.webp    (≤1800px, q80)
  media/people/*.jpg        →      media/people/*.webp      (≤1400px, q84)
  media/clients/*.png       →      media/clients/*.webp     (≤640px, alpha kept)
```

`assets-src/originals/` holds files exactly as they were supplied (for
example a small logo that was upscaled to make its master). The pipeline does
not read it; it is the record of what arrived.

Keeping masters separate means an image can be re-cut later — a different crop,
a different size, a different format — without going through a lossy export
first. The dictionaries in [`lib/media`](../lib/media) name the files the site
actually uses.
