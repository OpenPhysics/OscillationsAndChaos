# Oscillations And Chaos Simulations

Interactive simulations of classical mechanics systems, built with [SceneryStack](https://scenerystack.org/).
Explore fundamental concepts in mechanics through real-time, physics-based simulations.

## Screens

### Single Spring

Explore the behavior of a mass-spring system with adjustable spring constant and mass, damping and gravity
controls, real-time position and energy graphs, and multiple preset scenarios.

### Double Spring

Study coupled oscillations with two springs: independent control of both spring constants and masses,
observation of normal modes, energy transfer visualization, and phase space diagrams.

### Pendulum

Investigate pendulum motion including adjustable length and mass, small and large angle oscillations, energy
conservation visualization, and period measurement.

### Double Pendulum

Experience chaotic dynamics with highly sensitive dependence on initial conditions, rich phase space behavior,
energy tracking for both pendulum bobs, and path tracing to visualize chaotic motion.

## Features

- Real-time physics simulation with multiple numerical solvers
- Interactive controls for all physical parameters
- Live graphs and visualizations
- Energy conservation tracking
- Phase space diagrams
- Pause/Resume functionality
- Keyboard shortcuts for efficient control
- Projector mode for presentations
- Accessibility features including voicing support
- Customizable preferences for solver methods and visualization
- Single HTML file build for easy distribution

## Physics

The simulations use advanced numerical methods to accurately model classical mechanics:

### Numerical Solvers

- **RK4 (Runge-Kutta 4th Order)**: Classic fixed-step solver
- **Adaptive RK45**: Variable step size for improved accuracy
- **Forest-Ruth PEFRL**: Symplectic integrator for energy conservation
- **Dormand-Prince 8(7)**: High-order adaptive method

### Spring Visualization

- **Classic**: Traditional spring coil representation
- **Parametric**: Mathematical parametric surface visualization

## Quick Start

```bash
npm install
npm run icons    # generate PNG icons from public/icons/icon.svg
npm start        # dev server → http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm start` / `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | TypeScript type check |
| `npm run lint` | Biome lint check |
| `npm run format` | Auto-format all files |
| `npm run fix` | Lint + auto-fix |
| `npm run serve` | Serve production build |
| `npm run watch` | Watch TypeScript files |
| `npm run clean` | Remove `dist/` |

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [SceneryStack](https://scenerystack.org/) | ^3.0.0 | Simulation framework |
| [Vite](https://vitejs.dev/) | ^8 | Build tool + dev server |
| [TypeScript](https://www.typescriptlang.org/) | ^6 | Type-safe JavaScript |
| [Biome](https://biomejs.dev/) | ^2.4 | Linting + formatting |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | ^1 | PWA + service worker |

## License

MIT

## Contributing

See [OpenPhysics contributing guidelines](https://github.com/OpenPhysics/.github/blob/main/CONTRIBUTING.md).
Report bugs via GitHub Issues; use org issue templates.

## Acknowledgments

- Built with [SceneryStack](https://scenerystack.org/)
- Inspired by [PhET](https://phet.colorado.edu) Interactive Simulations
