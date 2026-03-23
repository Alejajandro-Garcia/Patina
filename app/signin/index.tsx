import { ActionButton } from "@/components/action-button";
import { LabeledInput } from "@/components/labeled-input";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, Pressable, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignIn() {
  const insets = useSafeAreaInsets();
  const [signUp, setSignUp] = useState(false);
  const router = useRouter();
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        paddingTop: insets.top,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <Pressable
        style={{
          backgroundColor: colors.foreground,
          padding: 20,
          borderRadius: 8,
          width: "80%",
          gap: 12,
        }}
        onPress={() => Keyboard.dismiss()}
      >
        <Text style={{ fontFamily: fonts.bold, fontSize: 24 }}>
          {signUp ? "Sign Up" : "Sign In"}
        </Text>
        <LabeledInput label="Email" placeholder="Enter your email" />
        <LabeledInput label="Password" placeholder="Enter your password" />
        {signUp && (
          <LabeledInput
            label="Re-enter Password"
            placeholder="Re-enter your password"
          />
        )}
        <ActionButton
          title={signUp ? "Sign Up" : "Sign In"}
          iconName={signUp ? "person-add" : "log-in"}
          callbackFunction={() => {
            router.dismissAll();
            router.replace("/");
          }}
          width={"100%"}
          disableMargin
        />
        <Pressable onPress={() => setSignUp(!signUp)}>
          <Text
            style={{
              fontFamily: fonts.semiBold,
              color: colors.header,
              textAlign: "center",
            }}
          >
            {signUp
              ? "Already have an account? Sign in."
              : "Don't have an account? Sign up."}
          </Text>
        </Pressable>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}
