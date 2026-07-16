import FailedToast from "@/components/toast-configs/failed-toast";
import { auth } from "@/firebaseConfig";
import useAuthStore from "@/stores/use-auth-store";
import "@/watermelonDB";
import syncMeasurements from "@/watermelonDB/sync";
import {
  Inter_300Light,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager, { Toast } from "toastify-react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      const { user: prevUser, signingOut, setUser, reset } =
        useAuthStore.getState();

      if (user) {
        setUser(user);
        syncMeasurements().catch((error) =>
          console.debug("sync failed", error),
        );
        return;
      }

      reset();
      if (prevUser && !signingOut) {
        Toast.show(FailedToast("Your session expired — please sign in again"));
      }
      return;
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <ToastManager useModal={false} />
      </SafeAreaProvider>
    </KeyboardProvider>
  );
}
