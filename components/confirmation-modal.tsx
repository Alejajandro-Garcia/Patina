import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActionButton } from "./action-button";

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal = ({
  visible,
  title,
  message,
  onClose,
  onConfirm,
}: ConfirmationModalProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={[
          styles.overlay,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text style={styles.message}>{message}</Text>
          </View>
          <View style={styles.actions}>
            <ActionButton
              title="Discard"
              iconName="trash"
              callbackFunction={onConfirm}
            />
            <ActionButton
              title="Cancel"
              iconName="close"
              callbackFunction={onClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    paddingHorizontal: 20,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  card: {
    backgroundColor: colors.foreground,
    height: 150,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 22,
  },
  body: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    fontFamily: fonts.semiBold,
  },
  actions: {
    flexDirection: "row-reverse",
  },
});
