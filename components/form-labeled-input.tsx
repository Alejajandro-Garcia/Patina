import { Controller, useFormContext } from "react-hook-form";
import { LabeledInput } from "./labeled-input";

interface FormLabeledInputProps {
  name: string;
  label?: string;
  placeholder: string;
  number?: boolean;
  textArea?: boolean;
  required?: boolean;
  secureTextEntry?: boolean;
}

export const FormLabeledInput = ({
  name,
  required,
  ...rest
}: FormLabeledInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LabeledInput
          {...rest}
          value={value ?? ""}
          setValue={onChange}
          error={!!error}
        />
      )}
    />
  );
};
