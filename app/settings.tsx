import { ActionButton } from "@/components/action-button";
import { DropdownMenu } from "@/components/dropdown-menu";
import { PatinaPage } from "@/components/patina-page";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Text, View } from "react-native";

export default function Settings() {
  const menuItems = ["Imperial (sqft/in)", "Metric (m/cm)"];
  return (
    <PatinaPage>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View
          style={{
            backgroundColor: colors.foreground,
            borderRadius: 4,
            height: "30%",
            paddingVertical: 12,
            paddingHorizontal: 10,
            marginTop: 24,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: fonts.bold, fontSize: 24 }}>
            Personal Preferences
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontFamily: fonts.bold, fontSize: 16 }}>
              Unit of Measurement
            </Text>
            <DropdownMenu title="Select unit" dropdownItems={menuItems} />
          </View>
          <View style={{ flexDirection: "row-reverse" }}>
            <ActionButton iconName="checkmark-circle" title="Save" />
          </View>
        </View>
      </View>
    </PatinaPage>
  );
}
