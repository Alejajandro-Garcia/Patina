import { Model, Relation } from "@nozbe/watermelondb";
import { date, field, relation, text } from "@nozbe/watermelondb/decorators";
import MeasurementInfo from "./measurementInfo";

export default class Measurement extends Model {
  static table = "measurements";
  @relation("measurement_info", "measurement_id") info: Relation<MeasurementInfo>;
  @field("measurement_id") measurementId: string;
  @text("name") name: string;
  @field("total_sqft") totalSqft: number;
  @date("date") date: Date;
}
