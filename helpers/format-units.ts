import { AreaType } from "@/types/measurement-info";
import { measurementUnitTruncated, METRIC, Units } from "@/types/units";

export const formatAreaString = (area: AreaType, units: Units) => {
  const stepsString = area.steps ? ` x ${area.steps}` : "";
  if (units === METRIC) {
    return `${area.length} ${measurementUnitTruncated[units]} x ${area.width}${stepsString}`;
  }
  return `${area.length}${measurementUnitTruncated[units]} x ${area.width}${measurementUnitTruncated[units]}${stepsString}`;
};
