import { MeasurementDBType } from "@/types/measurement-info";
import database from "@/watermelonDB";
import Measurement from "@/watermelonDB/model/measurement";

const addMeasurement = async (measurement: MeasurementDBType) => {
  await database.write(async () => {
    await database
      .get<Measurement>("measurements")
      .create((createdMeasurement) => {
        createdMeasurement.name = measurement.name;
        createdMeasurement.notes = measurement.notes;
        createdMeasurement.contactInfo = measurement.contactInfo;
        createdMeasurement.areas = measurement.areas;
        createdMeasurement.imperial = measurement.imperial;
        createdMeasurement.date = new Date(measurement.contactInfo.date);
        createdMeasurement.total = measurement.total;
      });
  });
};

export default addMeasurement;
