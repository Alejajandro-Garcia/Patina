import { Units } from "@/types/units";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface SettingsState {
  units: Units;
  percentage: number;
  setUnits: (units: Units) => void;
  setPercentage: (percentage: number) => void;
}

const initialState: Pick<SettingsState, "units" | "percentage"> = {
  units: "Imperial (sqft/in)",
  percentage: 0,
};

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...initialState,
      setUnits: (units: Units) => set({ units }),
      setPercentage: (percentage: number) => set({ percentage }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useSettingsStore;
