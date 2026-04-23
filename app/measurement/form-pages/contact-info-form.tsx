import { ActionButton } from "@/components/action-button";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { FormLabeledInput } from "@/components/form-labeled-input";
import { PatinaPage } from "@/components/patina-page";
import useMeasurementDetailsStore from "@/stores/use-measurement-details-store";
import { ContactInfoType } from "@/types/measurementInfo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useShallow } from "zustand/react/shallow";

const stripEmpty = (data: ContactInfoType): ContactInfoType => {
  const { name, address, date, ...optional } = data;
  const filteredOptional = Object.fromEntries(
    Object.entries(optional).filter(([, v]) => v),
  );
  return {
    name,
    address,
    date,
    ...filteredOptional,
  };
};

const returnDefaultValues = (
  contactInfo: ContactInfoType | null,
): ContactInfoType => {
  if (contactInfo) return contactInfo;
  return { name: "", address: "", date: "" };
};

export default function ContactInfoForm() {
  const router = useRouter();
  const { contactInfo, setContactInfo } = useMeasurementDetailsStore(
    useShallow((state) => ({
      contactInfo: state.contactInfo,
      setContactInfo: state.setContactInfo,
    })),
  );
  const methods = useForm<ContactInfoType>({
    defaultValues: returnDefaultValues(contactInfo),
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
          bottomOffset={100}
        >
          <FormLabeledInput
            name="name"
            label="Full Name"
            placeholder="John Doe"
            required
          />
          <FormLabeledInput
            name="address"
            label="Address"
            placeholder="123 Main Street"
            required
          />
          <FormLabeledInput
            name="email"
            label="Email"
            placeholder="john.doe@example.com"
          />
          <FormLabeledInput
            name="phone"
            label="Phone"
            placeholder="(123) 456-7890"
          />
          <FormLabeledInput
            name="date"
            label="Date (mm/dd/yyyy)"
            placeholder="MM/DD/YYYY"
            required
          />
          <View style={styles.actions}>
            <ActionButton
              title="Done"
              iconName="add-circle"
              callbackFunction={handleSubmit((data) => {
                setContactInfo(stripEmpty(data));
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
