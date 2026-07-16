import { User } from "firebase/auth";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  signingOut: boolean;
  setUser: (user: User) => void;
  setSigningOut: (signingOut: boolean) => void;
  reset: () => void;
}

const initialState: Pick<AuthState, "user" | "signingOut"> = {
  user: null,
  signingOut: false,
};

const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  setUser: (user: User) => set({ user }),
  setSigningOut: (signingOut: boolean) => set({ signingOut }),
  reset: () => set({ ...initialState }),
}));

export default useAuthStore;
