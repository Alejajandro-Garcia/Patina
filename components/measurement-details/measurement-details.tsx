import { ActionButton } from "@/components/action-button";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { MeasurementInfoType } from "@/types/measurementInfo";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ContactInfo } from "./contact-info";
import { MeasurementCard } from "./measurement-card";
import { Notes } from "./notes";

interface MeasurementDetailsProps {
  measurement: MeasurementInfoType | null;
}

export const MeasurementDetails = ({
  measurement,
}: MeasurementDetailsProps) => {
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={confirmationModalVisible}
        title="Unsaved changes"
        message="You have unsaved changes. Are you sure you want to discard?"
        onClose={() => setConfirmationModalVisible(false)}
        onConfirm={() => {
          setConfirmationModalVisible(false);
          router.back();
        }}
      />
      <ContactInfo />
      <MeasurementCard />
      <Notes />
      <View style={styles.actions}>
        <ActionButton
          iconName="close-circle"
          title="Cancel"
          callbackFunction={() => setConfirmationModalVisible(true)}
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
