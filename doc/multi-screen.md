# Multi-Screen Simulations

OscillationsAndChaos is a **four-screen** classical-mechanics suite. Each screen
is fully independent (its own model). Home / nav icons are passed from
`main.ts`; Screen classes only set keyboard-help defaults.

For pedagogy and architecture, see [model.md](./model.md) and
[implementation-notes.md](./implementation-notes.md).

---

## Screens in this sim

| Order | UI name | Folder | Screen class | Icon factory |
|---|---|---|---|---|
| 1 | Single Spring | `src/single-spring/` | `SingleSpringScreen` | `createSingleSpringIcon()` |
| 2 | Double Spring | `src/double-spring/` | `DoubleSpringScreen` | `createDoubleSpringIcon()` |
| 3 | Pendulum | `src/pendulum/` | `PendulumScreen` | `createPendulumIcon()` |
| 4 | Double Pendulum | `src/double-pendulum/` | `DoublePendulumScreen` | `createDoublePendulumIcon()` |

```
main.ts
  ├─ SingleSpringScreen    → SingleSpringModel / SingleSpringScreenView
  ├─ DoubleSpringScreen    → DoubleSpringModel / DoubleSpringScreenView
  ├─ PendulumScreen        → PendulumModel / PendulumScreenView
  └─ DoublePendulumScreen  → DoublePendulumModel / DoublePendulumScreenView
```

Shared pieces live under `src/common/` (solvers, graphs, announcer) and in
`OscillationsAndChaosPreferences` (global Preferences → Simulation / Audio).

---

## Folder layout

```
src/
├─ common/
│   ├─ OscillationsAndChaosScreenIcons.ts
│   ├─ model/
│   └─ view/
├─ single-spring/
│   ├─ SingleSpringScreen.ts
│   ├─ model/SingleSpringModel.ts
│   └─ view/
├─ double-spring/
│   ├─ DoubleSpringScreen.ts
│   ├─ model/
│   └─ view/
├─ pendulum/
│   ├─ PendulumScreen.ts
│   ├─ model/
│   └─ view/
└─ double-pendulum/
    ├─ DoublePendulumScreen.ts
    ├─ model/
    └─ view/
```

Do **not** add per-screen icon modules — use
`OscillationsAndChaosScreenIcons.ts` only.

---

## Wiring in `main.ts` and `*Screen.ts`

Icons and names are supplied when constructing screens in `main.ts`:

```typescript
import {
  createDoublePendulumIcon,
  createDoubleSpringIcon,
  createPendulumIcon,
  createSingleSpringIcon,
} from "./common/OscillationsAndChaosScreenIcons.js";

const screens = [
  new SingleSpringScreen({
    name: screenNames.singleSpringStringProperty,
    tandem: Tandem.ROOT.createTandem("singleSpringScreen"),
    backgroundColorProperty: OscillationsAndChaosColors.backgroundColorProperty,
    homeScreenIcon: createSingleSpringIcon(),
    navigationBarIcon: createSingleSpringIcon(),
  }),
  new DoubleSpringScreen({ /* createDoubleSpringIcon() … */ }),
  new PendulumScreen({ /* createPendulumIcon() … */ }),
  new DoublePendulumScreen({ /* createDoublePendulumIcon() … */ }),
];
```

```typescript
// e.g. src/single-spring/SingleSpringScreen.ts
optionize<ScreenOptions, EmptySelfOptions, ScreenOptions>()(
  {
    createKeyboardHelpNode: () => new OscillationsAndChaosKeyboardHelpContent(),
  },
  options,
);
```

---

## Home screen icons

### Fleet convention

```
src/common/OscillationsAndChaosScreenIcons.ts
```

| Screen | Factory |
|---|---|
| Single Spring | `createSingleSpringIcon()` |
| Double Spring | `createDoubleSpringIcon()` |
| Pendulum | `createPendulumIcon()` |
| Double Pendulum | `createDoublePendulumIcon()` |

Drawn on the PhET **548 × 373** canvas with `OscillationsAndChaosColors`.

---

## Screen options reference

| Option | Type | Purpose |
|---|---|---|
| `name` | `ReadOnlyProperty<string>` | Localizable tab label |
| `tandem` | `Tandem` | PhET-iO registration root |
| `backgroundColorProperty` | `TReadOnlyProperty<Color>` | Screen background |
| `createKeyboardHelpNode` | `() => Node` | Keyboard help (default in `*Screen.ts`) |
| `homeScreenIcon` | `ScreenIcon` | Home-screen icon |
| `navigationBarIcon` | `ScreenIcon` | Nav-bar icon |

---

## Strings and accessibility

Titles via `StringManager.getScreenNames()`:
`singleSpring`, `doubleSpring`, `pendulum`, `doublePendulum`.

Info-dialog copy is per-screen through `getInfoDialogStrings()`. Prefer
per-screen `ScreenSummaryContent` when a11y text diverges; keyboard help is
currently shared.

---

## Adding another screen

1. Add a `screens` key in every locale; expose it from `getScreenNames()`.
2. Add `src/<name>/` with Screen, model, and view.
3. Add `create…Icon()` to `OscillationsAndChaosScreenIcons.ts`.
4. Register in `main.ts` with `name`, tandem, background, and both icons.
