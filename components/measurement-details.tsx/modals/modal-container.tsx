import { ActionButton } from "@/components/action-button";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ModalContainerProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  title: string;
}

export const ModalContainer = ({
  children,
  visible,
  onClose,
  title,
}: ModalContainerProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <KeyboardAvoidingView
        style={[
          styles.overlay,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable style={styles.card} onPress={Keyboard.dismiss}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close-circle" size={24} />
            </Pressable>
          </View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 12, gap: 10 }}
          >
            {children}
          </ScrollView>
          <View style={styles.actions}>
            <ActionButton title="Save" iconName="add-circle" />
            <ActionButton
              title="Cancel"
              iconName="close"
              callbackFunction={onClose}
            />
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  card: {
    backgroundColor: colors.foreground,
    marginHorizontal: 20,
    padding: 20,
    minHeight: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
  },
  actions: {
    flexDirection: "row-reverse",
    paddingTop: 10,
  },
});
