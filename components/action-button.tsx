import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
interface ActionButtonProps {
  iconName: keyof typeof Ionicons.glyphMap;
  height?: number;
  width?: number;
  title: string;
}
export const ActionButton = ({
  iconName,
  height = 40,
  width = 90,
  title,
}: ActionButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        height: height,
        width: width,
        backgroundColor: colors.input,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginLeft: 8,
      }}
    >
      <Ionicons name={iconName} size={20} />
      <Text style={{ fontFamily: fonts.semiBold }}> {title} </Text>
    </TouchableOpacity>
  );
};
