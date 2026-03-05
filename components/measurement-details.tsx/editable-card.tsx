import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
interface EditableCardProps {
  children: React.ReactNode;
}
export const EditableCard = ({ children }: EditableCardProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.5 : 1 }]}
    >
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>Contact Info</Text>
        <Ionicons name="pencil" size={24} />
      </View>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.foreground,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
  },
});
