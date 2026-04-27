import { ActionButton } from "@/components/action-button";
import { LabeledInput } from "@/components/labeled-input";
import { PatinaPage } from "@/components/patina-page";
import useMeasurementDetailsStore from "@/stores/use-measurement-details-store";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { AreaType } from "@/types/measurementInfo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useShallow } from "zustand/react/shallow";

export default function MeasurementsForm() {
  const router = useRouter();
  const [hasSteps, setHasSteps] = useState(false);
  const { areas, setAreas } = useMeasurementDetailsStore(
    useShallow((state) => ({
      areas: state.areas,
      setAreas: state.setAreas,
    })),
  );
  const methods = useForm<AreaType>();
  const [draftAreas, setDraftAreas] = useState<AreaType[]>([]);

  return (
    <FormProvider {...methods}>
      <PatinaPage>
        <View style={styles.content}>
          <Pressable style={{ gap: 8 }} onPress={() => Keyboard.dismiss()}>
            <LabeledInput label="Area Name" placeholder="Living Room" />
            <View style={{ flexDirection: "row", gap: 8 }}>
              <View style={{ flex: 1, gap: 8 }}>
                <LabeledInput label="Length" placeholder="12" number />
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text style={{ fontFamily: fonts.semiBold }}>Stairs</Text>
                    <Switch
                      trackColor={{ false: "#767577", true: colors.input }}
                      thumbColor={colors.foreground}
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingTop: 12,
              }}
            >
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
            data={draftAreas}
            style={{ backgroundColor: colors.input, height: "30%" }}
            contentContainerStyle={{ flexGrow: 1 }}
            onScroll={() => Keyboard.dismiss()}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontFamily: fonts.semiBold, fontStyle: "italic" }}
                >
                  No measurements added.
                </Text>
              </View>
            }
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
                  style={{
                    fontFamily: fonts.semiBold,
                    fontSize: 16,
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ fontFamily: fonts.semiBold, fontSize: 16 }}>
                  {`${item.length} x ${item.width}${item.steps ? ` x ${item.steps}` : ""} ft`}
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
              title="Done"
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
    </FormProvider>
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
