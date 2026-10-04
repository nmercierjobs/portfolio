# Project Architecture

- Keep detailed engineering proofs in dedicated routed pages linked from the relevant project approach, so the main case study remains scannable while technical depth stays accessible.
- Image captions use the shared `.figure-caption` class in `src/index.css` so caption size and color are tuned in one place instead of per-page Tailwind utilities.
- Project page body text uses the shared `.project-body` class in `src/index.css` so its font size is tuned in one place instead of per-page Tailwind utilities.
- Pages whose centered text should share the résumé's axis use the `.resume-axis` class, and the résumé's horizontal nudge comes from the `--content-center-offset-x` token in `src/index.css`, so both pages stay aligned from one value instead of duplicated offsets.