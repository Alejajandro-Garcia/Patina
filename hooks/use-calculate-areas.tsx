import {
  ftToM,
  mToFt,
  roundSqFt,
  sqFtToSqM,
  sqMToSqFt,
} from "@/helpers/area-calculations";
import { AreaType } from "@/types/measurement-info";
import { IMPERIAL, Units } from "@/types/units";
import { useMemo } from "react";

const useCalculateAreas = (
  areas: AreaType[],
  total: number,
  imperial: boolean,
  units: Units,
  percentage: number,
) => {
  /* TODO: this might need to change as there are miscalculations, even though it's .01 or .02 it can still be 
  dangerous. For example, 10 * 10.5 in sqft then convert it to metric, afterwards it will be displayed as 9.75
  which should be 9.76. This is because the round(sum((k * l * w * k))) != sum(values) * k */
  return useMemo(() => {
    const currentlyImperial = units === IMPERIAL;
    if (imperial === currentlyImperial)
      return { areas, total: total + total * percentage };

    const convertDimension = currentlyImperial ? mToFt : ftToM;
    const convertArea = currentlyImperial ? sqMToSqFt : sqFtToSqM;

    return {
      areas: areas.map((area) => ({
        ...area,
        length: roundSqFt(convertDimension(area.length)),
        width: roundSqFt(convertDimension(area.width)),
      })),
      total: roundSqFt(convertArea(total) + convertArea(total) * percentage),
    };
  }, [areas, total, imperial, units, percentage]);
};

export default useCalculateAreas;
