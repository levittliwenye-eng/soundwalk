# Soundwalk

A small, browser-local listening-walk companion. Capture eight seconds or choose a short audio file; the open YAMNet model suggests broad sound events, and Soundwalk offers a short outdoor listening mission. Save an observation in a device-local pocket journal or export the notes as CSV.

Created on 2026-10-08 for the DEV Hacktoberfest Open-Source AI Week 1 “Touch Grass” challenge. Not yet submitted. Developed by an AI agent with the account owner's authorization; no outdoor field testing is claimed.

## Run

Requires Node.js for checks and Python 3 for the local static server. No package installation or API key is required: the runtime and model are vendored under `dist/`.

```
npm test
npm run check
npm run dev
```

Open http://127.0.0.1:8766/ . Microphone recording requires a secure context (localhost or HTTPS), explicit visitor permission, and MediaRecorder support. Use file selection or the credited reference clips if recording is unavailable.

## What runs locally

- MediaPipe Tasks Audio 1.1.0 in a module Web Worker.
- YAMNet classification model, 521 broad audio event classes.
- Decoding and downmixing audio in Web Audio; MediaPipe receives the actual sample rate and handles model preprocessing.
- The mean of each category's score across **all returned frames and all classes**, rather than taking only a cherry-picked frame.
- Conservative mission suggestions: scores below 0.2 do not trigger a category-specific mission. This threshold is a product heuristic, not a validated operating point.
- Browser localStorage stores only notes and the top suggestions, up to 100 observations. No audio persistence, location collection, accounts or server API.
- Service worker caches the app, model, runtime and reference clips. “Offline copy ready” only appears after all cache entries install. Reopening an owner-private deployment may still need online authentication. Runtime is not presented as verified on all browsers or devices.

MediaPipe's upstream notice says input stays on device and performance/utilization metrics are sent to Google. Soundwalk vendors its assets and sets `connect-src 'self'` in a Content-Security-Policy to block external connections. Its worker inherits this policy. Refer to the upstream notice in `dist/vendor/README.md`. No external CDN is used.

## Verification

Local browser observations on 2026-10-08, with the real model and credited 8-second reference clips:

| Input | Top model suggestion | Mean score shown |
|---|---|---:|
| birds2.wav excerpt | Bird vocalization, bird call, bird song | 0.603 |
| rain.wav excerpt | Rain | 0.507 |

Bird reference also returned Bird 0.596 and Animal 0.567; rain also returned Water 0.467 and Rain on surface 0.286. Model score is not a calibrated probability. These are two examples, **not** a general accuracy benchmark. No bird-species recognition is offered. Unit checks cover frame aggregation, conservative mission handling and CSV escaping. Browser journal save was exercised.

## Limitations

No outdoor field test or user-study evidence. Microphone permissions, background recording and phone behavior need testing on real devices. Long files are rejected (1–30 seconds, max 10 MiB). Recognition can be wrong, especially for mixed sounds, wind and rare categories. The project encourages observation rather than claiming identification. The model score is not a measure of recording quality, physical sound level or safety.

## Licenses

Application: Apache-2.0; runtime and model: Apache-2.0. Birdsong reference: CC0 1.0. Rain reference: CC BY 4.0, with attribution and excerpt changes documented. Synthetic reference: CC0. See `dist/THIRD-PARTY-NOTICES.txt`, the Apache `LICENSE`, and the model/runtime license files. Source origins and sample credits are retained. Do not remove those notices when republishing.
