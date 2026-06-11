/**
 * Screen for the Single Spring simulation.
 */

import { Screen, type ScreenOptions } from "scenerystack/sim";
import { OscillationsAndChaosKeyboardHelpContent } from "../common/view/OscillationsAndChaosKeyboardHelpContent.js";
import OscillationsAndChaosNamespace from "../OscillationsAndChaosNamespace.js";
import { SingleSpringModel } from "./model/SingleSpringModel.js";
import { SingleSpringScreenView } from "./view/SingleSpringScreenView.js";

export class SingleSpringScreen extends Screen<SingleSpringModel, SingleSpringScreenView> {
  public constructor(options: ScreenOptions) {
    super(
      () => new SingleSpringModel(),
      (model) => new SingleSpringScreenView(model),
      {
        ...options,
        createKeyboardHelpNode: () => new OscillationsAndChaosKeyboardHelpContent(),
      },
    );
  }
}

// Register with namespace for debugging accessibility
OscillationsAndChaosNamespace.register("SingleSpringScreen", SingleSpringScreen);
