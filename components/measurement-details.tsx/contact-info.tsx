import { fonts } from "@/theme/fonts";
import { ContactInfoType } from "@/types/measurementInfo";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { EditableCard } from "./editable-card";

export const ContactInfo = ({}) => {
  const router = useRouter();
  const contactInfo: ContactInfoType = {
    name: "John Doe",
    address: "123 Main St, Anytown, USA",
    email: "josealegar19@gmail.com",
    phone: "619-555-1234",
    date: "2023-10-01",
  } as const;
  return (
    <EditableCard
      title={"Contact Info"}
      onPress={() => router.push("/measurement/new/contact-info-form")}
    >
      {Object.keys(contactInfo).length === 0 ? (
        <Text style={{ fontFamily: fonts.regular, fontStyle: "italic" }}>
          No contact information provided. Tap to add.
        </Text>
      ) : (
        <View>
          <Text style={{ fontFamily: fonts.regular }}>
            <Text style={{ fontFamily: fonts.bold }}>Name: </Text>
            {contactInfo.name}
          </Text>
          <Text style={{ fontFamily: fonts.regular }}>
            <Text style={{ fontFamily: fonts.bold }}>Address: </Text>
            {contactInfo.address}
          </Text>
          <Text style={{ fontFamily: fonts.regular }}>
            <Text style={{ fontFamily: fonts.bold }}>Email: </Text>
            {contactInfo.email}
          </Text>
          <Text style={{ fontFamily: fonts.regular }}>
            <Text style={{ fontFamily: fonts.bold }}>Phone: </Text>
            {contactInfo.phone}
          </Text>
          <Text style={{ fontFamily: fonts.regular }}>
            <Text style={{ fontFamily: fonts.bold }}>Date: </Text>
            {contactInfo.date}
          </Text>
        </View>
      )}
    </EditableCard>
  );
};
