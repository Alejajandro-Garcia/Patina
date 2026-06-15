import {
  AreaType,
  ContactInfoType,
  MeasurementInfoType,
  NotesType,
} from "@/types/measurement-info";
import { create } from "zustand";

interface MeasurementDetailsState extends MeasurementInfoType {
  dirty: boolean;
  setContactInfo: (contactInfo: ContactInfoType) => void;
  setAreas: (areas: AreaType[]) => void;
  setNotes: (notes: NotesType) => void;
  setImperial: (imperial: boolean) => void;
  setTotal: (total: number) => void;
  setDirty: (dirty: boolean) => void;
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
  | "dirty"
> = {
  measurementID: "",
  name: "",
  contactInfo: null,
  areas: [],
  notes: null,
  imperial: true,
  total: 0,
  dirty: false,
};

const useMeasurementDetailsStore = create<MeasurementDetailsState>((set) => ({
  ...initialState,
  setContactInfo: (contactInfo: ContactInfoType) => set({ contactInfo }),
  setAreas: (areas: AreaType[]) => set({ areas }),
  setNotes: (notes: NotesType) => set({ notes }),
  setImperial: (imperial: boolean) => set({ imperial }),
  setTotal: (total: number) => set({ total }),
  setDirty: (dirty: boolean) => set({ dirty }),
  hydrate: (measurement: MeasurementInfoType) =>
    set({ ...measurement, dirty: false }),
  reset: () => set({ ...initialState }),
}));

export default useMeasurementDetailsStore;
