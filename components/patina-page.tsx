import { colors } from "@/theme/colors";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./header";

interface PatinaPageProps {
  children: ReactNode;
}
export const PatinaPage = ({ children }: PatinaPageProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Header />
      {children}
    </SafeAreaView>
  );
};
