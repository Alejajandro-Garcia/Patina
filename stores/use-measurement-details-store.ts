import {
  AreaType,
  ContactInfoType,
  MeasurementInfoType,
  NotesType,
} from "@/types/measurementInfo";
import { create } from "zustand";

const useMeasurementDetailsStore = create<MeasurementInfoType>((set) => ({
  measurementID: "",
  name: "",
  contactInfo: null,
  areas: [],
  notes: null,
  setContactInfo: (contactInfo: ContactInfoType) => set({ contactInfo }),
  setAreas: (areas: AreaType[]) => set({ areas }),
  setNotes: (notes: NotesType) => set({ notes }),
}));
