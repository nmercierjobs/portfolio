# Looping MP4 support for project media

## What will change
- Allow each project's `image` and `detailImage` value to point to either an image or an MP4 file.
- Render MP4 files as muted, inline, automatically playing, looping video while preserving the existing size, crop, rounded corners, and link behavior.
- Keep the current lazy-loading and loading-placeholder behavior for both images and videos.

## Technical details
- Extend the shared media reveal component to detect `.mp4` sources, including URLs with query strings or fragments.
- Use a native video element with `autoPlay`, `muted`, `loop`, and `playsInline`; keep the existing image path unchanged.
- Verify existing project images still render and add a focused behavior test if the project already has a matching test setup.
