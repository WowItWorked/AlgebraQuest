# Algebra Quest

A single-file, quest-themed Algebra 1 practice app published as a claude.ai artifact.
Live artifact: https://claude.ai/artifact/RbaM9DamvxqEwj7JNi9sjy

## Layout
- `algebra-quest.html` — the built page. This is the file to publish with the Artifact tool
  (capabilities: `sample`, `db`, `user`). It has no doctype/head of its own; the artifact
  publisher wraps it.
- `src/` — the page in pieces, concatenated in order by `build.sh` (see the order in `build.sh`):
  - `00-head.html` title, styles, HTML shell
  - `01-math.js` expression parser and equivalence checks
  - `02-data.js` the 19 test sub-parts, misconception hints, parent-guide content, `PARENT_PASSPHRASE`
  - `03-engine.js` state, persistence (db), HUD, lobby, gate, hint picker
  - `04-check.js` grading, widgets (number line, order, choice), Check My Answers
  - `05-practice.js` Final Boss generator, grading, results, AI diagnosis
  - `06-learn.js` six Learn levels: interactives, scenes, mini-bosses
  - `07-parent.js` parent guide and dashboard
  - `08-main.js` boot and capability wiring
  - `09-voices.js` generated clip durations (from `tools/voices.mjs`)
  - `10-u1r.js` Unit 1 Review Materials: items, guide, examples, boss generator
  - `11-u1r-learn.js` Unit 1 Review: scenes, interactives, mini-bosses
  - `12-extras.js` avatar + coin shop, journal, rematch chest, read-aloud
  - `99-main.js` boot, routing, capability wiring, profile merge
- `voices/` — one MP3 per scene line (`l*` for Unit 1, `r-l*` for the Review) and `voices/ra/` read-aloud clips for every Check and mini-boss question, published alongside the page; rendered by `tools/voices.mjs`
  (needs `piper`, `ffmpeg`, and the Piper voice models in `tools/piper-models/` or `$PIPER_VOICES`).
  The cast and processing are at the top of that script. Rerun it after editing any scene line.
- `tests/` — Node and Playwright checks. `test-math.js` and `test-gen.js` run with plain Node from `src/`;
  the others need Playwright and a wrapped `harness.html` (see `tests/test-ui.js` for the wrapper).

## Build
    ./build.sh

## Editing the passphrase
Change `PARENT_PASSPHRASE` at the top of `src/02-data.js`, rebuild, republish.

## Adding a unit
Register it in `UNITS` (see `src/10-u1r.js` for the full shape: LEVELS, PROBLEMS, ITEMS, GUIDE, EXAMPLES, SKILLS, genTest, SCENES, EXPLAINERS, MINI, EXPL_HOW, a `voice` prefix) and give it a slot in `MAP_SLOTS` in `src/02-data.js`. Rerun `tools/voices.mjs`, rebuild, publish the new clips with the page.

## Tests
`node tests/test-math.js`, `node tests/test-gen.js`, `node tests/test-gen-r.js` need only Node. The browser suites need Playwright and `tests/mkharness.sh`: `test-all.js` (regression, both modes), `test-tracking.js` (persistence with a slow sign-in and reloads), `test-review.js` (every review item, level, and a boss run).
