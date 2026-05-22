import type {
  AreaType,
  ContactInfoType,
  NotesType,
} from "@/types/measurement-info";
import { Model } from "@nozbe/watermelondb";
import { date, field, json, text } from "@nozbe/watermelondb/decorators";

const sanitizeJson = (raw: unknown) => raw;
const sanitizeAreas = (raw: unknown) => (Array.isArray(raw) ? raw : []);

export default class Measurement extends Model {
  static table = "measurements";
  @text("name") name: string;
  @field("total_sqft") total: number;
  @field("imperial")
  imperial: boolean;
  @date("date")
  date: Date;
  @json("contact_info", sanitizeJson) contactInfo: ContactInfoType | null;
  @json("areas", sanitizeAreas) areas: AreaType[];
  @json("notes", sanitizeJson) notes: NotesType | null;
}
