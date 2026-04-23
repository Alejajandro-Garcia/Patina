import { ActionButton } from "@/components/action-button";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { FormLabeledInput } from "@/components/form-labeled-input";
import { PatinaPage } from "@/components/patina-page";
import useMeasurementDetailsStore from "@/stores/use-measurement-details-store";
import { NotesType } from "@/types/measurementInfo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useShallow } from "zustand/react/shallow";

const stripEmpty = (data: NotesType): NotesType => {
  const { productInfo, moldings, ...numerics } = data;
  const filteredNumerics = Object.fromEntries(
    Object.entries(numerics).filter(([, v]) => v),
  );
  const moldingEntries = Object.entries(moldings ?? {}).filter(([, v]) => v);
  const filteredMoldings = moldingEntries.length
    ? Object.fromEntries(moldingEntries)
    : undefined;
  return {
    productInfo,
    ...filteredNumerics,
    ...(filteredMoldings && { moldings: filteredMoldings }),
  };
};

const returnDefaultValues = (notes: NotesType | null): NotesType => {
  if (notes) return notes;
  return { productInfo: "" };
};

export default function NotesForm() {
  const router = useRouter();
  const { notes, setNotes } = useMeasurementDetailsStore(
    useShallow((state) => ({
      notes: state.notes,
      setNotes: state.setNotes,
    })),
  );
  const methods = useForm<NotesType>({
    defaultValues: returnDefaultValues(notes),
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  return (
    <FormProvider {...methods}>
      <ConfirmationModal
        visible={confirmationVisible}
        title="Unsaved changes"
        message="You have unsaved changes. Are you sure you want to discard?"
        onClose={() => setConfirmationVisible(false)}
        onConfirm={() => {
          setConfirmationVisible(false);
          router.back();
        }}
      />
      <PatinaPage>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FormLabeledInput
            name="productInfo"
            label="Product Info"
            placeholder="European Collection - Paris Grey 7x8x9 20 mil wear layer"
            textArea
            required
          />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1, gap: 10 }}>
              <FormLabeledInput
                name="toiletRnR"
                label="Toilet R&R"
                placeholder="0"
                number
              />
              <FormLabeledInput
                name="floorPrep"
                label="Floor Prep"
                placeholder="0"
                number
              />
              <FormLabeledInput
                name="pullUpAndDisposal"
                label="Pull Up & Disposal"
                placeholder="0"
                number
              />
              <FormLabeledInput
                name="moldings.endcaps"
                label="Endcaps"
                placeholder="0"
                number
              />
              <FormLabeledInput
                name="moldings.reducers"
                label="Reducers"
                placeholder="0"
                number
              />
            </View>
            <View style={{ flex: 1, gap: 10 }}>
              <FormLabeledInput
                name="furnitureRnR"
                label="Furniture R&R"
                placeholder="0"
                number
              />
              <FormLabeledInput
                name="appliancesRnR"
                label="Appliances R&R"
                placeholder="0"
                number
              />
              <FormLabeledInput
                name="baseboards"
                label="Baseboards"
                placeholder="0"
                number
              />
              <FormLabeledInput
                name="moldings.tMoldings"
                label="T-Moldings"
                placeholder="0"
                number
              />
            </View>
          </View>
          <View style={styles.actions}>
            <ActionButton
              title="Done"
              iconName="add-circle"
              callbackFunction={handleSubmit((data) => {
                setNotes(stripEmpty(data));
                router.back();
              })}
            />
            <ActionButton
              title="Cancel"
              iconName="close"
              callbackFunction={() => {
                if (isDirty) {
                  setConfirmationVisible(true);
                } else {
                  router.back();
                }
              }}
            />
          </View>
        </KeyboardAwareScrollView>
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
