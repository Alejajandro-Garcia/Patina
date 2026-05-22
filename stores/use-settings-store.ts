import { Units } from "@/types/units";
import { create } from "zustand";
interface SettingsState {
  units: "Imperial (sqft/in)" | "Metric (m/cm)";
  percentage: number;
  setUnits: (units: Units) => void;
  setPercentage: (percentage: number) => void;
}

const initialState: Pick<SettingsState, "units" | "percentage"> = {
  units: "Imperial (sqft/in)",
  percentage: 0,
};

const useSettingsStore = create<SettingsState>((set) => ({
  ...initialState,
  setUnits: (units: Units) => set({ units }),
  setPercentage: (percentage: number) => set({ percentage }),
}));

export default useSettingsStore;
