export const IMPERIAL = "Imperial (sqft/in)";
export const METRIC = "Metric (m/cm)";

export type Units = typeof IMPERIAL | typeof METRIC;

export const measurementUnit: Record<Units, string> = {
  [IMPERIAL]: "ft²",
  [METRIC]: "m²",
} as const;

export const measurementUnitTruncated: Record<Units, string> = {
  [IMPERIAL]: "'",
  [METRIC]: "m",
};
