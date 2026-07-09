import handleSignIn from "@/api/firebase/signin";
import handleSignUp from "@/api/firebase/signup";
import { ActionButton } from "@/components/action-button";
import { FormLabeledInput } from "@/components/form-labeled-input";
import FailedToast from "@/components/toast-configs/failed-toast";
import { auth } from "@/firebaseConfig";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { AuthFormSchema, AuthFormType } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, FormProvider, useForm, useWatch } from "react-hook-form";
import { Keyboard, Pressable, StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

const defaultValues: AuthFormType = {
  signUp: false,
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignIn() {
  const insets = useSafeAreaInsets();
  const methods = useForm<AuthFormType>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues,
  });
  const { handleSubmit, control, setValue } = methods;
  const signUp = useWatch({ control, name: "signUp" });

  const onSubmit = (data: AuthFormType) => {
    if (data.signUp) {
      handleSignUp(auth, data.email, data.password);
      return;
    }
    handleSignIn(auth, data.email, data.password);
    return;
  };

  const onInvalid = (errors: FieldErrors<AuthFormType>) => {
    const message = Object.values(errors)[0]?.message;
    Toast.show(FailedToast(message ?? "Please fix the highlighted fields"));
    return;
  };

  return (
    <FormProvider {...methods}>
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top }]}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable style={styles.card} onPress={() => Keyboard.dismiss()}>
          <Text style={styles.title}>{signUp ? "Sign Up" : "Sign In"}</Text>
          <FormLabeledInput
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <FormLabeledInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
          />
          {signUp && (
            <FormLabeledInput
              name="confirmPassword"
              label="Re-enter Password"
              placeholder="Re-enter your password"
              secureTextEntry
            />
          )}
          <ActionButton
            title={signUp ? "Sign Up" : "Sign In"}
            iconName={signUp ? "person-add" : "log-in"}
            callbackFunction={handleSubmit(onSubmit, onInvalid)}
            width={"100%"}
            disableMargin
          />
          <Pressable onPress={() => setValue("signUp", !signUp)}>
            <Text style={styles.toggleText}>
              {signUp
                ? "Already have an account? Sign in."
                : "Don't have an account? Sign up."}
            </Text>
          </Pressable>
        </Pressable>
      </KeyboardAwareScrollView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.foreground,
    padding: 20,
    borderRadius: 8,
    width: "80%",
    gap: 12,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
  },
  toggleText: {
    fontFamily: fonts.semiBold,
    color: colors.header,
    textAlign: "center",
  },
});
