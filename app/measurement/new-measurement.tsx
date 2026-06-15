import { ConfirmationModal } from "@/components/confirmation-modal";
import { MeasurementDetails } from "@/components/measurement-details/measurement-details";
import { PatinaPage } from "@/components/patina-page";
import useMeasurementDetailsStore from "@/stores/use-measurement-details-store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function NewMeasurement() {
  const router = useRouter();
  const { reset, dirty } = useMeasurementDetailsStore(
    useShallow((state) => ({ reset: state.reset, dirty: state.dirty })),
  );
  const [unsavedVisible, setUnsavedVisible] = useState(false);

  const onGoBack = () => {
    if (dirty) {
      setUnsavedVisible(true);
      return;
    }
    reset();
    router.back();
    return;
  };

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
      <PatinaPage goBackCallBack={onGoBack}>
        <MeasurementDetails measurement={null} />
      </PatinaPage>
    </>
  );
}
