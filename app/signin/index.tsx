import handleSignIn from "@/api/firebase/signin";
import handleSignUp from "@/api/firebase/signup";
import { ActionButton } from "@/components/action-button";
import { LabeledInput } from "@/components/labeled-input";
import { auth } from "@/firebaseConfig";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { useState } from "react";
import { Keyboard, Pressable, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignIn() {
  /*TODO: Make this an entire form that will actually validate the username and password.
  We should make this where the username is the email and the password is 10 characters long
  including uppercase, lowercase, a number, and a special character. */

  const insets = useSafeAreaInsets();
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPass, setSecondPassword] = useState("");

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
        <LabeledInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          setValue={setEmail}
        />
        <LabeledInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        {signUp && (
          <LabeledInput
            label="Re-enter Password"
            placeholder="Re-enter your password"
            value={secondPass}
            setValue={setSecondPassword}
            secureTextEntry
          />
        )}
        <ActionButton
          title={signUp ? "Sign Up" : "Sign In"}
          iconName={signUp ? "person-add" : "log-in"}
          callbackFunction={() => {
            if (signUp && password === secondPass) {
              handleSignUp(auth, email, password);
            } else {
              handleSignIn(auth, email, password);
            }
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
