import nodeSass from "node-sass";
import sass from "sass";
import sassEmbedded from "sass-embedded";

/**
 * A list of all possible SASS package implementations that can be used to
 * perform the compilation and parsing of the SASS files. The expectation is
 * that they provide a nearly identical API so they can be swapped out but
 * all of the same logic can be reused.
 */
export const IMPLEMENTATIONS = ["node-sass", "sass", "sass-embedded"] as const;
export type Implementations = typeof IMPLEMENTATIONS[number];

type Implementation = typeof nodeSass | typeof sass | typeof sassEmbedded;

const defaultFallbackImplementation = "node-sass";
/**
 * Determine which default implementation to use by checking which packages
 * are actually installed and available to use.
 *
 * @param resolver DO NOT USE - this is unfortunately necessary only for testing.
 */
export const getDefaultImplementation = (
  resolver: RequireResolve = require.resolve
): Implementations => {
  for (const implementation of IMPLEMENTATIONS) {
    try {
      resolver(implementation);
      return implementation;
    } catch (ignoreError) {}
  }
  return defaultFallbackImplementation;
};

/**
 * Retrieve the desired implementation.
 *
 * @param implementation the desired implementation.
 */
export const getImplementation = (
  implementation?: Implementations
): Implementation => {
  switch (implementation) {
    case "sass":
      return require("sass");
    case "sass-embedded":
      return require("sass-embedded");
    case "node-sass":
    case undefined:
    default:
      return require("node-sass");
  }
};
