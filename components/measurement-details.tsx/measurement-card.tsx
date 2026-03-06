import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ActionButton } from "../action-button";

export const MeasurementCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.important}>Areas and Measurement</Text>
      <ScrollView
        contentContainerStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => (
          <View
            key={item}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: fonts.semiBold, fontSize: 16 }}>
              Area {item}
            </Text>
            <Text style={{ fontFamily: fonts.semiBold, fontSize: 16 }}>
              {Math.random() > 0.5
                ? `${Math.floor(Math.random() * 10)}' x`
                : ""}
              {Math.round(Math.random() * 1000) / 100}' x
              {Math.round(Math.random() * 1000) / 100}' sqft
            </Text>
            <Ionicons name="remove-circle" size={20} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.important}>Total: 100 sq ft</Text>
        <ActionButton title="Edit" iconName="pencil" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.foreground,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 5 },
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  important: {
    fontFamily: fonts.bold,
    fontSize: 20,
  },
});
