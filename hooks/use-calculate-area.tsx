import { roundSqFt, sqFtToSqM, sqMToSqFt } from "@/helpers/area-calculations";
import { IMPERIAL, Units } from "@/types/units";
import MeasurementModel from "@/watermelonDB/model/measurement";
import { useMemo } from "react";

interface useCalculateLandingPageAreaProps {
  measurement: MeasurementModel;
  units: Units;
  percentage: number;
}

const useCalculateLandingPageArea = ({
  measurement,
  units,
  percentage,
}: useCalculateLandingPageAreaProps) => {
  return useMemo(() => {
    let total = 0;
    const currentlyImperial = units === IMPERIAL;
    if (measurement.imperial === currentlyImperial) {
      total = measurement.total;
      return roundSqFt(total + total * percentage);
    }

    total = currentlyImperial
      ? sqMToSqFt(measurement.total)
      : sqFtToSqM(measurement.total);
    return roundSqFt(total + total * percentage);
  }, [measurement, units, percentage]);
};

export default useCalculateLandingPageArea;
