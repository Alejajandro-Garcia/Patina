import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ActionButtonProps {
  iconName: keyof typeof Ionicons.glyphMap;
  height?: number;
  width?: number;
  disableMargin?: boolean;
  title: string;
  callbackFunction?: () => void;
}

export const ActionButton = ({
  iconName,
  height = 40,
  width = 90,
  disableMargin,
  title,
  callbackFunction,
}: ActionButtonProps) => {
  return (
    <TouchableOpacity
      onPress={callbackFunction}
      style={[
        styles.button,
        { height, width },
        { marginLeft: disableMargin ? 0 : 8 },
      ]}
    >
      <Ionicons name={iconName} size={20} />
      <Text style={styles.text}> {title} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.input,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontFamily: fonts.semiBold,
  },
});
