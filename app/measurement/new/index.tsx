import { ActionButton } from "@/components/action-button";
import { ContactInfo } from "@/components/measurement-details.tsx/contact-info";
import { MeasurementCard } from "@/components/measurement-details.tsx/measurement-card";
import { Notes } from "@/components/measurement-details.tsx/notes";
import { PatinaPage } from "@/components/patina-page";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function MeasurementDetails() {
  return (
    <PatinaPage>
      <View style={styles.container}>
        <ContactInfo />
        <MeasurementCard />
        <Notes />
        <View style={styles.actions}>
          <ActionButton
            iconName="close-circle"
            title="Cancel"
            callbackFunction={() => router.back()}
          />
          <ActionButton
            iconName="save"
            title="Save"
            callbackFunction={() => router.back()}
          />
        </View>
      </View>
    </PatinaPage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
