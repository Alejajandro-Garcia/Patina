import { ActionButton } from "@/components/action-button";
import { LabeledInput } from "@/components/labeled-input";
import { PatinaPage } from "@/components/patina-page";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export default function MeasurementsForm() {
  const router = useRouter();
  const [hasSteps, setHasSteps] = useState(false);

  return (
    <PatinaPage>
      <View style={styles.content}>
        <Pressable onPress={() => Keyboard.dismiss()}>
          <LabeledInput label="Area Name" placeholder="Living Room" />
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={{ flex: 1, gap: 8 }}>
              <LabeledInput label="Length" placeholder="12" number />
              <View style={{ flex: 1, justifyContent: "center" }}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Text style={{ fontFamily: fonts.semiBold }}>Stairs</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    value={hasSteps}
                    onValueChange={setHasSteps}
                  />
                </View>
              </View>
            </View>
            <View style={{ flex: 1, gap: 8 }}>
              <LabeledInput label="Width" placeholder="10" number />
              <View style={{ opacity: hasSteps ? 1 : 0 }}>
                <LabeledInput label="Steps" placeholder="0" number />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <ActionButton
              title="Reset"
              iconName="play-back"
              callbackFunction={() => Keyboard.dismiss()}
            />
            <ActionButton
              title="Add"
              iconName="add-circle"
              callbackFunction={() => Keyboard.dismiss()}
            />
          </View>
        </Pressable>
        <Text style={{ fontFamily: fonts.bold, fontSize: 16 }}>
          Added Measurements:
        </Text>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          style={{ backgroundColor: colors.input, height: "30%" }}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 12,
                paddingVertical: 8,
                alignItems: "center",
                backgroundColor:
                  index % 2 === 0 ? colors.foreground : colors.input,
              }}
            >
              <Text
                key={index}
                style={{
                  fontFamily: fonts.semiBold,
                  fontSize: 16,
                }}
              >
                Item {index}
              </Text>
              <Text style={{ fontFamily: fonts.semiBold, fontSize: 16 }}>
                10 x 10 x 12 ft
              </Text>
              <View style={{ flexDirection: "row", gap: 20 }}>
                <Ionicons name="pencil" size={20} />
                <Ionicons name="trash" size={20} />
              </View>
            </View>
          )}
        />
        <View style={styles.actions}>
          <ActionButton
            title="Save"
            iconName="checkmark-done-circle"
            callbackFunction={() => router.back()}
          />
          <ActionButton
            title="Cancel"
            iconName="close"
            callbackFunction={() => router.back()}
          />
        </View>
      </View>
    </PatinaPage>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  actions: {
    flexDirection: "row-reverse",
    paddingTop: 10,
  },
});
