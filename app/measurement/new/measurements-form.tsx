import { ActionButton } from "@/components/action-button";
import { LabeledInput } from "@/components/labeled-input";
import { PatinaPage } from "@/components/patina-page";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Switch, View } from "react-native";

export default function MeasurementsForm() {
  const router = useRouter();

  return (
    <PatinaPage>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LabeledInput label="Area Name" placeholder="Living Room" />
        <View style={{ flexDirection: "row", gap: 8 }}>
          <View style={{ flex: 1, gap: 8 }}>
            <LabeledInput label="Length" placeholder="12" number />
            <LabeledInput label="Steps" placeholder="0" number />
          </View>
          <View style={{ flex: 1, gap: 8 }}>
            <LabeledInput label="Width" placeholder="10" number />
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
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
      </ScrollView>
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
