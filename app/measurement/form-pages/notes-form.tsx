import { ActionButton } from "@/components/action-button";
import { LabeledInput } from "@/components/labeled-input";
import { PatinaPage } from "@/components/patina-page";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function NotesForm() {
  const router = useRouter();

  return (
    <PatinaPage>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LabeledInput
          label="Product Info"
          placeholder="European Collection - Paris Grey 7x8x9 20 mil wear layer"
          textArea
        />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1, gap: 10 }}>
            <LabeledInput label="Toilet R&R" placeholder="0" number />
            <LabeledInput label="Floor Prep" placeholder="0" number />
            <LabeledInput label="Pull Up & Disposal" placeholder="0" number />
            <LabeledInput label="Endcaps" placeholder="0" number />
            <LabeledInput label="Reducers" placeholder="0" number />
          </View>
          <View style={{ flex: 1, gap: 10 }}>
            <LabeledInput label="Furniture R&R" placeholder="0" number />
            <LabeledInput label="Appliances R&R" placeholder="0" number />
            <LabeledInput label="Baseboards" placeholder="0" number />
            <LabeledInput label="T-Moldings" placeholder="0" number />
          </View>
        </View>
        <View style={styles.actions}>
          <ActionButton
            title="Save"
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
