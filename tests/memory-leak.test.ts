/**
 * Fleet-standard memory-leak regression suite.
 * StatePropertyMapper owns no global links — create, setState, drop for GC.
 */

import { NumberProperty } from "scenerystack/axon";
import { describe, expect, it } from "vitest";
import { StatePropertyMapper } from "../src/common/model/StatePropertyMapper.js";

async function forceGC(earlyExitRef?: WeakRef<object>): Promise<void> {
  for (let i = 0; i < 15; i++) {
    globalThis.gc?.();
    await new Promise<void>((r) => setTimeout(r, 50));
    if (earlyExitRef !== undefined && earlyExitRef.deref() === undefined) {
      return;
    }
    if (earlyExitRef !== undefined) {
      await new Promise<void>((r) => setTimeout(r, 0));
    }
  }
}

function createAndDisposeMapper(): WeakRef<object> {
  const p1 = new NumberProperty(1);
  const p2 = new NumberProperty(0);
  const mapper = new StatePropertyMapper([p1, p2]);
  mapper.setState([2, -1]);
  const ref = new WeakRef<object>(mapper);
  p1.dispose();
  p2.dispose();
  return ref;
}

describe("Memory leak regression", () => {
  it("global.gc is available (--expose-gc)", () => {
    expect(globalThis.gc).toBeDefined();
  });

  it("sanity: plain object is collected", async () => {
    const ref = (() => new WeakRef({ hello: "world" }))();
    await forceGC(ref);
    expect(ref.deref()).toBeUndefined();
  });

  it("StatePropertyMapper is collected after drop", async () => {
    const ref = createAndDisposeMapper();
    await forceGC(ref);
    expect(ref.deref()).toBeUndefined();
  });

  it("repeated create/dispose cycles leave no survivors", async () => {
    const refs: WeakRef<object>[] = [];
    for (let i = 0; i < 10; i++) {
      refs.push(createAndDisposeMapper());
    }
    await forceGC();
    expect(refs.filter((r) => r.deref() !== undefined).length).toBe(0);
  });
});
