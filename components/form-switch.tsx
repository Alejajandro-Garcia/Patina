import { colors } from "@/theme/colors";
import { Controller, useFormContext } from "react-hook-form";
import { Switch } from "react-native";

interface FormSwitchProps {
  name: string;
}

export const FormSwitch = ({ name }: FormSwitchProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Switch
          trackColor={{ false: "#767577", true: colors.input }}
          thumbColor={colors.foreground}
          ios_backgroundColor="#3e3e3e"
          value={!!value}
          onValueChange={onChange}
        />
      )}
    />
  );
};
