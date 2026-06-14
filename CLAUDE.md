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
| `src/OscillationsAndChaos*.ts` | Shared namespace, colors, and preferences |
| `src/*/model/` | Per-screen physics state |
| `src/*/view/*ScreenView.ts` | Per-screen visualization |

Top-level shared files should use the repo-named `OscillationsAndChaos` prefix.

## Accessibility

Follows the shared [OpenPhysics accessibility convention](https://github.com/OpenPhysics/OpenPhysics/blob/main/ACCESSIBILITY.md).
Each screen's `createScreenSummaryContent()` returns a structured `ScreenSummaryContent`
(play-area / control-area / current-details / interaction-hint regions); `BaseScreenView.setupScreenSummary()`
registers it via `setScreenSummaryContent`. PDOM order uses the idiomatic `pdomPlayAreaNode`
(interactive masses/bobs are added to it). A11y strings live under `accessibility` / `screenSummary`
in each locale JSON, via `StringManager.getAccessibilityStrings()` and the per-screen
`get*ScreenSummaryStrings()` accessors.

## Sim-specific commands

```bash
npm run serve    # Serve production build locally
npm run watch    # Watch TypeScript files
```

When adding a screen, follow the existing `*Screen.ts` + `model/` + `view/` pattern and register in `main.ts`.
