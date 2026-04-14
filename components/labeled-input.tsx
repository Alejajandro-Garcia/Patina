import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface LabeledInputProps {
  label?: string;
  placeholder: string;
  number?: boolean;
  textArea?: boolean;
  value?: string;
  setValue?: (value: string) => void;
}

export const LabeledInput = ({
  label,
  placeholder,
  number,
  textArea,
  value,
  setValue,
}: LabeledInputProps) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        style={[styles.inputWrapper, { minHeight: textArea ? 100 : 20 }]}
        multiline={textArea}
        numberOfLines={textArea ? 3 : 1}
        keyboardType={number ? "numeric" : "default"}
        value={value}
        onChangeText={setValue}
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
