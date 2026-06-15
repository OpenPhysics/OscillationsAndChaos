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

import { HBox, HStrut, Node, Text, VBox } from "scenerystack/scenery";
import { PhetFont } from "scenerystack/scenery-phet";
import { onReadyToLaunch, PreferencesModel, Sim } from "scenerystack/sim";
import { Checkbox, ComboBox, VerticalAquaRadioButtonGroup } from "scenerystack/sun";
import { Tandem } from "scenerystack/tandem";
import NominalTimeStep from "./common/model/NominalTimeStep.js";
import SolverType from "./common/model/SolverType.js";
import SimulationAnnouncer from "./common/util/SimulationAnnouncer.js";
import OscillationsAndChaosAudioPreferencesNode from "./common/view/OscillationsAndChaosAudioPreferencesNode.js";
import SpringVisualizationType from "./common/view/SpringVisualizationType.js";
import { DoublePendulumScreen } from "./double-pendulum/DoublePendulumScreen.js";
import { DoublePendulumScreenIcon } from "./double-pendulum/DoublePendulumScreenIcon.js";
import { DoubleSpringScreen } from "./double-spring/DoubleSpringScreen.js";
import { DoubleSpringScreenIcon } from "./double-spring/DoubleSpringScreenIcon.js";
import { StringManager } from "./i18n/StringManager.js";
import OscillationsAndChaosColors from "./OscillationsAndChaosColors.js";
import OscillationsAndChaosPreferences from "./OscillationsAndChaosPreferences.js";
import { PendulumScreen } from "./pendulum/PendulumScreen.js";
import { PendulumScreenIcon } from "./pendulum/PendulumScreenIcon.js";
import { SingleSpringScreen } from "./single-spring/SingleSpringScreen.js";
import { SingleSpringScreenIcon } from "./single-spring/SingleSpringScreenIcon.js";

