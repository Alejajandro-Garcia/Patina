import { ConfirmationModal } from "@/components/confirmation-modal";
import { MeasurementDetails } from "@/components/measurement-details/measurement-details";
import { PatinaPage } from "@/components/patina-page";
import useMeasurementDetailsStore from "@/stores/use-measurement-details-store";
import { MeasurementInfoType } from "@/types/measurement-info";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function EditMeasurement() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const reset = useMeasurementDetailsStore((state) => state.reset);
  const [measurement, setMeasurement] = useState<MeasurementInfoType | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [unsavedVisible, setUnsavedVisible] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchMeasurement = async () => {
      try {
        // const response = await fetch(`/api/measurements/${id}`);
        // const data = await response.json();
        // setMeasurement(data);
      } finally {
        setLoading(false);
      }
    };

    fetchMeasurement();
  }, [id]);

  if (loading) {
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
      <PatinaPage goBackCallBack={() => setUnsavedVisible(true)}>
        <MeasurementDetails measurement={measurement} />
      </PatinaPage>
    </>
  );
}
