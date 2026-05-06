import { colors } from "@/theme/colors";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./header";

interface PatinaPageProps {
  children: ReactNode;
  goBackCallBack?: () => void;
}
export const PatinaPage = ({ children, goBackCallBack }: PatinaPageProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Header goBackCallBack={goBackCallBack} />
      {children}
    </SafeAreaView>
  );
};
