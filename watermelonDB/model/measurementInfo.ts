import type {
  AreaType,
  ContactInfoType,
  NotesType,
} from "@/types/measurementInfo";
import { Model } from "@nozbe/watermelondb";
import { field, json, text } from "@nozbe/watermelondb/decorators";

const sanitizeJson = (raw: unknown) => raw;
const sanitizeAreas = (raw: unknown) => (Array.isArray(raw) ? raw : []);

export default class MeasurementInfo extends Model {
  static table = "measurement_info";
  @field("measurement_id") measurementId: string;
  @text("name") name: string;
  @json("contact_info", sanitizeJson) contactInfo: ContactInfoType;
  @json("areas", sanitizeAreas) areas: AreaType[];
  @json("notes", sanitizeJson) notes: NotesType;
}
