import { afterEach, describe, expect, it } from "vitest";
import { SingleSpringModel } from "../../../src/single-spring/model/SingleSpringModel.js";

describe("SingleSpringModel", () => {
  let model: SingleSpringModel;

  afterEach(() => {
    model.reset();
  });

  it("constructs with default preset state", () => {
    model = new SingleSpringModel();

    expect(model.positionProperty.value).toBeCloseTo(1, 6);
    expect(model.velocityProperty.value).toBeCloseTo(0, 6);
    expect(model.timeProperty.value).toBeCloseTo(0, 6);
  });

  it("advances time on a forced step while paused", () => {
    model = new SingleSpringModel();
    model.isPlayingProperty.value = false;

    model.step(0.05, true);

    expect(model.timeProperty.value).toBeGreaterThan(0);
  });

  it("reset restores initial state and time", () => {
    model = new SingleSpringModel();
    model.velocityProperty.value = 2;
    model.positionProperty.value = -2;
    model.step(0.1, true);

    model.reset();

    expect(model.positionProperty.value).toBeCloseTo(model.positionProperty.initialValue, 6);
    expect(model.velocityProperty.value).toBeCloseTo(0, 6);
    expect(model.timeProperty.value).toBeCloseTo(0, 6);
  });

  it("displaced mass gains nonzero velocity when stepped", () => {
    model = new SingleSpringModel();
    model.isPlayingProperty.value = false;
    model.positionProperty.value = 2;
    model.velocityProperty.value = 0;

    model.step(0.05, true);

    expect(model.velocityProperty.value).not.toBeCloseTo(0, 6);
  });
});
