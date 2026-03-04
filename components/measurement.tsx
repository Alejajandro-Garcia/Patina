import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Measurements } from "@/types/measurements";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Measurement = (measurement: Measurements) => {
  return (
    <TouchableOpacity style={styles.container}>
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
          {measurement.totalSQFT} sqft
        </Text>
        <Text style={{ fontFamily: fonts.semiBold, fontSize: 16 }}>
          {measurement.date}
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
};

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
