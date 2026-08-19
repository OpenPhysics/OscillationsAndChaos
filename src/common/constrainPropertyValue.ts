/**
 * Assign a NumberProperty without tripping range validation — integration and
 * drag can overshoot the declared range when fuzz or keyboard nudging accumulates.
 */

import type { NumberProperty } from "scenerystack/axon";

export function setConstrainedPropertyValue(property: NumberProperty, value: number): void {
  property.value = property.rangeProperty.value.constrainValue(value);
}

export function addConstrainedPropertyDelta(property: NumberProperty, delta: number): void {
  setConstrainedPropertyValue(property, property.value + delta);
}
