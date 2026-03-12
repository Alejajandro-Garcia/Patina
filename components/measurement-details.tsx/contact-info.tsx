import { fonts } from "@/theme/fonts";
import { useState } from "react";
import { Text, View } from "react-native";
import { LabeledInput } from "../labeled-input";
import { EditableCard } from "./editable-card";
import { ModalContainer } from "./modals/modal-container";

export const ContactInfo = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const contactInfo = {
    name: "Jose Alejandro Garcia Figueroa",
    address: "1234 Main Street, Springfield, IL 62704",
    email: "josealegar19@gmail.com",
    phone: "(619) 490-8254",
    date: "12/12/2026",
  } as const;
  return (
    <EditableCard
      title={"Contact Info"}
      onPress={() => setModalVisible(true)}
      modal={
        <ModalContainer
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Enter Contact Info"
        >
          <LabeledInput label="Full Name" placeholder="John Doe" />
          <LabeledInput label="Address" placeholder="123 Main Street" />
          <LabeledInput label="Email" placeholder="john.doe@example.com" />
          <LabeledInput label="Phone" placeholder="(123) 456-7890" />
          <LabeledInput label="Date" placeholder="MM/DD/YYYY" />
        </ModalContainer>
      }
    >
      <View>
        <Text style={{ fontFamily: fonts.regular }}>
          <Text style={{ fontFamily: fonts.bold }}>Name:</Text>
          {contactInfo.name}
        </Text>
        <Text style={{ fontFamily: fonts.regular }}>
          <Text style={{ fontFamily: fonts.bold }}>Address:</Text>
          {contactInfo.address}
        </Text>
        <Text style={{ fontFamily: fonts.regular }}>
          <Text style={{ fontFamily: fonts.bold }}>Email:</Text>
          {contactInfo.email}
        </Text>
        <Text style={{ fontFamily: fonts.regular }}>
          <Text style={{ fontFamily: fonts.bold }}>Phone:</Text>
          {contactInfo.phone}
        </Text>
        <Text style={{ fontFamily: fonts.regular }}>
          <Text style={{ fontFamily: fonts.bold }}>Date:</Text>
          {contactInfo.date}
        </Text>
      </View>
    </EditableCard>
  );
};
