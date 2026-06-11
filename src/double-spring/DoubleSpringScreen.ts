/**
 * Screen for the Double Spring simulation.
 */

import { Screen, type ScreenOptions } from "scenerystack/sim";
import { OscillationsAndChaosKeyboardHelpContent } from "../common/view/OscillationsAndChaosKeyboardHelpContent.js";
import OscillationsAndChaosNamespace from "../OscillationsAndChaosNamespace.js";
import { DoubleSpringModel } from "./model/DoubleSpringModel.js";
import { DoubleSpringScreenView } from "./view/DoubleSpringScreenView.js";

export class DoubleSpringScreen extends Screen<DoubleSpringModel, DoubleSpringScreenView> {
  public constructor(options: ScreenOptions) {
    super(
      () => new DoubleSpringModel(),
      (model) => new DoubleSpringScreenView(model),
      {
        ...options,
        createKeyboardHelpNode: () => new OscillationsAndChaosKeyboardHelpContent(),
      },
    );
  }
}

// Register with namespace for debugging accessibility
OscillationsAndChaosNamespace.register("DoubleSpringScreen", DoubleSpringScreen);
