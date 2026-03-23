import { ActionButton } from "@/components/action-button";
import { LabeledInput } from "@/components/labeled-input";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Keyboard, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignIn() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
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
          height: "60%",
          gap: 12,
        }}
        onPress={() => Keyboard.dismiss()}
      >
        <Text style={{ fontFamily: fonts.bold, fontSize: 24 }}>Sign In</Text>
        <LabeledInput label="Email" placeholder="Enter your email" />
        <LabeledInput label="Password" placeholder="Enter your password" />
        <ActionButton
          title="Sign In"
          iconName="log-in"
          callbackFunction={() => {}}
          width={"100%"}
          disableMargin
        />
        <Pressable onPress={() => console.log("hello")}>
          <Text style={{ fontFamily: fonts.semiBold, color: "white" }}>
            or create an account
          </Text>
        </Pressable>
      </Pressable>
    </View>
  );
}
