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
