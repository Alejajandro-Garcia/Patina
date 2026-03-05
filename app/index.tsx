import { ActionButton } from "@/components/action-button";
import { Measurement } from "@/components/measurement";
import { PatinaPage } from "@/components/patina-page";
import { SearchBar } from "@/components/searchbar";
import { DUMMY_MEASUREMENTS } from "@/test/mock-measurements";
import { Measurements } from "@/types/measurements";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const navigation = useRouter();

  return (
    <PatinaPage>
      <View style={styles.container}>
        <SearchBar />

        <View style={styles.actionsRow}>
          <ActionButton title="Select" iconName="scan" />
          <ActionButton
            title="Add"
            iconName="add-circle"
            callbackFunction={() => navigation.push("/measurement/new")}
          />
        </View>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {DUMMY_MEASUREMENTS.map((value: Measurements) => {
            return (
              <Measurement
                measurementID={value.measurementID}
                name={value.name}
                date={value.date}
                totalSQFT={value.totalSQFT}
                key={value.measurementID}
              />
            );
          })}
        </ScrollView>
      </View>
    </PatinaPage>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  scrollContainer: {
    marginTop: 12,
    flex: 1,
  },
});
