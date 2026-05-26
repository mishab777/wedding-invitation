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

## The nasheed reveal

The audio system lives in `src/components/AudioController.js` — it exposes `play() / pause() / toggle()` via a ref. When the user scrolls the date-reveal section into view, `pages/index.js` calls `audioRef.current?.play()`, which fades volume from 0 → 0.45 over ~2.6s using `requestAnimationFrame` easing. The pause path mirrors the same fade going down. A subtle bottom-center toast announces the audio.

To enable: drop a soft nasheed at `public/audio/nasheed.mp3` (see `public/audio/README.txt`).

**Autoplay note:** browsers block audio that plays without a user gesture. If autoplay is blocked, the toast invites the user to tap the speaker icon in the navbar.

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
