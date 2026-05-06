import { ConfirmationModal } from "@/components/confirmation-modal";
import { MeasurementDetails } from "@/components/measurement-details/measurement-details";
import { PatinaPage } from "@/components/patina-page";
import useMeasurementDetailsStore from "@/stores/use-measurement-details-store";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function NewMeasurement() {
  const router = useRouter();
  const reset = useMeasurementDetailsStore((state) => state.reset);
  const [unsavedVisible, setUnsavedVisible] = useState(false);

  return (
    <>
      <ConfirmationModal
        visible={unsavedVisible}
        title="Discard changes?"
        message="Any unsaved changes will be discarded."
        onClose={() => setUnsavedVisible(false)}
        onConfirm={() => {
          setUnsavedVisible(false);
          reset();
          router.back();
        }}
      />
      <PatinaPage goBackCallBack={() => setUnsavedVisible(true)}>
        <MeasurementDetails measurement={null} />
      </PatinaPage>
    </>
  );
}
