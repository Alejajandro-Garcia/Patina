import { fonts } from "@/theme/fonts";
import { Text, View } from "react-native";
import { EditableCard } from "./editable-card";
import { ModalContainer } from "./modals/modal-container";

export const ContactInfo = ({}) => {
  const contactInfo = {
    name: "Jose Alejandro Garcia Figueroa",
    address: "1234 Main Street, Springfield, IL 62704",
    email: "josealegar19@gmail.com",
    phone: "(619) 490-8254",
    date: "12/12/2026",
  } as const;
  return (
    <EditableCard title={"Contact Info"}>
      <ModalContainer>
        <Text>HELLO</Text>
      </ModalContainer>
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
