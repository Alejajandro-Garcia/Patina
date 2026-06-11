import { ActionButton } from "@/components/action-button";
import { DropdownMenu } from "@/components/dropdown-menu";
import { LabeledInput } from "@/components/labeled-input";
import { PatinaPage } from "@/components/patina-page";
import FailedToast from "@/components/toast-configs/failed-toast";
import SuccessToast from "@/components/toast-configs/success-toast";
import useSettingsStore from "@/stores/use-settings-store";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { IMPERIAL, METRIC } from "@/types/units";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import { Toast } from "toastify-react-native";
import { useShallow } from "zustand/react/shallow";

export default function Settings() {
  const menuItems = [IMPERIAL, METRIC] as const;
  const router = useRouter();
  const { units, setUnits, percentage, setPercentage } = useSettingsStore(
    useShallow((state) => ({
      units: state.units,
      setUnits: state.setUnits,
      percentage: state.percentage,
      setPercentage: state.setPercentage,
    })),
  );
  const [unitSelected, setUnitSelected] = useState(units || "");
  const [percentageSelected, setPercentageSelected] = useState(
    String(percentage) === "0" ? "" : String(percentage),
  );

  const onSaveHandler = () => {
    Keyboard.dismiss();
    setUnits(unitSelected);
    const parsedPercentage = Number(percentageSelected);
    if (
      (isNaN(parsedPercentage) || parsedPercentage <= 0) &&
      percentageSelected !== ""
    ) {
      Toast.show(FailedToast("Invalid percentage or zero"));
      return;
    }
    Toast.show(SuccessToast);
    setPercentage(parsedPercentage);
  };

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
            <DropdownMenu
              title="Select unit"
              dropdownItems={menuItems}
              selected={unitSelected}
              setSelected={setUnitSelected}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Extra percentage</Text>
            <View style={{ width: 150 }}>
              <LabeledInput
                placeholder="10%"
                number
                value={percentageSelected}
                setValue={setPercentageSelected}
              />
            </View>
          </View>

          <View style={styles.buttonRow}>
            <ActionButton
              iconName="checkmark-circle"
              title="Save"
              callbackFunction={onSaveHandler}
            />
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
