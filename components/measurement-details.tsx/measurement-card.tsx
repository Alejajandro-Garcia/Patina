import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { ActionButton } from "../action-button";

export const MeasurementCard = () => {
  const router = useRouter();
  const measurements = [];

  return (
    <View style={styles.container}>
      <Text style={styles.important}>Areas and Measurement</Text>
      {measurements.length === 0 ? (
        <View style={styles.emptyState}>
          <Image
            source={require("@/assets/images/tape-measure.png")}
            style={styles.emptyIcon}
          />
          <Text style={{ fontFamily: fonts.semiBold, fontStyle: "italic" }}>
            No measurements yet. Tap to add.
          </Text>
          <ActionButton
            title="Add measurements"
            iconName="add-circle"
            callbackFunction={() =>
              router.push("/measurement/new/measurements-form")
            }
            disableMargin
            height={50}
            width={180}
          />
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 10 }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
              (item, index) => (
                <View
                  key={item}
                  style={{
                    padding: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor:
                      index % 2 === 0 ? colors.input : colors.background,
                  }}
                >
                  <Text style={{ fontFamily: fonts.semiBold, fontSize: 16 }}>
                    Area {item}
                  </Text>
                  <Text style={{ fontFamily: fonts.regular, fontSize: 16 }}>
                    {Math.random() > 0.5
                      ? `${Math.floor(Math.random() * 10)}'x`
                      : ""}
                    {Math.round(Math.random() * 1000) / 100}'x
                    {Math.round(Math.random() * 1000) / 100}'
                  </Text>
                  <Ionicons name="remove-circle" size={24} />
                </View>
              ),
            )}
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.important}>Total: </Text>
            <Text style={[styles.important, { fontSize: 28 }]}>
              {Math.round(Math.random() * 100000) / 100} ft²
            </Text>
            <ActionButton
              title="Add"
              iconName="add-circle"
              callbackFunction={() =>
                router.push("/measurement/new/measurements-form")
              }
            />
          </View>
        </>
      )}
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
    paddingTop: 5,
  },
  important: {
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  emptyIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
