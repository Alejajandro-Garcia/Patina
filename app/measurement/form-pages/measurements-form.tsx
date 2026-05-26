import { ActionButton } from "@/components/action-button";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { FormLabeledInput } from "@/components/form-labeled-input";
import { FormSwitch } from "@/components/form-switch";
import { PatinaPage } from "@/components/patina-page";
import { getAreaSqFt, roundSqFt } from "@/helpers/area-calculations";
import { formatAreaString } from "@/helpers/format-units";
import useMeasurementDetailsStore from "@/stores/use-measurement-details-store";
import useSettingsStore from "@/stores/use-settings-store";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import {
  AreaFormSchema,
  AreaFormType,
  AreaType,
} from "@/types/measurement-info";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useShallow } from "zustand/react/shallow";

const defaultValues: AreaFormType = {
  name: "",
  length: "",
  width: "",
  hasSteps: false,
  steps: "",
};

const toAreaType = (data: AreaFormType): AreaType => {
  const result: AreaType = {
    name: data.name,
    length: Number(data.length),
    width: Number(data.width),
  };
  if (data.hasSteps) {
    result.steps = Number(data.steps);
  }
  return result;
};

const toAreaForm = (area: AreaType): AreaFormType => ({
  name: area.name,
  length: String(area.length),
  width: String(area.width),
  hasSteps: area.steps !== undefined,
  steps: String(area.steps ?? ""),
});

export default function MeasurementsForm() {
  const router = useRouter();
  const { units } = useSettingsStore();
  const { areas, setAreas, setTotal } = useMeasurementDetailsStore(
    useShallow((state) => ({
      areas: state.areas,
      setAreas: state.setAreas,
      setTotal: state.setTotal,
    })),
  );
  const methods = useForm<AreaFormType>({
    resolver: zodResolver(AreaFormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty },
  } = methods;
  const hasSteps = useWatch({ control, name: "hasSteps" });
  const [draftAreas, setDraftAreas] = useState<AreaType[]>(areas);
  const [deleteIndex, setDeleteIndex] = useState<number>();
  const [editingIndex, setEditingIndex] = useState<number>();
  const [visibleModal, setVisibleModal] = useState(false);
  const [unsavedVisible, setUnsavedVisible] = useState(false);

  const onSubmit = (data: AreaFormType) => {
    const entry = toAreaType(data);
    setDraftAreas((prev) =>
      editingIndex !== undefined
        ? prev.map((a, i) => (i === editingIndex ? entry : a))
        : [...prev, entry],
    );
    reset(defaultValues);
    setEditingIndex(undefined);
    Keyboard.dismiss();
  };

  const onGoBack = () => {
    if (isDirty || JSON.stringify(draftAreas) !== JSON.stringify(areas)) {
      setUnsavedVisible(true);
    } else {
      router.back();
    }
  };

  const onReset = () => {
    reset(defaultValues);
    setEditingIndex(undefined);
    Keyboard.dismiss();
  };

  const onDone = () => {
    setAreas(draftAreas);
    setTotal(
      roundSqFt(draftAreas.reduce((sum, a) => sum + getAreaSqFt(a), 0)),
    );
    router.back();
  };

  return (
    <FormProvider {...methods}>
      <PatinaPage goBackCallBack={onGoBack}>
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
        <ConfirmationModal
          visible={unsavedVisible}
          title="Unsaved changes"
          message="You have unsaved changes. Are you sure you want to discard?"
          onClose={() => setUnsavedVisible(false)}
          onConfirm={() => {
            setUnsavedVisible(false);
            router.back();
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
                    <FormSwitch name="hasSteps" />
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
                callbackFunction={onReset}
              />
              <ActionButton
                title={editingIndex !== undefined ? "Save" : "Add"}
                iconName="add-circle"
                callbackFunction={handleSubmit(onSubmit)}
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
                    {formatAreaString(item, units)}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        reset(toAreaForm(item));
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
              callbackFunction={onDone}
            />
            <ActionButton
              title="Cancel"
              iconName="close"
              callbackFunction={onGoBack}
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
