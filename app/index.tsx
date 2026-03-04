import { ActionButton } from "@/components/action-button";
import { Measurement } from "@/components/measurement";
import { PatinaPage } from "@/components/patina-page";
import { SearchBar } from "@/components/searchbar";
import { DUMMY_MEASUREMENTS } from "@/test/mock-measurements";
import { Measurements } from "@/types/measurements";
import { ScrollView, View } from "react-native";

export default function Index() {
  return (
    <PatinaPage>
      <View style={{ paddingHorizontal: 24, flex: 1 }}>
        <SearchBar />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 12,
          }}
        >
          <ActionButton title="Select" iconName="scan" />
          <ActionButton title="Add" iconName="add-circle" />
        </View>
        <ScrollView
          style={{ marginTop: 12, flex: 1 }}
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
