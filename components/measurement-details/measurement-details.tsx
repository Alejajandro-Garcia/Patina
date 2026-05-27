import addMeasurement from "@/api/db/create";
import updateMeasurement from "@/api/db/update";
import { ActionButton } from "@/components/action-button";
import { ConfirmationModal } from "@/components/confirmation-modal";
import useMeasurementDetailsStore from "@/stores/use-measurement-details-store";
import useSettingsStore from "@/stores/use-settings-store";
import {
  MeasurementDBType,
  MeasurementInfoType,
} from "@/types/measurement-info";
import { IMPERIAL } from "@/types/units";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Toast } from "toastify-react-native";
import { useShallow } from "zustand/react/shallow";
import FailedToast from "../toast-configs/failed-toast";
import SuccessToast from "../toast-configs/success-toast";
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

  const { units } = useSettingsStore();
  const { areas, contactInfo, notes, id, name, total, imperial } =
    useMeasurementDetailsStore(
      useShallow((state) => ({
        areas: state.areas,
        contactInfo: state.contactInfo,
        notes: state.notes,
        id: state.measurementID,
        name: state.name,
        total: state.total,
        imperial: state.imperial,
      })),
    );

  const handleSubmit = () => {
    const validSubmit = validatedSubmit();
    if (!validSubmit) {
      return;
    }
    if (measurement) {
      updateMeasurement(validSubmit, id);
    } else {
      addMeasurement({
        ...validSubmit,
        name: validSubmit.contactInfo.name,
        imperial: units === IMPERIAL,
      });
    }
    Toast.show(SuccessToast);
    router.back();
    return;
  };

  const validatedSubmit = (): MeasurementDBType | null => {
    const valid = contactInfo && notes && areas && areas.length > 0;
    if (!valid) {
      Toast.show(
        FailedToast(
          "Missing Required Info, i.e. contact info, measurements, and product info",
        ),
      );
      return null;
    }
    return { contactInfo, areas, notes, name, total, imperial };
  };

  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={confirmationModalVisible}
        title="Unsaved changes"
        message="Any unsaved changes will be discarded, are you sure?"
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
          callbackFunction={handleSubmit}
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
