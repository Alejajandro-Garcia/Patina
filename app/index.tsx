import { ActionButton } from "@/components/action-button";
import { Measurement } from "@/components/measurement";
import { PatinaPage } from "@/components/patina-page";
import { SearchBar } from "@/components/searchbar";
import { DUMMY_MEASUREMENTS } from "@/test/mock-measurements";
import { MeasurementsLandingType } from "@/types/measurements";
import { useRouter } from "expo-router";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import { FlatList, Keyboard, Pressable, StyleSheet, View } from "react-native";

const fuseOptions = {
  keys: ["name"],
  threshold: 0.4,
  ignoreLocation: true,
};

export default function Index() {
  const navigation = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [measurements] =
    useState<MeasurementsLandingType[]>(DUMMY_MEASUREMENTS);

  const fuse = useMemo(
    () => new Fuse(measurements, fuseOptions),
    [measurements],
  );

  const data = useMemo(() => {
    if (!searchQuery) return measurements;
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, fuse, measurements]);

  return (
    <PatinaPage>
      <View style={styles.container}>
        <SearchBar handleSearch={setSearchQuery} />

        <Pressable style={styles.actionsRow} onPress={() => Keyboard.dismiss()}>
          <ActionButton
            title="Add"
            iconName="add-circle"
            callbackFunction={() => navigation.push("/measurement/new-measurement")}
          />
        </Pressable>

        <FlatList
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          onScroll={() => Keyboard.dismiss()}
          data={data}
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
