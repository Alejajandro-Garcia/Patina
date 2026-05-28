import { dateStringToDBDate } from "@/helpers/format-date";
import { MeasurementDBType } from "@/types/measurement-info";
import database from "@/watermelonDB";
import Measurement from "@/watermelonDB/model/measurement";

const updateMeasurement = async (
  measurement: MeasurementDBType,
  measurementId: string,
) => {
  await database.write(async () => {
    const existingMeasurement = await database
      .get<Measurement>("measurements")
      .find(measurementId);
    await existingMeasurement.update((measurementToBeUpdated) => {
      measurementToBeUpdated.name = measurement.name;
      measurementToBeUpdated.areas = measurement.areas;
      measurementToBeUpdated.notes = measurement.notes;
      measurementToBeUpdated.contactInfo = measurement.contactInfo;
      measurementToBeUpdated.imperial = measurement.imperial;
      measurementToBeUpdated.date = dateStringToDBDate(
        measurement.contactInfo.date,
      );
      measurementToBeUpdated.total = measurement.total;
    });
  });
};

export default updateMeasurement;
