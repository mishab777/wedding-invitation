# Islamic Wedding Invitation — Aisha & Ahmed

A premium, cinematic Islamic wedding invitation site built with **Next.js + MUI + Framer Motion**. Minimal luxury aesthetic, warm gray / soft brown / ivory / gold palette, animated date reveal, countdown, Islamic ornaments, embedded Google Maps, RSVP, and a soft nasheed that fades in when the wedding date is revealed.

## Run it

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Stack

- Next.js 14 (pages router) + React 18
- Material-UI v5 (`@mui/material`) with custom theme — emotion SSR wired in `pages/_document.js`
- Framer Motion for cinematic reveals, stagger, parallax, scroll-triggered transitions
- Google Fonts: Cormorant Garamond (display), Inter (body), Amiri (Arabic calligraphy)

## What's inside

| Section | Component | Notes |
|---|---|---|
| Loader | `Loader.js` | Premium first-impression — animated gold ornament + bismillah |
| Navbar | `Navbar.js` | Glass-blur on scroll, audio toggle in top-right |
| Hero | `Hero.js` | Names in 128px italic serif, parallax glow, bride/groom portrait arches |
| Date Reveal | `DateReveal.js` | Cinematic letter-by-letter reveal — triggers nasheed fade-in |
| Countdown | `Countdown.js` | Live D/H/M/S with gilded corner accents |
| Events | `Events.js` | Nikah + Walima cards |
| Story | `Story.js` | Vertical timeline alternating left/right |
| Gallery | `Gallery.js` | Mosaic of cinematic gradient tiles, hover-zoom |
| Quotes | `Quotes.js` | Arabic + English with mosque silhouette backdrop |
| Location | `Location.js` | Embedded Google Maps (sepia-tinted) + directions CTA |
| RSVP | `RSVP.js` | MUI form with gold field accents, snackbar confirmation |
| Footer | `Footer.js` | Closing du'a in Arabic + English |

Routes: `/` is the real invitation (loader → open → scroll). `/sample` is the same page pre-opened for scroll-video capture — see below.

## The nasheed reveal

The audio system lives in `src/components/AudioController.js` — it exposes `play() / pause() / toggle()` via a ref. When the user scrolls the date-reveal section into view, `pages/index.js` calls `audioRef.current?.play()`, which fades volume from 0 → 0.45 over ~2.6s using `requestAnimationFrame` easing. The pause path mirrors the same fade going down. A subtle bottom-center toast announces the audio.

To enable: drop a soft nasheed at `public/audio/nasheed.mp3` (see `public/audio/README.txt`).

**Autoplay note:** browsers block audio that plays without a user gesture. If autoplay is blocked, the toast invites the user to tap the speaker icon in the navbar.

## `/sample` — the scroll-video capture route

`pages/sample.js` renders the invitation exactly as it looks **after** the "Open Invitation" button is clicked, so a scroll-video / scroll-capture service can record the whole page without needing to click or scratch anything.

Visit http://localhost:3000/sample

What it changes versus `/`:

- **No `Loader`** — the page is scrollable the instant it loads, no click gate.
- **No `AudioController`** — capture tools run muted and browsers block autoplay anyway. The navbar's speaker icon is hidden (`showAudio={false}`) with the toolbar spacing preserved.
- **The date card reveals itself** — `DateReveal` is passed `autoReveal`, so `ScratchCard` wipes its gold cover away ~900 ms after scrolling into view instead of waiting for a scratch gesture that a capture tool can't perform.
- **`noindex, nofollow`** so the preview route never gets crawled.

### Query flags

| Flag | Effect |
|---|---|
| `?instant=1` | Pre-plays every scroll-triggered animation — sweeps the full page once behind an opaque cover, waits for the last entrance to settle, then returns to the top. Use this if your capture tool scrolls fast, otherwise sections get filmed mid-fade. Allow ~6 s after load before recording. |
| `?nav=0` | Hides the fixed navbar (it would otherwise sit in every single frame). |
| `?confetti=0` | Skips the confetti burst on the date reveal. |

Combine them: `/sample?instant=1&nav=0`

Every `whileInView` animation in the project uses `viewport={{ once: true }}`, which is what makes `instant=1` work — once a section has been seen and settled, it stays settled for the real capture pass.

**Note on the map:** the Location section is a live Google Maps `iframe`. Some headless capture services block third-party frames — if the map comes out blank in your video, that's the capture service, not the page.

## Customising

| Want to change | Where |
|---|---|
| Names, date, venue, events | `src/config/wedding.js` |
| Colour palette | `src/theme/theme.js` — `palette` export |
| Portrait photos | Drop into `public/images/`, pass `image="/images/bride.jpg"` in `src/components/Hero.js` |
| Map location | `WEDDING.venue.mapsQuery` in `src/config/wedding.js` |
| Story timeline entries | `moments` array in `src/components/Story.js` |
| Quranic quotes | `quotes` array in `src/components/Quotes.js` |

## Asset notes

The page is designed to look complete **without** any images — portrait cards fall back to an elegant gold monogram, and gallery tiles use cinematic gradients. Add your own photos when ready.

## Browser support

Tested on modern Chrome, Edge, Safari, Firefox. Uses `aspect-ratio`, `backdrop-filter`, and modern CSS gradients — degrades gracefully.
