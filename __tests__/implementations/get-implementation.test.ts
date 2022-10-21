import sass from "sass";
import nodeSass from "node-sass";
import * as sassEmbedded from "sass-embedded";

import { getImplementation } from "../../lib/implementations";

describe("getImplementation", () => {
  it("returns the correct implementation when explicitly passed", () => {
    expect(getImplementation("node-sass")).toEqual(nodeSass);
    expect(getImplementation("sass")).toEqual(sass);
    expect(getImplementation("sass-embedded")).toEqual(sassEmbedded);
  });

  it("returns the correct default implementation if it is invalid", () => {
    expect(getImplementation("wat-sass" as any)).toEqual(nodeSass);
    expect(getImplementation()).toEqual(nodeSass);
  });
});
