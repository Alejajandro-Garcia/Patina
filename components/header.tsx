import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
export const Header = () => {
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
          onPress={(e) => {
            router.back();
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
          onPress={(e) => {
            router.push({ pathname: "/settings" });
          }}
        >
          <Ionicons name="settings" style={{ color: colors.input }} size={40} />
        </TouchableOpacity>
      )}
    </View>
  );
};