onReadyToLaunch(() => {
  // Get the string manager instance
  const stringManager = StringManager.getInstance();
  const screenNames = stringManager.getScreenNames();

  // Get preferences strings
  const preferencesLabels = stringManager.getPreferencesLabels();
  const solverNames = stringManager.getSolverNames();
  const solverDescriptions = stringManager.getSolverDescriptions();
  const timeStepNames = stringManager.getTimeStepNames();
  const springTypeNames = stringManager.getSpringTypeNames();
  const springTypeDescriptions = stringManager.getSpringTypeDescriptions();

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
            createContent: (_tandem: Tandem) => {
              // Auto-pause preference
              const autoPauseSection = new VBox({
                align: "left",
                spacing: 8,
                children: [
                  new Checkbox(
                    OscillationsAndChaosPreferences.autoPauseWhenTabHiddenProperty,
                    new Text(preferencesLabels.autoPauseWhenTabHiddenStringProperty, {
                      font: new PhetFont(16),
                    }),
                    {
                      boxWidth: 16,
                    },
                  ),
                  new Text(preferencesLabels.autoPauseDescriptionStringProperty, {
                    font: new PhetFont(12),
                    maxWidth: 600,
                  }),
                ],
              });

              // Create a listParent for the combo box
              const comboBoxListParent = new Node();

              // Time step combo box
              const timeStepComboBoxItems = [
                {
                  value: NominalTimeStep.FINEST,
                  createNode: () =>
                    new Text(timeStepNames.finestStringProperty, {
                      font: new PhetFont(14),
                    }),
                  tandemName: "finestTimeStepItem",
                },
                {
                  value: NominalTimeStep.VERY_SMALL,
                  createNode: () =>
                    new Text(timeStepNames.verySmallStringProperty, {
                      font: new PhetFont(14),
                    }),
                  tandemName: "verySmallTimeStepItem",
                },
                {
                  value: NominalTimeStep.SMALL,
                  createNode: () =>
                    new Text(timeStepNames.smallStringProperty, {
                      font: new PhetFont(14),
                    }),
                  tandemName: "smallTimeStepItem",
                },
                {
                  value: NominalTimeStep.DEFAULT,
                  createNode: () =>
                    new Text(timeStepNames.defaultStringProperty, {
                      font: new PhetFont(14),
                    }),
                  tandemName: "defaultTimeStepItem",
                },
                {
                  value: NominalTimeStep.MEDIUM,
                  createNode: () =>
                    new Text(timeStepNames.mediumStringProperty, {
                      font: new PhetFont(14),
                    }),
                  tandemName: "mediumTimeStepItem",
                },
              ];

              const timeStepComboBox = new ComboBox(
                OscillationsAndChaosPreferences.nominalTimeStepProperty,
                timeStepComboBoxItems,
                comboBoxListParent,
                {
                  cornerRadius: 5,
                  xMargin: 8,
                  yMargin: 4,
                },
              );

              // Time step section (right column)
              const timeStepSection = new VBox({
                align: "left",
                spacing: 8,
                children: [
                  new Text(preferencesLabels.nominalTimeStepStringProperty, {
                    font: new PhetFont({ size: 14, weight: "bold" }),
                  }),
                  new Text(preferencesLabels.nominalTimeStepDescriptionStringProperty, {
                    font: new PhetFont(11),
                    fill: OscillationsAndChaosColors.descriptionTextColorProperty,
                    maxWidth: 280,
                  }),
                  timeStepComboBox,
                ],
              });

              // Solver method section (left column) - reduced maxWidth for descriptions
              const solverMethodColumn = new VBox({
                align: "left",
                spacing: 8,
                children: [
                  new Text(preferencesLabels.solverMethodStringProperty, {
                    font: new PhetFont({ size: 14, weight: "bold" }),
                  }),
                  new VerticalAquaRadioButtonGroup(
                    OscillationsAndChaosPreferences.solverTypeProperty,
                    [
                      {
                        value: SolverType.RK4,
                        createNode: () =>
                          new VBox({
                            align: "left",
                            spacing: 4,
                            children: [
                              new Text(solverNames.rk4StringProperty, {
                                font: new PhetFont(14),
                              }),
                              new Text(solverDescriptions.rk4StringProperty, {
                                font: new PhetFont(11),
                                fill: OscillationsAndChaosColors.descriptionTextColorProperty,
                                maxWidth: 280,
                              }),
                            ],
                          }),
                        tandemName: "rk4RadioButton",
                      },
                      {
                        value: SolverType.ADAPTIVE_RK45,
                        createNode: () =>
                          new VBox({
                            align: "left",
                            spacing: 4,
                            children: [
                              new Text(solverNames.adaptiveRK45StringProperty, {
                                font: new PhetFont(14),
                              }),
                              new Text(solverDescriptions.adaptiveRK45StringProperty, {
                                font: new PhetFont(11),
                                fill: OscillationsAndChaosColors.descriptionTextColorProperty,
                                maxWidth: 280,
                              }),
                            ],
                          }),
                        tandemName: "adaptiveRK45RadioButton",
                      },
                      {
                        value: SolverType.FOREST_RUTH_PEFRL,
                        createNode: () =>
                          new VBox({
                            align: "left",
                            spacing: 4,
                            children: [
                              new Text(solverNames.forestRuthPEFRLStringProperty, {
                                font: new PhetFont(14),
                              }),
                              new Text(solverDescriptions.forestRuthPEFRLStringProperty, {
                                font: new PhetFont(11),
                                fill: OscillationsAndChaosColors.descriptionTextColorProperty,
                                maxWidth: 280,
                              }),
                            ],
                          }),
                        tandemName: "forestRuthPEFRLRadioButton",
                      },
                      {
                        value: SolverType.DORMAND_PRINCE_87,
                        createNode: () =>
                          new VBox({
                            align: "left",
                            spacing: 4,
                            children: [
                              new Text(solverNames.dormandPrince87StringProperty, {
                                font: new PhetFont(14),
                              }),
                              new Text(solverDescriptions.dormandPrince87StringProperty, {
                                font: new PhetFont(11),
                                fill: OscillationsAndChaosColors.descriptionTextColorProperty,
                                maxWidth: 280,
                              }),
                            ],
                          }),
                        tandemName: "dormandPrince87RadioButton",
                      },
                    ],
                    {
                      spacing: 12,
                      radioButtonOptions: {
                        radius: 8,
                      },
                    },
                  ),
                ],
              });

              // Combine solver method and time step in two columns
              const solverSection = new VBox({
                align: "left",
                spacing: 12,
                children: [
                  new Text(preferencesLabels.solverDescriptionStringProperty, {
                    font: new PhetFont(12),
                    maxWidth: 600,
                  }),
                  new HBox({
                    align: "top",
                    spacing: 30,
                    children: [solverMethodColumn, timeStepSection],
                  }),
                  comboBoxListParent, // Add the combo box list parent to the scene graph
                ],
              });

              // Spring visualization preference
              const springVisualizationRadioButtonGroup = new VerticalAquaRadioButtonGroup(
                OscillationsAndChaosPreferences.springVisualizationTypeProperty,
                [
                  {
                    value: SpringVisualizationType.CLASSIC,
                    createNode: () =>
                      new VBox({
                        align: "left",
                        spacing: 4,
                        children: [
                          new Text(springTypeNames.classicStringProperty, {
                            font: new PhetFont(14),
                          }),
                          new Text(springTypeDescriptions.classicStringProperty, {
                            font: new PhetFont(11),
                            fill: OscillationsAndChaosColors.descriptionTextColorProperty,
                            maxWidth: 550,
                          }),
                        ],
                      }),
                    tandemName: "classicSpringRadioButton",
                  },
                  {
                    value: SpringVisualizationType.PARAMETRIC,
                    createNode: () =>
                      new VBox({
                        align: "left",
                        spacing: 4,
                        children: [
                          new Text(springTypeNames.parametricStringProperty, {
                            font: new PhetFont(14),
                          }),
                          new Text(springTypeDescriptions.parametricStringProperty, {
                            font: new PhetFont(11),
                            fill: OscillationsAndChaosColors.descriptionTextColorProperty,
                            maxWidth: 550,
                          }),
                        ],
                      }),
                    tandemName: "parametricSpringRadioButton",
                  },
                ],
                {
                  spacing: 12,
                  radioButtonOptions: {
                    radius: 8,
                  },
                },
              );

              const springVisualizationSection = new VBox({
                align: "left",
                spacing: 12,
                children: [
                  new Text(preferencesLabels.springVisualizationStringProperty, {
                    font: new PhetFont({ size: 16, weight: "bold" }),
                  }),
                  new Text(preferencesLabels.springVisualizationDescriptionStringProperty, {
                    font: new PhetFont(12),
                    maxWidth: 600,
                  }),
                  springVisualizationRadioButtonGroup,
                ],
              });

              return new VBox({
                align: "left",
                spacing: 20,
                children: [
                  autoPauseSection,
                  new HStrut(650), // Set minimum width
                  solverSection,
                  springVisualizationSection,
                ],
              });
            },
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
