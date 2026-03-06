import { fonts } from "@/theme/fonts";
import { StyleSheet, Text, View } from "react-native";
import { EditableCard } from "./editable-card";

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
      <View style={styles.details}>
        <Text style={styles.detail}>Name: {contactInfo.name}</Text>
        <Text style={styles.detail}>Address: {contactInfo.address}</Text>
        <Text style={styles.detail}>Email: {contactInfo.email}</Text>
        <Text style={styles.detail}>Phone: {contactInfo.phone}</Text>
        <Text style={styles.detail}>Date: {contactInfo.date}</Text>
      </View>
    </EditableCard>
  );
};

const styles = StyleSheet.create({
  details: {
    gap: 4,
  },
  detail: {
    fontFamily: fonts.regular,
    fontSize: 14,
  },
});
