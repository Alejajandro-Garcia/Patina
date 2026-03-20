import { ActionButton } from "@/components/action-button";
import { Measurement } from "@/components/measurement";
import { PatinaPage } from "@/components/patina-page";
import { SearchBar } from "@/components/searchbar";
import { DUMMY_MEASUREMENTS } from "@/test/mock-measurements";
import { MeasurementsLandingType } from "@/types/measurements";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

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

        <FlatList
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          data={DUMMY_MEASUREMENTS}
          keyExtractor={(item) => item.measurementID}
          renderItem={({ item }: { item: MeasurementsLandingType }) => (
            <Measurement
              measurementID={item.measurementID}
              name={item.name}
              date={item.date}
              totalSQFT={item.totalSQFT}
            />
          )}
        />
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
