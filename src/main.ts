/**
 * main.ts
 *
 * Entry point for the simulation. Initializes SceneryStack, creates the
 * screen, and starts the main event loop.
 *
 * !! CRITICAL IMPORT ORDER !!
 * brand.js MUST be the first import. It triggers the full bootstrap chain:
 *
 *   brand.ts → splash.ts → assert.ts → init.ts
 *
 * SceneryStack requires this exact load order. Never reorder these imports.
 */

// brand.js MUST be first — triggers: init.ts → assert.ts → splash.ts → brand.ts
import "./brand.js";

// Import KaTeX and make it available globally for FormulaNode
// Import CSS locally so it's bundled and works offline
import "katex/dist/katex.min.css";
import * as katex from "katex";

// Extend Window interface to include katex
declare global {
  interface Window {
    katex: typeof katex;
  }
}

window.katex = katex;

import { onReadyToLaunch, PreferencesModel, Sim } from "scenerystack/sim";
import { Tandem } from "scenerystack/tandem";
import SolverType from "./common/model/SolverType.js";
import SimulationAnnouncer from "./common/util/SimulationAnnouncer.js";
import SpringVisualizationType from "./common/view/SpringVisualizationType.js";
import { DoublePendulumScreen } from "./double-pendulum/DoublePendulumScreen.js";
import { DoublePendulumScreenIcon } from "./double-pendulum/DoublePendulumScreenIcon.js";
import { DoubleSpringScreen } from "./double-spring/DoubleSpringScreen.js";
import { DoubleSpringScreenIcon } from "./double-spring/DoubleSpringScreenIcon.js";
import { StringManager } from "./i18n/StringManager.js";
import OscillationsAndChaosColors from "./OscillationsAndChaosColors.js";
import { PendulumScreen } from "./pendulum/PendulumScreen.js";
import { PendulumScreenIcon } from "./pendulum/PendulumScreenIcon.js";
import OscillationsAndChaosAudioPreferencesNode from "./preferences/OscillationsAndChaosAudioPreferencesNode.js";
import OscillationsAndChaosPreferences from "./preferences/OscillationsAndChaosPreferencesModel.js";
import OscillationsAndChaosSimulationPreferencesNode from "./preferences/OscillationsAndChaosSimulationPreferencesNode.js";
import { SingleSpringScreen } from "./single-spring/SingleSpringScreen.js";
import { SingleSpringScreenIcon } from "./single-spring/SingleSpringScreenIcon.js";

onReadyToLaunch(() => {
  // Get the string manager instance
  const stringManager = StringManager.getInstance();
  const screenNames = stringManager.getScreenNames();

  // Strings for the preference-change announcements below; the preference UI itself lives in
  // OscillationsAndChaosSimulationPreferencesNode / OscillationsAndChaosAudioPreferencesNode.
  const solverNames = stringManager.getSolverNames();
  const springTypeNames = stringManager.getSpringTypeNames();

  const simOptions = {
    webgl: true,
    preferencesModel: new PreferencesModel({
      visualOptions: {
        supportsProjectorMode: true,
        supportsInteractiveHighlights: true,
      },
      audioOptions: {
        supportsVoicing: true,
        supportsSound: false,
        customPreferences: [
          {
            createContent: (tandem: Tandem) => {
              return new OscillationsAndChaosAudioPreferencesNode(tandem);
            },
            column: "right",
          },
        ],
      },
      simulationOptions: {
        customPreferences: [
          {
            createContent: () => new OscillationsAndChaosSimulationPreferencesNode(),
          },
        ],
      },
    }),
  };

  // Add accessibility announcements for preference changes
  const a11yStrings = stringManager.getAccessibilityStrings();

  OscillationsAndChaosPreferences.solverTypeProperty.lazyLink((solverType) => {
    if (OscillationsAndChaosPreferences.announceStateChangesProperty.value) {
      let solverName = "";
      switch (solverType) {
        case SolverType.RK4:
          solverName = solverNames.rk4StringProperty.value;
          break;
        case SolverType.ADAPTIVE_RK45:
          solverName = solverNames.adaptiveRK45StringProperty.value;
          break;
        case SolverType.FOREST_RUTH_PEFRL:
          solverName = solverNames.forestRuthPEFRLStringProperty.value;
          break;
        case SolverType.DORMAND_PRINCE_87:
          solverName = solverNames.dormandPrince87StringProperty.value;
          break;
      }
      const template = a11yStrings.solverChangedStringProperty.value;
      const announcement = template.replace("{{solver}}", solverName);
      SimulationAnnouncer.announceSimulationState(announcement);
    }
  });

  OscillationsAndChaosPreferences.springVisualizationTypeProperty.lazyLink((springType) => {
    if (OscillationsAndChaosPreferences.announceStateChangesProperty.value) {
      const springTypeName =
        springType === SpringVisualizationType.CLASSIC
          ? springTypeNames.classicStringProperty.value
          : springTypeNames.parametricStringProperty.value;
      const template = a11yStrings.springVisualizationChangedStringProperty.value;
      const announcement = template.replace("{{type}}", springTypeName);
      SimulationAnnouncer.announceSimulationState(announcement);
    }
  });

  const screens = [
    new SingleSpringScreen({
      name: screenNames.singleSpringStringProperty,
      tandem: Tandem.ROOT.createTandem("singleSpringScreen"),
      backgroundColorProperty: OscillationsAndChaosColors.backgroundColorProperty,
      homeScreenIcon: new SingleSpringScreenIcon(),
    }),
    new DoubleSpringScreen({
      name: screenNames.doubleSpringStringProperty,
      tandem: Tandem.ROOT.createTandem("doubleSpringScreen"),
      backgroundColorProperty: OscillationsAndChaosColors.backgroundColorProperty,
      homeScreenIcon: new DoubleSpringScreenIcon(),
    }),
    new PendulumScreen({
      name: screenNames.pendulumStringProperty,
      tandem: Tandem.ROOT.createTandem("pendulumScreen"),
      backgroundColorProperty: OscillationsAndChaosColors.backgroundColorProperty,
      homeScreenIcon: new PendulumScreenIcon(),
    }),
    new DoublePendulumScreen({
      name: screenNames.doublePendulumStringProperty,
      tandem: Tandem.ROOT.createTandem("doublePendulumScreen"),
      backgroundColorProperty: OscillationsAndChaosColors.backgroundColorProperty,
      homeScreenIcon: new DoublePendulumScreenIcon(),
    }),
  ];

  const sim = new Sim(stringManager.getTitleStringProperty(), screens, simOptions);
  sim.start();
});
