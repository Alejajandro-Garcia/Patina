import { create } from "zustand";
interface SettingsState {
  units: "Imperial (sqft/in)" | "Metric (m/cm)";
  percentage: number;
  setUnits: (units: "Imperial (sqft/in)" | "Metric (m/cm)") => void;
  setPercentage: (percentage: number) => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
  units: "Imperial (sqft/in)",
  percentage: 0,
  setUnits: (units: "Imperial (sqft/in)" | "Metric (m/cm)") => set({ units }),
  setPercentage: (percentage: number) => set({ percentage }),
}));

export default useSettingsStore;
