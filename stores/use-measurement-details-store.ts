import {
  AreaType,
  ContactInfoType,
  MeasurementInfoType,
  NotesType,
} from "@/types/measurement-info";
import { create } from "zustand";

interface MeasurementDetailsState extends MeasurementInfoType {
  setContactInfo: (contactInfo: ContactInfoType) => void;
  setAreas: (areas: AreaType[]) => void;
  setNotes: (notes: NotesType) => void;
  setImperial: (imperial: boolean) => void;
  setTotal: (total: number) => void;
  hydrate: (measurement: MeasurementInfoType) => void;
  reset: () => void;
}

const initialState: Pick<
  MeasurementDetailsState,
  | "measurementID"
  | "name"
  | "contactInfo"
  | "areas"
  | "notes"
  | "imperial"
  | "total"
> = {
  measurementID: "",
  name: "",
  contactInfo: null,
  areas: [],
  notes: null,
  imperial: true,
  total: 0,
};

const useMeasurementDetailsStore = create<MeasurementDetailsState>((set) => ({
  ...initialState,
  setContactInfo: (contactInfo: ContactInfoType) => set({ contactInfo }),
  setAreas: (areas: AreaType[]) => set({ areas }),
  setNotes: (notes: NotesType) => set({ notes }),
  setImperial: (imperial: boolean) => set({ imperial }),
  setTotal: (total: number) => set({ total }),
  hydrate: (measurement: MeasurementInfoType) => set({ ...measurement }),
  reset: () => set({ ...initialState }),
}));

export default useMeasurementDetailsStore;
