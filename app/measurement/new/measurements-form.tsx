import { ActionButton } from "@/components/action-button";
import { LabeledInput } from "@/components/labeled-input";
import { PatinaPage } from "@/components/patina-page";
import { fonts } from "@/theme/fonts";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

export default function MeasurementsForm() {
  const router = useRouter();
  const [hasSteps, setHasSteps] = useState(false);

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
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Text style={{ fontFamily: fonts.semiBold }}>Stairs</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  value={hasSteps}
                  onValueChange={setHasSteps}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 1, gap: 8 }}>
            <LabeledInput label="Width" placeholder="10" number />
            <View style={{ opacity: hasSteps ? 1 : 0 }}>
              <LabeledInput label="Steps" placeholder="0" number />
            </View>
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
