import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";
export const SearchBar = () => {
  return (
    <View style={style.container}>
      <Ionicons name="search" size={20} color={colors.placeholder} />
      <TextInput
        placeholder="Search Measurements..."
        placeholderTextColor={colors.placeholder}
        style={style.input}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.input,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: fonts.regular,
  },
});
