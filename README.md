# Algebra Quest

A single-file, quest-themed Algebra 1 practice app published as a claude.ai artifact.
Live artifact: https://claude.ai/artifact/RbaM9DamvxqEwj7JNi9sjy

## Layout
- `algebra-quest.html` — the built page. This is the file to publish with the Artifact tool
  (capabilities: `sample`, `db`, `user`). It has no doctype/head of its own; the artifact
  publisher wraps it.
- `src/` — the page in pieces, concatenated in order by `build.sh`:
  - `00-head.html` title, styles, HTML shell
  - `01-math.js` expression parser and equivalence checks
  - `02-data.js` the 19 test sub-parts, misconception hints, parent-guide content, `PARENT_PASSPHRASE`
  - `03-engine.js` state, persistence (db), HUD, lobby, gate, hint picker
  - `04-check.js` grading, widgets (number line, order, choice), Check My Answers
  - `05-practice.js` Final Boss generator, grading, results, AI diagnosis
  - `06-learn.js` six Learn levels: interactives, scenes, mini-bosses
  - `07-parent.js` parent guide and dashboard
  - `08-main.js` boot and capability wiring
- `tests/` — Node and Playwright checks. `test-math.js` and `test-gen.js` run with plain Node from `src/`;
  the others need Playwright and a wrapped `harness.html` (see `tests/test-ui.js` for the wrapper).

## Build
    ./build.sh

## Editing the passphrase
Change `PARENT_PASSPHRASE` at the top of `src/02-data.js`, rebuild, republish.
