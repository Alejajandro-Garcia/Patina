import {
  roundSqFt,
  sqFtToSqM,
  sqMToSqFt,
} from "@/helpers/area-calculations";
import { IMPERIAL, Units } from "@/types/units";
import MeasurementModel from "@/watermelonDB/model/measurement";
import { useMemo } from "react";

interface useCalculateLandingPageAreaProps {
  measurement: MeasurementModel;
  units: Units;
}

const useCalculateLandingPageArea = ({
  measurement,
  units,
}: useCalculateLandingPageAreaProps) => {
  return useMemo(() => {
    const currentlyImperial = units === IMPERIAL;
    if (measurement.imperial === currentlyImperial) return measurement.total;

    return roundSqFt(
      currentlyImperial
        ? sqMToSqFt(measurement.total)
        : sqFtToSqM(measurement.total),
    );
  }, [measurement, units]);
};

export default useCalculateLandingPageArea;
