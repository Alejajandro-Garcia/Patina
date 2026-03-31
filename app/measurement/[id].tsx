import { MeasurementDetails } from "@/components/measurement-details.tsx/measurement-details";
import { PatinaPage } from "@/components/patina-page";
import { MeasurementInfoType } from "@/types/measurementInfo";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function EditMeasurement() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [measurement, setMeasurement] = useState<MeasurementInfoType | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      </PatinaPage>
    );
  }

  return (
    <PatinaPage>
      <MeasurementDetails measurement={measurement} />
    </PatinaPage>
  );
}
