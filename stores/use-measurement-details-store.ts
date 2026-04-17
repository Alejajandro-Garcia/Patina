import {
  AreaType,
  ContactInfoType,
  MeasurementInfoType,
  NotesType,
} from "@/types/measurementInfo";
import { create } from "zustand";

interface MeasurementDetailsState extends MeasurementInfoType {
  setContactInfo: (contactInfo: ContactInfoType) => void;
  setAreas: (areas: AreaType[]) => void;
  setNotes: (notes: NotesType) => void;
  reset: () => void;
}

const initialState: Pick<
  MeasurementDetailsState,
  "measurementID" | "name" | "contactInfo" | "areas" | "notes"
> = {
  measurementID: "",
  name: "",
  contactInfo: null,
  areas: [],
  notes: null,
};

const useMeasurementDetailsStore = create<MeasurementDetailsState>((set) => ({
  ...initialState,
  setContactInfo: (contactInfo: ContactInfoType) => set({ contactInfo }),
  setAreas: (areas: AreaType[]) => set({ areas }),
  setNotes: (notes: NotesType) => set({ notes }),
  reset: () => set({ ...initialState }),
}));

export default useMeasurementDetailsStore;
