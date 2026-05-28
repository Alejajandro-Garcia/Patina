import { MeasurementInfoType } from "@/types/measurement-info";
import database from "@/watermelonDB";
import Measurement from "@/watermelonDB/model/measurement";

const fetchMeasurement = async (id: string): Promise<MeasurementInfoType> => {
  const receivedMeasurement = await database
    .get<Measurement>("measurements")
    .find(id);

  return {
    measurementID: receivedMeasurement.id,
    name: receivedMeasurement.name,
    contactInfo: receivedMeasurement.contactInfo,
    areas: receivedMeasurement.areas,
    notes: receivedMeasurement.notes,
    imperial: receivedMeasurement.imperial,
    total: receivedMeasurement.total,
  };
};

export default fetchMeasurement;
