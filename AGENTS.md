# Project Architecture

- Keep detailed engineering proofs in dedicated routed pages linked from the relevant project approach, so the main case study remains scannable while technical depth stays accessible.
- Image captions use the shared `.figure-caption` class in `src/index.css` so caption size and color are tuned in one place instead of per-page Tailwind utilities.
- Project page body text uses the shared `.project-body` class in `src/index.css` so its font size is tuned in one place instead of per-page Tailwind utilities.