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
  error?: boolean;
}

export const LabeledInput = ({
  label,
  placeholder,
  number,
  textArea,
  value,
  setValue,
  error,
}: LabeledInputProps) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        style={[
          styles.inputWrapper,
          { minHeight: textArea ? 100 : 20 },
          error && styles.errorBorder,
        ]}
        multiline={textArea}
        numberOfLines={textArea ? 3 : 1}
        keyboardType={number ? "decimal-pad" : "default"}
        value={value}
        onChangeText={setValue}
        maxLength={!textArea ? 50 : 150}
        autoCapitalize="none"
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
  errorBorder: {
    borderWidth: 1,
    borderColor: "red",
  },
});
