import { ActionButton } from "@/components/action-button";
import { DropdownMenu } from "@/components/dropdown-menu";
import { LabeledInput } from "@/components/labeled-input";
import { PatinaPage } from "@/components/patina-page";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { useRouter } from "expo-router";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";

export default function Settings() {
  const menuItems = ["Imperial (sqft/in)", "Metric (m/cm)"];
  const router = useRouter();

  return (
    <PatinaPage>
      <View style={styles.pageContainer}>
        <Pressable
          style={[styles.card, { justifyContent: "space-between" }]}
          onPress={() => Keyboard.dismiss()}
        >
          <Text style={styles.title}>Personal preferences</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Unit of measurement</Text>
            <DropdownMenu title="Select unit" dropdownItems={menuItems} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Extra percentage</Text>
            <View style={{ width: 150 }}>
              <LabeledInput placeholder="10%" number />
            </View>
          </View>

          <View style={styles.buttonRow}>
            <ActionButton iconName="checkmark-circle" title="Save" />
          </View>
        </Pressable>
        <View style={styles.card}>
          <Text style={styles.title}>Account and sync</Text>
          <View
            style={{
              gap: 8,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.label}>Sync with cloud</Text>
            <ActionButton
              title="Sign In"
              iconName="log-in"
              callbackFunction={() => router.push("/signin")}
            />
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
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row-reverse",
  },
});
