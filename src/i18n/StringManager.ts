/**
 * StringManager.ts
 *
 * Centralizes string management for the Classical Mechanics Simulations.
 * Provides access to localized strings for all components.
 */

import type { ReadOnlyProperty } from "scenerystack/axon";
import { LocalizedString } from "scenerystack/chipper";
import stringsEn from "./strings_en.json";
import stringsEs from "./strings_es.json";
import stringsFr from "./strings_fr.json";

// ── Compile-time key-parity check ─────────────────────────────────────────────
// satisfies errors immediately if either locale file is missing keys from the other.
// biome-ignore lint/complexity/noVoid: intentional compile-time type assertion
void (stringsEn satisfies typeof stringsFr);
// biome-ignore lint/complexity/noVoid: intentional compile-time type assertion
void (stringsFr satisfies typeof stringsEn);

// ── Build the reactive string property tree ───────────────────────────────────
const stringProperties = LocalizedString.getNestedStringProperties({
  en: stringsEn,
  fr: stringsFr,
  es: stringsEs,
});

export class StringManager {
  private static instance: StringManager | null = null;

  private constructor() {
    // Private — obtain via getInstance()
  }

  public static getInstance(): StringManager {
    if (StringManager.instance === null) {
      StringManager.instance = new StringManager();
    }
    return StringManager.instance;
  }

  public getTitleStringProperty(): ReadOnlyProperty<string> {
    return stringProperties.titleStringProperty;
  }

