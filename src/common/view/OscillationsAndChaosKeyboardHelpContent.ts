/**
 * Keyboard shortcuts help content for Classical Mechanics simulations.
 * Displays available keyboard shortcuts in a two-column layout.
 */

import {
  KeyboardHelpSection,
  KeyboardHelpSectionRow,
  TextKeyNode,
  TwoColumnKeyboardHelpContent,
} from "scenerystack/scenery-phet";
import { StringManager } from "../../i18n/StringManager.js";
import OscillationsAndChaosNamespace from "../../OscillationsAndChaosNamespace.js";

export class OscillationsAndChaosKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    const stringManager = StringManager.getInstance();
    const keyboardShortcutsStrings = stringManager.getKeyboardShortcutsStrings();

    // Create sections for simulation controls
    const simulationControlsSection = new KeyboardHelpSection(
      keyboardShortcutsStrings.simulationControlsStringProperty,
      [
        KeyboardHelpSectionRow.labelWithIcon(
          keyboardShortcutsStrings.playPauseSimulationStringProperty,
          TextKeyNode.space(),
        ),
        KeyboardHelpSectionRow.labelWithIcon(
          keyboardShortcutsStrings.resetSimulationStringProperty,
          new TextKeyNode("R"),
        ),
        KeyboardHelpSectionRow.labelWithIcon(
          keyboardShortcutsStrings.stepBackwardStringProperty,
          new TextKeyNode("\u2190"), // Left arrow
        ),
        KeyboardHelpSectionRow.labelWithIcon(
          keyboardShortcutsStrings.stepForwardStringProperty,
          new TextKeyNode("\u2192"), // Right arrow
        ),
      ],
    );

    // Create sections for graph interactions
    const graphInteractionsSection = new KeyboardHelpSection(keyboardShortcutsStrings.graphInteractionsStringProperty, [
      KeyboardHelpSectionRow.labelWithIcon(
        keyboardShortcutsStrings.resetZoomStringProperty,
        new TextKeyNode("Double-click"),
      ),
      KeyboardHelpSectionRow.labelWithIcon(
        keyboardShortcutsStrings.zoomInOutStringProperty,
        new TextKeyNode("Mouse wheel"),
      ),
      KeyboardHelpSectionRow.labelWithIcon(keyboardShortcutsStrings.panViewStringProperty, new TextKeyNode("Drag")),
    ]);

    // Left column has simulation controls, right column has graph interactions
    super([simulationControlsSection], [graphInteractionsSection], {
      columnSpacing: 20,
      sectionSpacing: 15,
    });
  }
}

// Register with namespace for debugging accessibility
OscillationsAndChaosNamespace.register(
  "OscillationsAndChaosKeyboardHelpContent",
  OscillationsAndChaosKeyboardHelpContent,
);
