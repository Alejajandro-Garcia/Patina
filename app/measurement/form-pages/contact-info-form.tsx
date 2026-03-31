import { ActionButton } from "@/components/action-button";
import { LabeledInput } from "@/components/labeled-input";
import { PatinaPage } from "@/components/patina-page";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function ContactInfoForm() {
  const router = useRouter();

  return (
    <PatinaPage>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={100}
      >
        <LabeledInput label="Full Name" placeholder="John Doe" />
        <LabeledInput label="Address" placeholder="123 Main Street" />
        <LabeledInput label="Email" placeholder="john.doe@example.com" />
        <LabeledInput label="Phone" placeholder="(123) 456-7890" />
        <LabeledInput label="Date (mm/dd/yyyy)" placeholder="MM/DD/YYYY" />
        <View style={styles.actions}>
          <ActionButton
            title="Done"
            iconName="add-circle"
            callbackFunction={() => router.back()}
          />
          <ActionButton
            title="Cancel"
            iconName="close"
            callbackFunction={() => router.back()}
          />
        </View>
      </KeyboardAwareScrollView>
    </PatinaPage>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  actions: {
    flexDirection: "row-reverse",
    paddingTop: 10,
  },
});
