/**
 * Screen for the Double Spring simulation.
 */

import { Screen, type ScreenOptions } from "scenerystack/sim";
import oscillationsAndChaos from "../OscillationsAndChaosNamespace.js";
import { DoubleSpringModel } from "./model/DoubleSpringModel.js";
import { DoubleSpringScreenView } from "./view/DoubleSpringScreenView.js";

export class DoubleSpringScreen extends Screen<DoubleSpringModel, DoubleSpringScreenView> {
  public constructor(options: ScreenOptions) {
    super(
      () => new DoubleSpringModel(),
      (model) => new DoubleSpringScreenView(model),
      options,
    );
  }
}

// Register with namespace for debugging accessibility
oscillationsAndChaos.register("DoubleSpringScreen", DoubleSpringScreen);
