import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

interface HeaderProps {
  goBackCallBack?: () => void;
}

export const Header = ({ goBackCallBack }: HeaderProps) => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: router.canGoBack() ? "row" : "row-reverse",
        backgroundColor: colors.header,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 20,
        justifyContent: "space-between",
      }}
    >
      {router.canGoBack() && (
        <TouchableOpacity
          onPress={() => {
            if (goBackCallBack) goBackCallBack();
            else router.back();
          }}
        >
          <Ionicons
            name="chevron-back-circle"
            style={{ color: colors.input }}
            size={40}
          />
        </TouchableOpacity>
      )}
      {!router.canGoBack() && (
        <TouchableOpacity
          onPress={() => {
            router.push({ pathname: "/settings/settings" });
          }}
        >
          <Ionicons name="settings" style={{ color: colors.input }} size={40} />
        </TouchableOpacity>
      )}
    </View>
  );
};
