import { ActionButton } from "@/components/action-button";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { FormLabeledInput } from "@/components/form-labeled-input";
import { PatinaPage } from "@/components/patina-page";
import useMeasurementDetailsStore from "@/stores/use-measurement-details-store";
import { ContactInfoSchema, ContactInfoType } from "@/types/measurement-info";
import { zodResolver } from "@hookform/resolvers/zod";
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
    resolver: zodResolver(ContactInfoSchema),
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;
  const [confirmationVisible, setConfirmationVisible] = useState(false);

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
