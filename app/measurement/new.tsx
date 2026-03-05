import { ContactInfo } from "@/components/measurement-details.tsx/contact-info";
import { MeasurementCard } from "@/components/measurement-details.tsx/measurement-card";
import { PatinaPage } from "@/components/patina-page";
import { StyleSheet, View } from "react-native";

export default function MeasurementDetails() {
  return (
    <PatinaPage>
      <View style={styles.container}>
        <ContactInfo />
        <MeasurementCard />
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
});
