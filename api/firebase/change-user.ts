import useAuthStore from "@/stores/use-auth-store";
import { router } from "expo-router";
import { Auth, signOut } from "firebase/auth";

const changeUser = (auth: Auth) => {
  useAuthStore.getState().setSigningOut(true);
  signOut(auth)
    .then(() => {
      router.push("/signin");
    })
    .catch((error) => {
      useAuthStore.getState().setSigningOut(false);
      console.debug(error.code, error.message);
    });
};

export default changeUser;
