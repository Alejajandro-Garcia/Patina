import database from "@/watermelonDB";
import Measurement from "@/watermelonDB/model/measurement";

const deleteMeasurement = (id: string) => {
  database.write(async () => {
    const record = await database.get<Measurement>("measurements").find(id);
    await record.destroyPermanently();
  });
};

export default deleteMeasurement;
