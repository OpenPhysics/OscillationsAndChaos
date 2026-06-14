/**
 * Factory for creating preset selector combo boxes.
 */

import type { Property, TReadOnlyProperty } from "scenerystack/axon";
import { type Node, Text } from "scenerystack/scenery";
import { PhetFont } from "scenerystack/scenery-phet";
import { ComboBox } from "scenerystack/sun";
import { StringManager } from "../../i18n/StringManager.js";
import OscillationsAndChaosColors from "../../OscillationsAndChaosColors.js";
import type { Preset } from "../model/Preset.js";
import { FONT_SIZE_PRESET_LABEL } from "./FontSizeConstants.js";

/**
 * Preset option type - can be a Preset or the "Custom" string
 */
export type PresetOption = Preset | "Custom";

/**
 * Create a standard preset selector combo box.
 *
 * @param presetProperty - Property holding the current preset selection
 * @param presets - Array of available presets
 * @param customLabel - String property for the "Custom" label
 * @param listParent - Parent node for the combo box dropdown list
 * @returns ComboBox for preset selection
 */
export function createPresetSelector(
  presetProperty: Property<PresetOption>,
  presets: Preset[],
  customLabel: TReadOnlyProperty<string>,
  listParent: Node,
): ComboBox<PresetOption> {
  const presetItems: Array<{
    value: PresetOption;
    createNode: () => Node;
    tandemName: string;
  }> = [
    {
      value: "Custom",
      createNode: () =>
        new Text(customLabel, {
          font: new PhetFont({ size: FONT_SIZE_PRESET_LABEL }),
          fill: OscillationsAndChaosColors.textColorProperty,
        }),
      tandemName: "customPresetItem",
    },
    ...presets.map((preset, index) => ({
      value: preset,
      createNode: () =>
        new Text(preset.nameProperty, {
          font: new PhetFont({ size: FONT_SIZE_PRESET_LABEL }),
          fill: OscillationsAndChaosColors.textColorProperty,
        }),
      tandemName: `preset${index}Item`,
    })),
  ];

  return new ComboBox(presetProperty, presetItems, listParent, {
    cornerRadius: 5,
    xMargin: 8,
    yMargin: 4,
    buttonFill: OscillationsAndChaosColors.controlPanelBackgroundColorProperty,
    buttonStroke: OscillationsAndChaosColors.controlPanelStrokeColorProperty,
    listFill: OscillationsAndChaosColors.controlPanelBackgroundColorProperty,
    listStroke: OscillationsAndChaosColors.controlPanelStrokeColorProperty,
    highlightFill: OscillationsAndChaosColors.controlPanelStrokeColorProperty,
    accessibleName: StringManager.getInstance().getControlAccessibleNames().presetStringProperty,
  });
}
