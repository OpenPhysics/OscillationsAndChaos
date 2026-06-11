/**
 * Screen for the Double Pendulum simulation.
 */

import { Screen, type ScreenOptions } from "scenerystack/sim";
import { OscillationsAndChaosKeyboardHelpContent } from "../common/view/OscillationsAndChaosKeyboardHelpContent.js";
import OscillationsAndChaosNamespace from "../OscillationsAndChaosNamespace.js";
import { DoublePendulumModel } from "./model/DoublePendulumModel.js";
import { DoublePendulumScreenView } from "./view/DoublePendulumScreenView.js";

export class DoublePendulumScreen extends Screen<DoublePendulumModel, DoublePendulumScreenView> {
  public constructor(options: ScreenOptions) {
    super(
      () => new DoublePendulumModel(),
      (model) => new DoublePendulumScreenView(model),
      {
        ...options,
        createKeyboardHelpNode: () => new OscillationsAndChaosKeyboardHelpContent(),
      },
    );
  }
}

// Register with namespace for debugging accessibility
OscillationsAndChaosNamespace.register("DoublePendulumScreen", DoublePendulumScreen);
