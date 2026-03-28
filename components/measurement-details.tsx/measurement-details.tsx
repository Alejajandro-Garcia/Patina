import { ActionButton } from "@/components/action-button";
import { MeasurementInfoType } from "@/types/measurementInfo";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ContactInfo } from "./contact-info";
import { MeasurementCard } from "./measurement-card";
import { Notes } from "./notes";

type MeasurementDetailsProps = {
  measurement: MeasurementInfoType | null;
};

export const MeasurementDetails = ({ measurement }: MeasurementDetailsProps) => {
  return (
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
  );
};

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
