import { ActionButton } from "@/components/action-button";
import { DropdownMenu } from "@/components/dropdown-menu";
import { PatinaPage } from "@/components/patina-page";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { StyleSheet, Text, View } from "react-native";

export default function Settings() {
  const menuItems = ["Imperial (sqft/in)", "Metric (m/cm)"];

  return (
    <PatinaPage>
      <View style={styles.pageContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Personal Preferences</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Unit of Measurement</Text>
            <DropdownMenu title="Select unit" dropdownItems={menuItems} />
          </View>

          <View style={styles.buttonRow}>
            <ActionButton iconName="checkmark-circle" title="Save" />
          </View>
        </View>
      </View>
    </PatinaPage>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.foreground,
    borderRadius: 4,
    height: "30%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginTop: 24,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row-reverse",
  },
});