  public getScreenNames(): {
    singleSpringStringProperty: ReadOnlyProperty<string>;
    doubleSpringStringProperty: ReadOnlyProperty<string>;
    pendulumStringProperty: ReadOnlyProperty<string>;
    doublePendulumStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      singleSpringStringProperty: stringProperties.screens.singleSpringStringProperty,
      doubleSpringStringProperty: stringProperties.screens.doubleSpringStringProperty,
      pendulumStringProperty: stringProperties.screens.pendulumStringProperty,
      doublePendulumStringProperty: stringProperties.screens.doublePendulumStringProperty,
    };
  }

  public getControlLabels(): {
    massStringProperty: ReadOnlyProperty<string>;
    mass1StringProperty: ReadOnlyProperty<string>;
    mass2StringProperty: ReadOnlyProperty<string>;
    springConstantStringProperty: ReadOnlyProperty<string>;
    springConstant1StringProperty: ReadOnlyProperty<string>;
    springConstant2StringProperty: ReadOnlyProperty<string>;
    dampingStringProperty: ReadOnlyProperty<string>;
    damping1StringProperty: ReadOnlyProperty<string>;
    damping2StringProperty: ReadOnlyProperty<string>;
    lengthStringProperty: ReadOnlyProperty<string>;
    length1StringProperty: ReadOnlyProperty<string>;
    length2StringProperty: ReadOnlyProperty<string>;
    gravityStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      massStringProperty: stringProperties.controls.massStringProperty,
      mass1StringProperty: stringProperties.controls.mass1StringProperty,
      mass2StringProperty: stringProperties.controls.mass2StringProperty,
      springConstantStringProperty: stringProperties.controls.springConstantStringProperty,
      springConstant1StringProperty: stringProperties.controls.springConstant1StringProperty,
      springConstant2StringProperty: stringProperties.controls.springConstant2StringProperty,
      dampingStringProperty: stringProperties.controls.dampingStringProperty,
      damping1StringProperty: stringProperties.controls.damping1StringProperty,
      damping2StringProperty: stringProperties.controls.damping2StringProperty,
      lengthStringProperty: stringProperties.controls.lengthStringProperty,
      length1StringProperty: stringProperties.controls.length1StringProperty,
      length2StringProperty: stringProperties.controls.length2StringProperty,
      gravityStringProperty: stringProperties.controls.gravityStringProperty,
    };
  }

  public getUnitStrings(): {
    kilogramsStringProperty: ReadOnlyProperty<string>;
    newtonsPerMeterStringProperty: ReadOnlyProperty<string>;
    newtonSecondsPerMeterStringProperty: ReadOnlyProperty<string>;
    newtonMeterSecondsStringProperty: ReadOnlyProperty<string>;
    metersStringProperty: ReadOnlyProperty<string>;
    metersPerSecondSquaredStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      kilogramsStringProperty: stringProperties.units.kilogramsStringProperty,
      newtonsPerMeterStringProperty: stringProperties.units.newtonsPerMeterStringProperty,
      newtonSecondsPerMeterStringProperty: stringProperties.units.newtonSecondsPerMeterStringProperty,
      newtonMeterSecondsStringProperty: stringProperties.units.newtonMeterSecondsStringProperty,
      metersStringProperty: stringProperties.units.metersStringProperty,
      metersPerSecondSquaredStringProperty: stringProperties.units.metersPerSecondSquaredStringProperty,
    };
  }

  public getGraphLabels(): {
    showGraphStringProperty: ReadOnlyProperty<string>;
    xAxisLabelStringProperty: ReadOnlyProperty<string>;
    yAxisLabelStringProperty: ReadOnlyProperty<string>;
    xStringProperty: ReadOnlyProperty<string>;
    yStringProperty: ReadOnlyProperty<string>;
    timeStringProperty: ReadOnlyProperty<string>;
    valueStringProperty: ReadOnlyProperty<string>;
    line1StringProperty: ReadOnlyProperty<string>;
    line2StringProperty: ReadOnlyProperty<string>;
    line3StringProperty: ReadOnlyProperty<string>;
    angleAndVelocityStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      // Graph controls
      showGraphStringProperty: stringProperties.graph.showGraphStringProperty,
      xAxisLabelStringProperty: stringProperties.graph.xAxisLabelStringProperty,
      yAxisLabelStringProperty: stringProperties.graph.yAxisLabelStringProperty,

      // Axis labels
      xStringProperty: stringProperties.graph.axis.xStringProperty,
      yStringProperty: stringProperties.graph.axis.yStringProperty,
      timeStringProperty: stringProperties.graph.axis.timeStringProperty,
      valueStringProperty: stringProperties.graph.axis.valueStringProperty,

      // Legend labels
      line1StringProperty: stringProperties.graph.legend.line1StringProperty,
      line2StringProperty: stringProperties.graph.legend.line2StringProperty,
      line3StringProperty: stringProperties.graph.legend.line3StringProperty,

      // Pendulum-specific labels
      angleAndVelocityStringProperty: stringProperties.graph.pendulum.angleAndVelocityStringProperty,
    };
  }

  public getGraphPropertyNames(): {
    positionStringProperty: ReadOnlyProperty<string>;
    position1StringProperty: ReadOnlyProperty<string>;
    position2StringProperty: ReadOnlyProperty<string>;
    velocityStringProperty: ReadOnlyProperty<string>;
    velocity1StringProperty: ReadOnlyProperty<string>;
    velocity2StringProperty: ReadOnlyProperty<string>;
    accelerationStringProperty: ReadOnlyProperty<string>;
    acceleration1StringProperty: ReadOnlyProperty<string>;
    acceleration2StringProperty: ReadOnlyProperty<string>;
    angleStringProperty: ReadOnlyProperty<string>;
    angularVelocityStringProperty: ReadOnlyProperty<string>;
    angle1StringProperty: ReadOnlyProperty<string>;
    angle2StringProperty: ReadOnlyProperty<string>;
    angularVelocity1StringProperty: ReadOnlyProperty<string>;
    angularVelocity2StringProperty: ReadOnlyProperty<string>;
    angularAccelerationStringProperty: ReadOnlyProperty<string>;
    angularAcceleration1StringProperty: ReadOnlyProperty<string>;
    angularAcceleration2StringProperty: ReadOnlyProperty<string>;
    kineticEnergyStringProperty: ReadOnlyProperty<string>;
    potentialEnergyStringProperty: ReadOnlyProperty<string>;
    springPotentialEnergyStringProperty: ReadOnlyProperty<string>;
    gravitationalPotentialEnergyStringProperty: ReadOnlyProperty<string>;
    totalEnergyStringProperty: ReadOnlyProperty<string>;
    timeStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      positionStringProperty: stringProperties.graph.properties.positionStringProperty,
      position1StringProperty: stringProperties.graph.properties.position1StringProperty,
      position2StringProperty: stringProperties.graph.properties.position2StringProperty,
      velocityStringProperty: stringProperties.graph.properties.velocityStringProperty,
      velocity1StringProperty: stringProperties.graph.properties.velocity1StringProperty,
      velocity2StringProperty: stringProperties.graph.properties.velocity2StringProperty,
      accelerationStringProperty: stringProperties.graph.properties.accelerationStringProperty,
      acceleration1StringProperty: stringProperties.graph.properties.acceleration1StringProperty,
      acceleration2StringProperty: stringProperties.graph.properties.acceleration2StringProperty,
      angleStringProperty: stringProperties.graph.properties.angleStringProperty,
      angularVelocityStringProperty: stringProperties.graph.properties.angularVelocityStringProperty,
      angle1StringProperty: stringProperties.graph.properties.angle1StringProperty,
      angle2StringProperty: stringProperties.graph.properties.angle2StringProperty,
      angularVelocity1StringProperty: stringProperties.graph.properties.angularVelocity1StringProperty,
      angularVelocity2StringProperty: stringProperties.graph.properties.angularVelocity2StringProperty,
      angularAccelerationStringProperty: stringProperties.graph.properties.angularAccelerationStringProperty,
      angularAcceleration1StringProperty: stringProperties.graph.properties.angularAcceleration1StringProperty,
      angularAcceleration2StringProperty: stringProperties.graph.properties.angularAcceleration2StringProperty,
      kineticEnergyStringProperty: stringProperties.graph.properties.kineticEnergyStringProperty,
      potentialEnergyStringProperty: stringProperties.graph.properties.potentialEnergyStringProperty,
      springPotentialEnergyStringProperty: stringProperties.graph.properties.springPotentialEnergyStringProperty,
      gravitationalPotentialEnergyStringProperty:
        stringProperties.graph.properties.gravitationalPotentialEnergyStringProperty,
      totalEnergyStringProperty: stringProperties.graph.properties.totalEnergyStringProperty,
      timeStringProperty: stringProperties.graph.properties.timeStringProperty,
    };
  }

  public getTimeControlLabels(): {
    autoPauseWhenTabHiddenStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      autoPauseWhenTabHiddenStringProperty: stringProperties.timeControls.autoPauseWhenTabHiddenStringProperty,
    };
  }

  public getPreferencesLabels(): {
    autoPauseWhenTabHiddenStringProperty: ReadOnlyProperty<string>;
    autoPauseDescriptionStringProperty: ReadOnlyProperty<string>;
    solverMethodStringProperty: ReadOnlyProperty<string>;
    solverDescriptionStringProperty: ReadOnlyProperty<string>;
    nominalTimeStepStringProperty: ReadOnlyProperty<string>;
    nominalTimeStepDescriptionStringProperty: ReadOnlyProperty<string>;
    springVisualizationStringProperty: ReadOnlyProperty<string>;
    springVisualizationDescriptionStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      autoPauseWhenTabHiddenStringProperty: stringProperties.preferences.autoPauseWhenTabHiddenStringProperty,
      autoPauseDescriptionStringProperty: stringProperties.preferences.autoPauseDescriptionStringProperty,
      solverMethodStringProperty: stringProperties.preferences.solverMethodStringProperty,
      solverDescriptionStringProperty: stringProperties.preferences.solverDescriptionStringProperty,
      nominalTimeStepStringProperty: stringProperties.preferences.nominalTimeStepStringProperty,
      nominalTimeStepDescriptionStringProperty: stringProperties.preferences.nominalTimeStepDescriptionStringProperty,
      springVisualizationStringProperty: stringProperties.preferences.springVisualizationStringProperty,
      springVisualizationDescriptionStringProperty:
        stringProperties.preferences.springVisualizationDescriptionStringProperty,
    };
  }

  public getSolverNames(): {
    rk4StringProperty: ReadOnlyProperty<string>;
    adaptiveRK45StringProperty: ReadOnlyProperty<string>;
    forestRuthPEFRLStringProperty: ReadOnlyProperty<string>;
    dormandPrince87StringProperty: ReadOnlyProperty<string>;
  } {
    return {
      rk4StringProperty: stringProperties.preferences.solvers.rk4StringProperty,
      adaptiveRK45StringProperty: stringProperties.preferences.solvers.adaptiveRK45StringProperty,
      forestRuthPEFRLStringProperty: stringProperties.preferences.solvers.forestRuthPEFRLStringProperty,
      dormandPrince87StringProperty: stringProperties.preferences.solvers.dormandPrince87StringProperty,
    };
  }

  public getAudioPreferencesLabels(): {
    simVoicingOptionsStringProperty: ReadOnlyProperty<string>;
    announceParameterChangesStringProperty: ReadOnlyProperty<string>;
    parameterAnnouncementsDescriptionStringProperty: ReadOnlyProperty<string>;
    announceStateChangesStringProperty: ReadOnlyProperty<string>;
    stateAnnouncementsDescriptionStringProperty: ReadOnlyProperty<string>;
    announceDragInteractionsStringProperty: ReadOnlyProperty<string>;
    dragAnnouncementsDescriptionStringProperty: ReadOnlyProperty<string>;
  } {
    // Type assertion needed due to TypeScript's limitations with deeply nested conditional types
    const audioProps = stringProperties.preferences.audio as unknown as Record<string, ReadOnlyProperty<string>>;
    return {
      simVoicingOptionsStringProperty: audioProps["simVoicingOptionsStringProperty"] as ReadOnlyProperty<string>,
      announceParameterChangesStringProperty: audioProps[
        "announceParameterChangesStringProperty"
      ] as ReadOnlyProperty<string>,
      parameterAnnouncementsDescriptionStringProperty: audioProps[
        "parameterAnnouncementsDescriptionStringProperty"
      ] as ReadOnlyProperty<string>,
      announceStateChangesStringProperty: audioProps["announceStateChangesStringProperty"] as ReadOnlyProperty<string>,
      stateAnnouncementsDescriptionStringProperty: audioProps[
        "stateAnnouncementsDescriptionStringProperty"
      ] as ReadOnlyProperty<string>,
      announceDragInteractionsStringProperty: audioProps[
        "announceDragInteractionsStringProperty"
      ] as ReadOnlyProperty<string>,
      dragAnnouncementsDescriptionStringProperty: audioProps[
        "dragAnnouncementsDescriptionStringProperty"
      ] as ReadOnlyProperty<string>,
    };
  }

  public getSolverDescriptions(): {
    rk4StringProperty: ReadOnlyProperty<string>;
    adaptiveRK45StringProperty: ReadOnlyProperty<string>;
    forestRuthPEFRLStringProperty: ReadOnlyProperty<string>;
    dormandPrince87StringProperty: ReadOnlyProperty<string>;
  } {
    return {
      rk4StringProperty: stringProperties.preferences.solverDescriptions.rk4StringProperty,
      adaptiveRK45StringProperty: stringProperties.preferences.solverDescriptions.adaptiveRK45StringProperty,
      forestRuthPEFRLStringProperty: stringProperties.preferences.solverDescriptions.forestRuthPEFRLStringProperty,
      dormandPrince87StringProperty: stringProperties.preferences.solverDescriptions.dormandPrince87StringProperty,
    };
  }

  public getTimeStepNames(): {
    finestStringProperty: ReadOnlyProperty<string>;
    verySmallStringProperty: ReadOnlyProperty<string>;
    smallStringProperty: ReadOnlyProperty<string>;
    defaultStringProperty: ReadOnlyProperty<string>;
    mediumStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      finestStringProperty: stringProperties.preferences.timeSteps.finestStringProperty,
      verySmallStringProperty: stringProperties.preferences.timeSteps.verySmallStringProperty,
      smallStringProperty: stringProperties.preferences.timeSteps.smallStringProperty,
      defaultStringProperty: stringProperties.preferences.timeSteps.defaultStringProperty,
      mediumStringProperty: stringProperties.preferences.timeSteps.mediumStringProperty,
    };
  }

  public getSpringTypeNames(): {
    classicStringProperty: ReadOnlyProperty<string>;
    parametricStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      classicStringProperty: stringProperties.preferences.springTypes.classicStringProperty,
      parametricStringProperty: stringProperties.preferences.springTypes.parametricStringProperty,
    };
  }

  public getSpringTypeDescriptions(): {
    classicStringProperty: ReadOnlyProperty<string>;
    parametricStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      classicStringProperty: stringProperties.preferences.springTypeDescriptions.classicStringProperty,
      parametricStringProperty: stringProperties.preferences.springTypeDescriptions.parametricStringProperty,
    };
  }

  public getPresetLabels(): {
    labelStringProperty: ReadOnlyProperty<string>;
    customStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      labelStringProperty: stringProperties.presets.labelStringProperty,
      customStringProperty: stringProperties.presets.customStringProperty,
    };
  }

  public getSingleSpringPresets(): {
    lightAndBouncyStringProperty: ReadOnlyProperty<string>;
    lightAndBouncyDescStringProperty: ReadOnlyProperty<string>;
    heavyAndSlowStringProperty: ReadOnlyProperty<string>;
    heavyAndSlowDescStringProperty: ReadOnlyProperty<string>;
    criticallyDampedStringProperty: ReadOnlyProperty<string>;
    criticallyDampedDescStringProperty: ReadOnlyProperty<string>;
    underdampedStringProperty: ReadOnlyProperty<string>;
    underdampedDescStringProperty: ReadOnlyProperty<string>;
    overdampedStringProperty: ReadOnlyProperty<string>;
    overdampedDescStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      lightAndBouncyStringProperty: stringProperties.presets.singleSpring.lightAndBouncyStringProperty,
      lightAndBouncyDescStringProperty: stringProperties.presets.singleSpring.lightAndBouncyDescStringProperty,
      heavyAndSlowStringProperty: stringProperties.presets.singleSpring.heavyAndSlowStringProperty,
      heavyAndSlowDescStringProperty: stringProperties.presets.singleSpring.heavyAndSlowDescStringProperty,
      criticallyDampedStringProperty: stringProperties.presets.singleSpring.criticallyDampedStringProperty,
      criticallyDampedDescStringProperty: stringProperties.presets.singleSpring.criticallyDampedDescStringProperty,
      underdampedStringProperty: stringProperties.presets.singleSpring.underdampedStringProperty,
      underdampedDescStringProperty: stringProperties.presets.singleSpring.underdampedDescStringProperty,
      overdampedStringProperty: stringProperties.presets.singleSpring.overdampedStringProperty,
      overdampedDescStringProperty: stringProperties.presets.singleSpring.overdampedDescStringProperty,
    };
  }

  public getDoubleSpringPresets(): {
    symmetricStringProperty: ReadOnlyProperty<string>;
    symmetricDescStringProperty: ReadOnlyProperty<string>;
    asymmetricMassesStringProperty: ReadOnlyProperty<string>;
    asymmetricMassesDescStringProperty: ReadOnlyProperty<string>;
    differentSpringsStringProperty: ReadOnlyProperty<string>;
    differentSpringsDescStringProperty: ReadOnlyProperty<string>;
    coupledResonanceStringProperty: ReadOnlyProperty<string>;
    coupledResonanceDescStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      symmetricStringProperty: stringProperties.presets.doubleSpring.symmetricStringProperty,
      symmetricDescStringProperty: stringProperties.presets.doubleSpring.symmetricDescStringProperty,
      asymmetricMassesStringProperty: stringProperties.presets.doubleSpring.asymmetricMassesStringProperty,
      asymmetricMassesDescStringProperty: stringProperties.presets.doubleSpring.asymmetricMassesDescStringProperty,
      differentSpringsStringProperty: stringProperties.presets.doubleSpring.differentSpringsStringProperty,
      differentSpringsDescStringProperty: stringProperties.presets.doubleSpring.differentSpringsDescStringProperty,
      coupledResonanceStringProperty: stringProperties.presets.doubleSpring.coupledResonanceStringProperty,
      coupledResonanceDescStringProperty: stringProperties.presets.doubleSpring.coupledResonanceDescStringProperty,
    };
  }

  public getPendulumPresets(): {
    shortAndFastStringProperty: ReadOnlyProperty<string>;
    shortAndFastDescStringProperty: ReadOnlyProperty<string>;
    longAndSlowStringProperty: ReadOnlyProperty<string>;
    longAndSlowDescStringProperty: ReadOnlyProperty<string>;
    smallAngleStringProperty: ReadOnlyProperty<string>;
    smallAngleDescStringProperty: ReadOnlyProperty<string>;
    largeAmplitudeStringProperty: ReadOnlyProperty<string>;
    largeAmplitudeDescStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      shortAndFastStringProperty: stringProperties.presets.pendulum.shortAndFastStringProperty,
      shortAndFastDescStringProperty: stringProperties.presets.pendulum.shortAndFastDescStringProperty,
      longAndSlowStringProperty: stringProperties.presets.pendulum.longAndSlowStringProperty,
      longAndSlowDescStringProperty: stringProperties.presets.pendulum.longAndSlowDescStringProperty,
      smallAngleStringProperty: stringProperties.presets.pendulum.smallAngleStringProperty,
      smallAngleDescStringProperty: stringProperties.presets.pendulum.smallAngleDescStringProperty,
      largeAmplitudeStringProperty: stringProperties.presets.pendulum.largeAmplitudeStringProperty,
      largeAmplitudeDescStringProperty: stringProperties.presets.pendulum.largeAmplitudeDescStringProperty,
    };
  }

  public getDoublePendulumPresets(): {
    synchronizedStringProperty: ReadOnlyProperty<string>;
    synchronizedDescStringProperty: ReadOnlyProperty<string>;
    chaoticDanceStringProperty: ReadOnlyProperty<string>;
    chaoticDanceDescStringProperty: ReadOnlyProperty<string>;
    counterRotationStringProperty: ReadOnlyProperty<string>;
    counterRotationDescStringProperty: ReadOnlyProperty<string>;
    energyTransferStringProperty: ReadOnlyProperty<string>;
    energyTransferDescStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      synchronizedStringProperty: stringProperties.presets.doublePendulum.synchronizedStringProperty,
      synchronizedDescStringProperty: stringProperties.presets.doublePendulum.synchronizedDescStringProperty,
      chaoticDanceStringProperty: stringProperties.presets.doublePendulum.chaoticDanceStringProperty,
      chaoticDanceDescStringProperty: stringProperties.presets.doublePendulum.chaoticDanceDescStringProperty,
      counterRotationStringProperty: stringProperties.presets.doublePendulum.counterRotationStringProperty,
      counterRotationDescStringProperty: stringProperties.presets.doublePendulum.counterRotationDescStringProperty,
      energyTransferStringProperty: stringProperties.presets.doublePendulum.energyTransferStringProperty,
      energyTransferDescStringProperty: stringProperties.presets.doublePendulum.energyTransferDescStringProperty,
    };
  }

  public getVisualizationLabels(): {
    showVectorsStringProperty: ReadOnlyProperty<string>;
    showEnergyChartStringProperty: ReadOnlyProperty<string>;
    showGridStringProperty: ReadOnlyProperty<string>;
    velocityStringProperty: ReadOnlyProperty<string>;
    accelerationStringProperty: ReadOnlyProperty<string>;
    forceStringProperty: ReadOnlyProperty<string>;
    gridScaleLabelStringProperty: ReadOnlyProperty<string>;
    kineticStringProperty: ReadOnlyProperty<string>;
    potentialStringProperty: ReadOnlyProperty<string>;
    totalStringProperty: ReadOnlyProperty<string>;
    showDistanceToolStringProperty: ReadOnlyProperty<string>;
    showProtractorStringProperty: ReadOnlyProperty<string>;
    showStopwatchStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      showVectorsStringProperty: stringProperties.visualization.showVectorsStringProperty,
      showEnergyChartStringProperty: stringProperties.visualization.showEnergyChartStringProperty,
      showGridStringProperty: stringProperties.visualization.showGridStringProperty,
      velocityStringProperty: stringProperties.visualization.velocityStringProperty,
      accelerationStringProperty: stringProperties.visualization.accelerationStringProperty,
      forceStringProperty: stringProperties.visualization.forceStringProperty,
      gridScaleLabelStringProperty: stringProperties.visualization.grid.scaleLabelStringProperty,
      kineticStringProperty: stringProperties.visualization.energy.kineticStringProperty,
      potentialStringProperty: stringProperties.visualization.energy.potentialStringProperty,
      totalStringProperty: stringProperties.visualization.energy.totalStringProperty,
      showDistanceToolStringProperty: stringProperties.visualization.tools.showDistanceToolStringProperty,
      showProtractorStringProperty: stringProperties.visualization.tools.showProtractorStringProperty,
      showStopwatchStringProperty: stringProperties.visualization.tools.showStopwatchStringProperty,
    };
  }

  public getAccessibilityStrings(): {
    simulationResetStringProperty: ReadOnlyProperty<string>;
    simulationPlayingStringProperty: ReadOnlyProperty<string>;
    simulationPausedStringProperty: ReadOnlyProperty<string>;
    simulationStartedStringProperty: ReadOnlyProperty<string>;
    steppedForwardStringProperty: ReadOnlyProperty<string>;
    steppedBackwardStringProperty: ReadOnlyProperty<string>;
    speedChangedStringProperty: ReadOnlyProperty<string>;
    draggingMassStringProperty: ReadOnlyProperty<string>;
    draggingMass1StringProperty: ReadOnlyProperty<string>;
    draggingMass2StringProperty: ReadOnlyProperty<string>;
    draggingBobStringProperty: ReadOnlyProperty<string>;
    draggingUpperBobStringProperty: ReadOnlyProperty<string>;
    draggingLowerBobStringProperty: ReadOnlyProperty<string>;
    massReleasedAtStringProperty: ReadOnlyProperty<string>;
    mass1ReleasedAtStringProperty: ReadOnlyProperty<string>;
    mass2ReleasedAtStringProperty: ReadOnlyProperty<string>;
    bobReleasedAtStringProperty: ReadOnlyProperty<string>;
    upperBobReleasedAtStringProperty: ReadOnlyProperty<string>;
    lowerBobReleasedAtStringProperty: ReadOnlyProperty<string>;
    massChangedStringProperty: ReadOnlyProperty<string>;
    springConstantChangedStringProperty: ReadOnlyProperty<string>;
    dampingChangedStringProperty: ReadOnlyProperty<string>;
    lengthChangedStringProperty: ReadOnlyProperty<string>;
    gravityChangedStringProperty: ReadOnlyProperty<string>;
    presetAppliedStringProperty: ReadOnlyProperty<string>;
    graphShownStringProperty: ReadOnlyProperty<string>;
    graphHiddenStringProperty: ReadOnlyProperty<string>;
    xAxisChangedStringProperty: ReadOnlyProperty<string>;
    yAxisChangedStringProperty: ReadOnlyProperty<string>;
    velocityVectorsShownStringProperty: ReadOnlyProperty<string>;
    velocityVectorsHiddenStringProperty: ReadOnlyProperty<string>;
    forceVectorsShownStringProperty: ReadOnlyProperty<string>;
    forceVectorsHiddenStringProperty: ReadOnlyProperty<string>;
    accelerationVectorsShownStringProperty: ReadOnlyProperty<string>;
    accelerationVectorsHiddenStringProperty: ReadOnlyProperty<string>;
    gridShownStringProperty: ReadOnlyProperty<string>;
    gridHiddenStringProperty: ReadOnlyProperty<string>;
    distanceToolShownStringProperty: ReadOnlyProperty<string>;
    distanceToolHiddenStringProperty: ReadOnlyProperty<string>;
    protractorShownStringProperty: ReadOnlyProperty<string>;
    protractorHiddenStringProperty: ReadOnlyProperty<string>;
    stopwatchShownStringProperty: ReadOnlyProperty<string>;
    stopwatchHiddenStringProperty: ReadOnlyProperty<string>;
    solverChangedStringProperty: ReadOnlyProperty<string>;
    springVisualizationChangedStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      // Simulation state
      simulationResetStringProperty: stringProperties.accessibility.simulation.resetStringProperty,
      simulationPlayingStringProperty: stringProperties.accessibility.simulation.playingStringProperty,
      simulationPausedStringProperty: stringProperties.accessibility.simulation.pausedStringProperty,
      simulationStartedStringProperty: stringProperties.accessibility.simulation.startedStringProperty,
      steppedForwardStringProperty: stringProperties.accessibility.simulation.steppedForwardStringProperty,
      steppedBackwardStringProperty: stringProperties.accessibility.simulation.steppedBackwardStringProperty,
      speedChangedStringProperty: stringProperties.accessibility.simulation.speedChangedStringProperty,

      // Drag interactions
      draggingMassStringProperty: stringProperties.accessibility.drag.draggingMassStringProperty,
      draggingMass1StringProperty: stringProperties.accessibility.drag.draggingMass1StringProperty,
      draggingMass2StringProperty: stringProperties.accessibility.drag.draggingMass2StringProperty,
      draggingBobStringProperty: stringProperties.accessibility.drag.draggingBobStringProperty,
      draggingUpperBobStringProperty: stringProperties.accessibility.drag.draggingUpperBobStringProperty,
      draggingLowerBobStringProperty: stringProperties.accessibility.drag.draggingLowerBobStringProperty,
      massReleasedAtStringProperty: stringProperties.accessibility.drag.massReleasedAtStringProperty,
      mass1ReleasedAtStringProperty: stringProperties.accessibility.drag.mass1ReleasedAtStringProperty,
      mass2ReleasedAtStringProperty: stringProperties.accessibility.drag.mass2ReleasedAtStringProperty,
      bobReleasedAtStringProperty: stringProperties.accessibility.drag.bobReleasedAtStringProperty,
      upperBobReleasedAtStringProperty: stringProperties.accessibility.drag.upperBobReleasedAtStringProperty,
      lowerBobReleasedAtStringProperty: stringProperties.accessibility.drag.lowerBobReleasedAtStringProperty,

      // Parameter changes
      massChangedStringProperty: stringProperties.accessibility.parameters.massChangedStringProperty,
      springConstantChangedStringProperty:
        stringProperties.accessibility.parameters.springConstantChangedStringProperty,
      dampingChangedStringProperty: stringProperties.accessibility.parameters.dampingChangedStringProperty,
      lengthChangedStringProperty: stringProperties.accessibility.parameters.lengthChangedStringProperty,
      gravityChangedStringProperty: stringProperties.accessibility.parameters.gravityChangedStringProperty,
      presetAppliedStringProperty: stringProperties.accessibility.parameters.presetAppliedStringProperty,

      // Graph changes
      graphShownStringProperty: stringProperties.accessibility.graph.shownStringProperty,
      graphHiddenStringProperty: stringProperties.accessibility.graph.hiddenStringProperty,
      xAxisChangedStringProperty: stringProperties.accessibility.graph.xAxisChangedStringProperty,
      yAxisChangedStringProperty: stringProperties.accessibility.graph.yAxisChangedStringProperty,

      // Visualization changes
      velocityVectorsShownStringProperty:
        stringProperties.accessibility.visualization.velocityVectorsShownStringProperty,
      velocityVectorsHiddenStringProperty:
        stringProperties.accessibility.visualization.velocityVectorsHiddenStringProperty,
      forceVectorsShownStringProperty: stringProperties.accessibility.visualization.forceVectorsShownStringProperty,
      forceVectorsHiddenStringProperty: stringProperties.accessibility.visualization.forceVectorsHiddenStringProperty,
      accelerationVectorsShownStringProperty:
        stringProperties.accessibility.visualization.accelerationVectorsShownStringProperty,
      accelerationVectorsHiddenStringProperty:
        stringProperties.accessibility.visualization.accelerationVectorsHiddenStringProperty,

      // Tool visibility changes
      gridShownStringProperty: stringProperties.accessibility.tools.gridShownStringProperty,
      gridHiddenStringProperty: stringProperties.accessibility.tools.gridHiddenStringProperty,
      distanceToolShownStringProperty: stringProperties.accessibility.tools.distanceToolShownStringProperty,
      distanceToolHiddenStringProperty: stringProperties.accessibility.tools.distanceToolHiddenStringProperty,
      protractorShownStringProperty: stringProperties.accessibility.tools.protractorShownStringProperty,
      protractorHiddenStringProperty: stringProperties.accessibility.tools.protractorHiddenStringProperty,
      stopwatchShownStringProperty: stringProperties.accessibility.tools.stopwatchShownStringProperty,
      stopwatchHiddenStringProperty: stringProperties.accessibility.tools.stopwatchHiddenStringProperty,

      // Preference changes
      solverChangedStringProperty: stringProperties.accessibility.preferences.solverChangedStringProperty,
      springVisualizationChangedStringProperty:
        stringProperties.accessibility.preferences.springVisualizationChangedStringProperty,
    };
  }

  public getKeyboardShortcutsStrings(): {
    titleStringProperty: ReadOnlyProperty<string>;
    simulationControlsStringProperty: ReadOnlyProperty<string>;
    graphInteractionsStringProperty: ReadOnlyProperty<string>;
    playPauseSimulationStringProperty: ReadOnlyProperty<string>;
    resetSimulationStringProperty: ReadOnlyProperty<string>;
    stepBackwardStringProperty: ReadOnlyProperty<string>;
    stepForwardStringProperty: ReadOnlyProperty<string>;
    resetZoomStringProperty: ReadOnlyProperty<string>;
    zoomInOutStringProperty: ReadOnlyProperty<string>;
    panViewStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      titleStringProperty: stringProperties.keyboardShortcuts.titleStringProperty,
      simulationControlsStringProperty: stringProperties.keyboardShortcuts.simulationControlsStringProperty,
      graphInteractionsStringProperty: stringProperties.keyboardShortcuts.graphInteractionsStringProperty,
      playPauseSimulationStringProperty: stringProperties.keyboardShortcuts.playPauseSimulationStringProperty,
      resetSimulationStringProperty: stringProperties.keyboardShortcuts.resetSimulationStringProperty,
      stepBackwardStringProperty: stringProperties.keyboardShortcuts.stepBackwardStringProperty,
      stepForwardStringProperty: stringProperties.keyboardShortcuts.stepForwardStringProperty,
      resetZoomStringProperty: stringProperties.keyboardShortcuts.resetZoomStringProperty,
      zoomInOutStringProperty: stringProperties.keyboardShortcuts.zoomInOutStringProperty,
      panViewStringProperty: stringProperties.keyboardShortcuts.panViewStringProperty,
    };
  }

  public getSingleSpringVoicingStrings(): {
    playAreaStringProperty: ReadOnlyProperty<string>;
    controlAreaStringProperty: ReadOnlyProperty<string>;
    detailsStringProperty: ReadOnlyProperty<string>;
    hintStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      playAreaStringProperty: stringProperties.voicing.singleSpring.playAreaStringProperty,
      controlAreaStringProperty: stringProperties.voicing.singleSpring.controlAreaStringProperty,
      detailsStringProperty: stringProperties.voicing.singleSpring.detailsStringProperty,
      hintStringProperty: stringProperties.voicing.singleSpring.hintStringProperty,
    };
  }

  public getDoubleSpringVoicingStrings(): {
    playAreaStringProperty: ReadOnlyProperty<string>;
    controlAreaStringProperty: ReadOnlyProperty<string>;
    detailsStringProperty: ReadOnlyProperty<string>;
    hintStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      playAreaStringProperty: stringProperties.voicing.doubleSpring.playAreaStringProperty,
      controlAreaStringProperty: stringProperties.voicing.doubleSpring.controlAreaStringProperty,
      detailsStringProperty: stringProperties.voicing.doubleSpring.detailsStringProperty,
      hintStringProperty: stringProperties.voicing.doubleSpring.hintStringProperty,
    };
  }

  public getPendulumVoicingStrings(): {
    playAreaStringProperty: ReadOnlyProperty<string>;
    controlAreaStringProperty: ReadOnlyProperty<string>;
    detailsStringProperty: ReadOnlyProperty<string>;
    hintStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      playAreaStringProperty: stringProperties.voicing.pendulum.playAreaStringProperty,
      controlAreaStringProperty: stringProperties.voicing.pendulum.controlAreaStringProperty,
      detailsStringProperty: stringProperties.voicing.pendulum.detailsStringProperty,
      hintStringProperty: stringProperties.voicing.pendulum.hintStringProperty,
    };
  }

  public getDoublePendulumVoicingStrings(): {
    playAreaStringProperty: ReadOnlyProperty<string>;
    controlAreaStringProperty: ReadOnlyProperty<string>;
    detailsStringProperty: ReadOnlyProperty<string>;
    hintStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      playAreaStringProperty: stringProperties.voicing.doublePendulum.playAreaStringProperty,
      controlAreaStringProperty: stringProperties.voicing.doublePendulum.controlAreaStringProperty,
      detailsStringProperty: stringProperties.voicing.doublePendulum.detailsStringProperty,
      hintStringProperty: stringProperties.voicing.doublePendulum.hintStringProperty,
    };
  }

  public getSingleSpringScreenSummaryStrings(): {
    titleStringProperty: ReadOnlyProperty<string>;
    overviewStringProperty: ReadOnlyProperty<string>;
    playAreaDescriptionStringProperty: ReadOnlyProperty<string>;
    controlAreaDescriptionStringProperty: ReadOnlyProperty<string>;
    interactionHintStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      titleStringProperty: stringProperties.screenSummary.singleSpring.titleStringProperty,
      overviewStringProperty: stringProperties.screenSummary.singleSpring.overviewStringProperty,
      playAreaDescriptionStringProperty: stringProperties.screenSummary.singleSpring.playAreaDescriptionStringProperty,
      controlAreaDescriptionStringProperty:
        stringProperties.screenSummary.singleSpring.controlAreaDescriptionStringProperty,
      interactionHintStringProperty: stringProperties.screenSummary.singleSpring.interactionHintStringProperty,
    };
  }

  public getDoubleSpringScreenSummaryStrings(): {
    titleStringProperty: ReadOnlyProperty<string>;
    overviewStringProperty: ReadOnlyProperty<string>;
    playAreaDescriptionStringProperty: ReadOnlyProperty<string>;
    controlAreaDescriptionStringProperty: ReadOnlyProperty<string>;
    interactionHintStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      titleStringProperty: stringProperties.screenSummary.doubleSpring.titleStringProperty,
      overviewStringProperty: stringProperties.screenSummary.doubleSpring.overviewStringProperty,
      playAreaDescriptionStringProperty: stringProperties.screenSummary.doubleSpring.playAreaDescriptionStringProperty,
      controlAreaDescriptionStringProperty:
        stringProperties.screenSummary.doubleSpring.controlAreaDescriptionStringProperty,
      interactionHintStringProperty: stringProperties.screenSummary.doubleSpring.interactionHintStringProperty,
    };
  }

  public getPendulumScreenSummaryStrings(): {
    titleStringProperty: ReadOnlyProperty<string>;
    overviewStringProperty: ReadOnlyProperty<string>;
    playAreaDescriptionStringProperty: ReadOnlyProperty<string>;
    controlAreaDescriptionStringProperty: ReadOnlyProperty<string>;
    interactionHintStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      titleStringProperty: stringProperties.screenSummary.pendulum.titleStringProperty,
      overviewStringProperty: stringProperties.screenSummary.pendulum.overviewStringProperty,
      playAreaDescriptionStringProperty: stringProperties.screenSummary.pendulum.playAreaDescriptionStringProperty,
      controlAreaDescriptionStringProperty:
        stringProperties.screenSummary.pendulum.controlAreaDescriptionStringProperty,
      interactionHintStringProperty: stringProperties.screenSummary.pendulum.interactionHintStringProperty,
    };
  }

  public getDoublePendulumScreenSummaryStrings(): {
    titleStringProperty: ReadOnlyProperty<string>;
    overviewStringProperty: ReadOnlyProperty<string>;
    playAreaDescriptionStringProperty: ReadOnlyProperty<string>;
    controlAreaDescriptionStringProperty: ReadOnlyProperty<string>;
    interactionHintStringProperty: ReadOnlyProperty<string>;
  } {
    return {
      titleStringProperty: stringProperties.screenSummary.doublePendulum.titleStringProperty,
      overviewStringProperty: stringProperties.screenSummary.doublePendulum.overviewStringProperty,
      playAreaDescriptionStringProperty:
        stringProperties.screenSummary.doublePendulum.playAreaDescriptionStringProperty,
      controlAreaDescriptionStringProperty:
        stringProperties.screenSummary.doublePendulum.controlAreaDescriptionStringProperty,
      interactionHintStringProperty: stringProperties.screenSummary.doublePendulum.interactionHintStringProperty,
    };
  }

  public getAllStringProperties() {
    return stringProperties;
  }
}
