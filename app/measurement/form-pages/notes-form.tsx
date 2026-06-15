import { ActionButton } from "@/components/action-button";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { FormLabeledInput } from "@/components/form-labeled-input";
import { PatinaPage } from "@/components/patina-page";
import useMeasurementDetailsStore from "@/stores/use-measurement-details-store";
import {
  NotesFormSchema,
  NotesFormType,
  NotesType,
} from "@/types/measurement-info";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useShallow } from "zustand/react/shallow";

const defaultFormValues: NotesFormType = {
  productInfo: "",
  toiletRnR: "",
  furnitureRnR: "",
  floorPrep: "",
  appliancesRnR: "",
  pullUpAndDisposal: "",
  baseboards: "",
  moldings: { endcaps: "", tMoldings: "", reducers: "" },
};

const toNotesType = (data: NotesFormType): NotesType => {
  const { productInfo, moldings, ...numerics } = data;
  const filteredNumerics = Object.fromEntries(
    Object.entries(numerics)
      .filter(([, v]) => v)
      .map(([k, v]) => [k, Number(v)]),
  );
  const moldingEntries = Object.entries(moldings)
    .filter(([, v]) => v)
    .map(([k, v]) => [k, Number(v)]);
  const filteredMoldings = moldingEntries.length
    ? Object.fromEntries(moldingEntries)
    : undefined;
  return {
    productInfo,
    ...filteredNumerics,
    ...(filteredMoldings && { moldings: filteredMoldings }),
  };
};

const toNotesForm = (notes: NotesType | null): NotesFormType => {
  if (!notes) return defaultFormValues;
  return {
    productInfo: notes.productInfo,
    toiletRnR: String(notes.toiletRnR ?? ""),
    furnitureRnR: String(notes.furnitureRnR ?? ""),
    floorPrep: String(notes.floorPrep ?? ""),
    appliancesRnR: String(notes.appliancesRnR ?? ""),
    pullUpAndDisposal: String(notes.pullUpAndDisposal ?? ""),
    baseboards: String(notes.baseboards ?? ""),
    moldings: {
      endcaps: String(notes.moldings?.endcaps ?? ""),
      tMoldings: String(notes.moldings?.tMoldings ?? ""),
      reducers: String(notes.moldings?.reducers ?? ""),
    },
  };
};

export default function NotesForm() {
  const router = useRouter();
  const { notes, setNotes, setDirty } = useMeasurementDetailsStore(
    useShallow((state) => ({
      notes: state.notes,
      setNotes: state.setNotes,
      setDirty: state.setDirty,
    })),
  );
  const methods = useForm<NotesFormType>({
    resolver: zodResolver(NotesFormSchema),
    defaultValues: toNotesForm(notes),
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const onSubmit = (data: NotesFormType) => {
    setNotes(toNotesType(data));
    if (isDirty) setDirty(true);
    router.back();
  };

  const onGoBack = () => {
    if (isDirty) setConfirmationVisible(true);
    else router.back();
  };

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
      <PatinaPage goBackCallBack={onGoBack}>
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
              callbackFunction={handleSubmit(onSubmit)}
            />
            <ActionButton
              title="Cancel"
              iconName="close"
              callbackFunction={onGoBack}
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
