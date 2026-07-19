/**
 * OscillationsAndChaosColors.ts
 *
 * Central location for all colors used in Oscillations And Chaos, providing
 * support for different color profiles (default and projector mode).
 */

import { Color, ProfileColorProperty } from "scenerystack/scenery";
import OscillationsAndChaosNamespace from "./OscillationsAndChaosNamespace.js";

const BLACK = new Color(0, 0, 0);
const WHITE = new Color(255, 255, 255);

function profileColor(name: string, def: Color | string, projector: Color | string): ProfileColorProperty {
  return new ProfileColorProperty(OscillationsAndChaosNamespace, name, { default: def, projector });
}

const OscillationsAndChaosColors = {
  // Background / text
  backgroundColorProperty: profileColor("backgroundColor", BLACK, WHITE),
  textColorProperty: profileColor("textColor", WHITE, BLACK),
  disabledTextColorProperty: profileColor("disabledTextColor", new Color(80, 80, 80), new Color(120, 120, 120)),
  // Muted gray for secondary/description text (e.g. preference-control descriptions).
  descriptionTextColorProperty: profileColor("descriptionTextColor", new Color(80, 80, 80), new Color(80, 80, 80)),

  // Graph
  graphBackgroundColorProperty: profileColor("graphBackgroundColor", new Color(25, 25, 25), WHITE),
  graphBorderColorProperty: profileColor("graphBorderColor", WHITE, BLACK),
  graphGridColorProperty: profileColor("graphGridColor", new Color(60, 60, 60), new Color(180, 180, 180)),
  graphAxisColorProperty: profileColor("graphAxisColor", WHITE, BLACK),
  graphLabelColorProperty: profileColor("graphLabelColor", WHITE, BLACK),
  graphPanelBackgroundColorProperty: profileColor(
    "graphPanelBackgroundColor",
    new Color(40, 40, 40, 0.9),
    new Color(245, 245, 245),
  ),
  graphPanelStrokeColorProperty: profileColor(
    "graphPanelStrokeColor",
    new Color(120, 120, 120),
    new Color(150, 150, 150),
  ),
  graphLine1ColorProperty: profileColor("graphLine1Color", new Color(50, 255, 50), new Color(0, 180, 0)),
  graphLine2ColorProperty: profileColor("graphLine2Color", new Color(255, 80, 80), new Color(200, 0, 0)),
  graphLine3ColorProperty: profileColor("graphLine3Color", new Color(100, 150, 255), new Color(0, 0, 200)),
  graphLine4ColorProperty: profileColor("graphLine4Color", new Color(255, 200, 50), new Color(220, 140, 0)),

  // Control panel
  controlPanelBackgroundColorProperty: profileColor(
    "controlPanelBackgroundColor",
    new Color(30, 30, 30, 0.9),
    new Color(255, 255, 255, 0.9),
  ),
  controlPanelStrokeColorProperty: profileColor(
    "controlPanelStrokeColor",
    new Color(100, 100, 100),
    new Color(180, 180, 180),
  ),

  // Springs
  springFrontColorProperty: profileColor("springFrontColor", new Color(180, 180, 180), new Color(100, 100, 100)),
  springBackColorProperty: profileColor("springBackColor", new Color(120, 120, 120), new Color(50, 50, 50)),

  // Masses / bobs (blue variant)
  mass1FillColorProperty: profileColor("mass1FillColor", new Color(100, 170, 255), new Color(50, 120, 200)),
  mass1StrokeColorProperty: profileColor("mass1StrokeColor", new Color(70, 140, 220), new Color(30, 80, 130)),

  // Masses / bobs (orange variant)
  mass2FillColorProperty: profileColor("mass2FillColor", new Color(255, 150, 50), new Color(200, 100, 30)),
  mass2StrokeColorProperty: profileColor("mass2StrokeColor", new Color(230, 120, 20), new Color(180, 70, 0)),

  // Pendulum pivot
  pivotFillColorProperty: profileColor("pivotFillColor", new Color(160, 160, 160), new Color(40, 40, 40)),
  pivotStrokeColorProperty: profileColor("pivotStrokeColor", WHITE, BLACK),
  rodStrokeColorProperty: profileColor("rodStrokeColor", new Color(200, 200, 200), new Color(80, 80, 80)),

  // Center-of-mass reference dots on pendulum bobs (fill uses textColorProperty;
  // stroke is the opposite so the ring stays visible in both profiles).
  referenceDotStrokeColorProperty: profileColor("referenceDotStrokeColor", BLACK, WHITE),

  // Accessibility focus indicators
  focusIndicatorColorProperty: profileColor("focusIndicatorColor", new Color(100, 200, 255), new Color(0, 100, 200)),
  focusIndicatorHighContrastColorProperty: profileColor(
    "focusIndicatorHighContrastColor",
    new Color(255, 255, 0),
    new Color(255, 0, 255),
  ),
  interactiveHoverColorProperty: profileColor(
    "interactiveHoverColor",
    new Color(150, 220, 255, 0.3),
    new Color(0, 120, 200, 0.2),
  ),

  // Scene grid
  sceneGridColorProperty: profileColor("sceneGridColor", new Color(80, 80, 80, 0.4), new Color(200, 200, 200, 0.5)),
  sceneGridOriginColorProperty: profileColor(
    "sceneGridOriginColor",
    new Color(120, 150, 180, 0.6),
    new Color(100, 120, 150, 0.7),
  ),

  // Protractor
  protractorTicksColorProperty: profileColor("protractorTicksColor", WHITE, BLACK),
  protractorPivotDotColorProperty: profileColor("protractorPivotDotColor", WHITE, BLACK),

  // Info button
  infoButtonIconColorProperty: profileColor("infoButtonIconColor", new Color(50, 145, 184), new Color(50, 145, 184)),

  // Measuring tape
  measuringTapeTextColorProperty: profileColor("measuringTapeTextColor", BLACK, BLACK),
  measuringTapeTextBackgroundColorProperty: profileColor(
    "measuringTapeTextBackgroundColor",
    new Color(255, 255, 255, 0.8),
    new Color(255, 255, 255, 0.8),
  ),
};

export default OscillationsAndChaosColors;
