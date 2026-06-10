import { getAreaSqFt, roundSqFt } from "@/helpers/area-calculations";
import { formatAreaString } from "@/helpers/format-units";
import useCalculateAreas from "@/hooks/use-calculate-areas";
import useMeasurementDetailsStore from "@/stores/use-measurement-details-store";
import useSettingsStore from "@/stores/use-settings-store";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { measurementUnit } from "@/types/units";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useShallow } from "zustand/react/shallow";
import { ActionButton } from "../action-button";
import { ConfirmationModal } from "../confirmation-modal";

export const MeasurementCard = () => {
  const router = useRouter();
  const { measurements, setMeasurements, total, setTotal, imperial } =
    useMeasurementDetailsStore(
      useShallow((state) => ({
        measurements: state.areas,
        setMeasurements: state.setAreas,
        total: state.total,
        setTotal: state.setTotal,
        imperial: state.imperial,
      })),
    );
  const { units } = useSettingsStore();
  const { areas: displayAreas, total: displayTotal } = useCalculateAreas(
    measurements,
    total,
    imperial,
    units,
  );
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [visibleConfirmationModal, setConfirmationModal] =
    useState<boolean>(false);

  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={visibleConfirmationModal}
        title="Delete area"
        message="Are you sure you want to delete this area?"
        onClose={() => setConfirmationModal(false)}
        onConfirm={() => {
          if (deleteIndex !== null) {
            const removed = measurements[deleteIndex];
            setMeasurements(
              measurements.filter((_, index) => index !== deleteIndex),
            );
            setTotal(roundSqFt(total - getAreaSqFt(removed)));
          }
          setConfirmationModal(false);
        }}
      />
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
              router.push("/measurement/form-pages/measurements-form")
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
            {displayAreas.map((area, index) => (
              <View
                key={index}
                style={[
                  styles.row,
                  {
                    backgroundColor:
                      index % 2 === 0 ? colors.input : colors.background,
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: fonts.semiBold,
                    fontSize: 16,
                    width: 150,
                    margin: 5,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {area.name}
                </Text>
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: 16,
                    flex: 1,
                    justifyContent: "flex-start",
                  }}
                >
                  {formatAreaString(area, units)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setConfirmationModal(true);
                    setDeleteIndex(index);
                  }}
                >
                  <Ionicons name="remove-circle" size={24} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.important}>Total: </Text>
            <Text style={[styles.important, { fontSize: 28 }]}>
              {displayTotal} {measurementUnit[units]}
            </Text>
            <ActionButton
              title="Edit"
              iconName="pencil"
              callbackFunction={() =>
                router.push("/measurement/form-pages/measurements-form")
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
  row: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
