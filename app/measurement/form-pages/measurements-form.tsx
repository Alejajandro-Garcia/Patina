import { ActionButton } from "@/components/action-button";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { FormLabeledInput } from "@/components/form-labeled-input";
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
  TouchableOpacity,
  View,
} from "react-native";
import { useShallow } from "zustand/react/shallow";

const defaultValues: AreaType = {
  name: "",
  length: 0,
  width: 0,
};

const stripEmpty = (data: AreaType, hasSteps: boolean): AreaType => {
  const { name, length, width, steps } = data;
  return hasSteps && steps
    ? { name, length, width, steps }
    : { name, length, width };
};

export default function MeasurementsForm() {
  const router = useRouter();
  const [hasSteps, setHasSteps] = useState(false);
  const { areas, setAreas } = useMeasurementDetailsStore(
    useShallow((state) => ({
      areas: state.areas,
      setAreas: state.setAreas,
    })),
  );
  const methods = useForm<AreaType>({ defaultValues });
  const { handleSubmit, reset } = methods;
  const [draftAreas, setDraftAreas] = useState<AreaType[]>(areas);
  const [deleteIndex, setDeleteIndex] = useState<number>();
  const [editingIndex, setEditingIndex] = useState<number>();
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <FormProvider {...methods}>
      <PatinaPage>
        <ConfirmationModal
          visible={visibleModal}
          title="Delete area?"
          message="Are you sure you want to delete this area?"
          onClose={() => setVisibleModal(false)}
          onConfirm={() => {
            setDraftAreas(
              draftAreas.filter((_, index) => index !== deleteIndex),
            );
            setVisibleModal(false);
          }}
        />
        <View style={styles.content}>
          <Pressable style={{ gap: 8 }} onPress={() => Keyboard.dismiss()}>
            <FormLabeledInput
              label="Area Name"
              placeholder="Living Room"
              name="name"
            />
            <View style={{ flexDirection: "row", gap: 8 }}>
              <View style={{ flex: 1, gap: 8 }}>
                <FormLabeledInput
                  label="Length"
                  placeholder="12"
                  number
                  name="length"
                />
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
                <FormLabeledInput
                  label="Width"
                  placeholder="10"
                  number
                  name="width"
                />
                <View style={{ opacity: hasSteps ? 1 : 0 }}>
                  <FormLabeledInput
                    label="Steps"
                    placeholder="0"
                    number
                    name="steps"
                  />
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
                callbackFunction={() => {
                  reset(defaultValues);
                  setHasSteps(false);
                  setEditingIndex(undefined);
                  Keyboard.dismiss();
                }}
              />
              <ActionButton
                title={editingIndex !== undefined ? "Save" : "Add"}
                iconName="add-circle"
                callbackFunction={handleSubmit((data) => {
                  const entry = stripEmpty(data, hasSteps);
                  setDraftAreas((prev) =>
                    editingIndex !== undefined
                      ? prev.map((a, i) => (i === editingIndex ? entry : a))
                      : [...prev, entry],
                  );
                  reset(defaultValues);
                  setHasSteps(false);
                  setEditingIndex(undefined);
                  Keyboard.dismiss();
                })}
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
            renderItem={({ item, index }) => {
              const stripeColor =
                index % 2 === 0 ? colors.foreground : colors.input;
              const backgroundColor =
                index === editingIndex ? "white" : stripeColor;
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    alignItems: "center",
                    backgroundColor,
                  }}
                >
                <Text
                  style={{
                    fontFamily: fonts.semiBold,
                    fontSize: 16,
                    width: 150,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.semiBold,
                    fontSize: 16,
                    flex: 1,
                  }}
                >
                  {`${item.length} x ${item.width}${item.steps ? ` x ${item.steps}` : ""} ft`}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      reset(item);
                      setHasSteps(!!item.steps);
                      setEditingIndex(index);
                    }}
                  >
                    <Ionicons name="pencil" size={20} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setVisibleModal(true);
                      setDeleteIndex(index);
                    }}
                  >
                    <Ionicons name="trash" size={20} />
                  </TouchableOpacity>
                </View>
                </View>
              );
            }}
          />
          <View style={styles.actions}>
            <ActionButton
              title="Done"
              iconName="checkmark-done-circle"
              callbackFunction={() => {
                setAreas(draftAreas);
                router.back();
              }}
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
