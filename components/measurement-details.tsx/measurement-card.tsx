import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { StyleSheet, Text, View } from "react-native";
import { ActionButton } from "../action-button";

export const MeasurementCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Areas and Measurement </Text>
      <View style={styles.footer}>
        <Text style={styles.total}>Total: 100 sq ft</Text>
        <ActionButton title="Edit" iconName="pencil" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.foreground,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 5 },
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  total: {
    fontFamily: fonts.bold,
    fontSize: 20,
  },
});
