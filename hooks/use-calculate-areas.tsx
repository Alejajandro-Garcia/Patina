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
) => {
  return useMemo(() => {
    const currentlyImperial = units === IMPERIAL;
    if (imperial === currentlyImperial) return { areas, total };

    const convertLength = currentlyImperial ? mToFt : ftToM;
    const convertArea = currentlyImperial ? sqMToSqFt : sqFtToSqM;

    return {
      areas: areas.map((area) => ({
        ...area,
        length: roundSqFt(convertLength(area.length)),
        width: roundSqFt(convertLength(area.width)),
      })),
      total: roundSqFt(convertArea(total)),
    };
  }, [areas, total, imperial, units]);
};

export default useCalculateAreas;
