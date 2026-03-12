import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface LabeledInputProps {
  label: string;
  placeholder: string;
}

export const LabeledInput = ({ label, placeholder }: LabeledInputProps) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        style={styles.inputWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.semiBold,
  },
  inputWrapper: {
    backgroundColor: colors.input,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 3,
    fontFamily: fonts.regular,
  },
});
