import useSettingsStore from "@/stores/use-settings-store";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { measurementUnit } from "@/types/units";
import MeasurementModel from "@/watermelonDB/model/measurement";
import { Ionicons } from "@expo/vector-icons";
import { withObservables } from "@nozbe/watermelondb/react";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Measurement({ measurement }: { measurement: MeasurementModel }) {
  const router = useRouter();
  const { units } = useSettingsStore();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/measurement/${measurement.id}`)}
    >
      <View
        style={{
          flex: 2,
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.semiBold,
            fontSize: 24,
          }}
          numberOfLines={1}
        >
          {measurement.name}
        </Text>
        <Text style={{ fontFamily: fonts.semiBold, fontSize: 16 }}>
          {measurement.total} {measurementUnit[units]}
        </Text>
        <Text style={{ fontFamily: fonts.semiBold, fontSize: 16 }}>
          {measurement.date.toLocaleDateString()}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Ionicons name="arrow-forward-circle" size={40} />
        <TouchableOpacity>
          <Ionicons name="trash" size={40} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const enhance = withObservables(["measurement"], ({ measurement }) => ({
  measurement,
}));

export default enhance(Measurement);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: colors.foreground,
    height: 125,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 4,
    shadowColor: "#00000038",
    shadowOpacity: 100,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 5 },
  },
});
