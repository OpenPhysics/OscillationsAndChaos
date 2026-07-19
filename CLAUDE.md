# CLAUDE.md — Oscillations And Chaos

Sim-specific context for AI assistants. General SceneryStack guidance: [OpenPhysics/.github/CLAUDE.md](https://github.com/OpenPhysics/.github/blob/main/CLAUDE.md).

## Project

Four classical-mechanics screens exploring oscillations and chaotic dynamics.

| Screen | Folder | Focus |
|---|---|---|
| Single Spring | `src/single-spring/` | Mass-spring, damping, gravity, energy graphs |
| Double Spring | `src/double-spring/` | Coupled oscillators, normal modes |
| Pendulum | `src/pendulum/` | Small/large angle, period measurement |
| Double Pendulum | `src/double-pendulum/` | Chaos, sensitive ICs, path tracing |

Shared code: `src/common/model/` (solvers, base models), `src/common/view/BaseScreenView.ts`.

## Numerical solvers

Configurable in preferences — RK4, adaptive RK45, Forest-Ruth PEFRL (symplectic), Dormand-Prince 8(7). Spring rendering: Classic coil vs parametric surface.

## Key files

| File | Purpose |
|---|---|
| `src/common/model/` | ODE integration, shared model base classes |
| `src/common/view/BaseScreenView.ts` | Shared view layout patterns |
| `src/OscillationsAndChaos*.ts` | Shared namespace and colors |
| `src/preferences/` | `OscillationsAndChaosPreferencesModel.ts`, `OscillationsAndChaosAudioPreferencesNode.ts`, `oscillationsAndChaosQueryParameters.ts` |
| `src/*/model/` | Per-screen physics state |
| `src/*/view/*ScreenView.ts` | Per-screen visualization |

Top-level shared files should use the repo-named `OscillationsAndChaos` prefix.

## Documented deviations (CONVENTIONS.md §2)

- **Constants are nested, not at `src/` root:** constants are split into topical files next to
  their consumers — `src/common/view/{UILayout,FontSize,SpringVisualization,VectorScale,ScreenIcon,GraphData,DialogAndPanel,ControlLayout}Constants.ts` and
  `src/common/util/AccessibilityDelayConstants.ts`. There is deliberately no root
  `OscillationsAndChaosConstants.ts`.
- **Extra `src/` root entries:** `src/assets/` (bundled screenshot asset), `src/doc/` (internal
  developer notes: `PROJECT_STRUCTURE.md`, `SCENERYSTACK_PATTERNS.md`), and `vite-env.d.ts`.
- **Inline screen summaries:** screens build their summary via `createScreenSummaryContent()`
  (see Accessibility below) instead of per-screen `*ScreenSummaryContent.ts` files — this is
  variant (b) of the shared a11y convention.

## Accessibility

Follows the shared [OpenPhysics accessibility convention](https://github.com/OpenPhysics/Baton/blob/main/ACCESSIBILITY.md).
Each screen's `createScreenSummaryContent()` returns a structured `ScreenSummaryContent`
(play-area / control-area / current-details / interaction-hint regions); `BaseScreenView.setupScreenSummary()`
registers it via `setScreenSummaryContent`. PDOM order uses the idiomatic `pdomPlayAreaNode`
(interactive masses/bobs are added to it). A11y strings live under `accessibility` / `screenSummary`
in each locale JSON, via `StringManager.getAccessibilityStrings()` and the per-screen
`get*ScreenSummaryStrings()` accessors.

When adding a screen, follow the existing `*Screen.ts` + `model/` + `view/` pattern and register in `main.ts`.

## Compliance carve-outs

- **Nested constants:** shared numerics under `src/common/` and per-screen model folders (multi-screen layout); no single root `OscillationsAndChaosConstants.ts`.

## Testing

Fleet-standard Vitest layout:

| Path | Purpose |
|---|---|
| `vitest.config.ts` | Test environment + `setupFiles` when present; `execArgv: ["--expose-gc"]` with memory-leak suite |
| `tests/setup.ts` | Canvas / AudioContext mocks + `init({ name: "…" })` before SceneryStack imports (when required) |
| `tests/**/*.test.ts` | Model/physics unit tests — mirror `src/` under `tests/` |
| `tests/memory-leak.test.ts` | WeakRef + `forceGC` dispose regression (fleet pattern) |

- Put unit tests only under root `tests/` (never co-locate or use `__tests__/`).
- Run `npm test`. CI runs the suite when a `test` script is present.
- Expand `memory-leak.test.ts` for components that add/remove nodes or link Properties at runtime (see OpticsLab).
