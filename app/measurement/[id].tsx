import fetchMeasurement from "@/api/db/fetch";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { MeasurementDetails } from "@/components/measurement-details/measurement-details";
import { PatinaPage } from "@/components/patina-page";
import FailedToast from "@/components/toast-configs/failed-toast";
import useMeasurementDetailsStore from "@/stores/use-measurement-details-store";
import { MeasurementInfoType } from "@/types/measurement-info";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Toast } from "toastify-react-native";
import { useShallow } from "zustand/react/shallow";

export default function EditMeasurement() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { reset, hydrate, dirty } = useMeasurementDetailsStore(
    useShallow((state) => ({
      reset: state.reset,
      hydrate: state.hydrate,
      dirty: state.dirty,
    })),
  );
  const [loading, setLoading] = useState(true);
  const [unsavedVisible, setUnsavedVisible] = useState(false);
  const [measurement, setMeasurement] = useState<MeasurementInfoType | null>(
    null,
  );

  // TODO: CHANGE THE LOGIC OF MEASUREMENT DETAILS TO BE BASED ON ID NOT THE ENTIRE MEASUREMENT ITSELF
  useEffect(() => {
    const queryMeasurement = async () => {
      try {
        const fetchedMeasurement = await fetchMeasurement(id);
        hydrate(fetchedMeasurement);
        setMeasurement(fetchedMeasurement);
      } catch {
        Toast.show(FailedToast("Measurement not found"));
        router.back();
      } finally {
        setLoading(false);
      }
    };
    queryMeasurement();
  }, [id]);

  const onGoBack = () => {
    if (dirty) {
      setUnsavedVisible(true);
      return;
    }
    reset();
    router.back();
    return;
  };

  if (loading && !measurement) {
    return (
      <PatinaPage>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      </PatinaPage>
    );
  }

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
        <MeasurementDetails measurement={measurement} />
      </PatinaPage>
    </>
  );
}
