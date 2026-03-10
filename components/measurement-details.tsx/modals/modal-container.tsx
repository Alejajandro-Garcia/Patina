import { ActionButton } from "@/components/action-button";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ModalContainerProps {
  children: React.ReactNode;
}

export const ModalContainer = ({ children }: ModalContainerProps) => {
  const [visible, setVisible] = useState(true);
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View
        style={{
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
          backgroundColor: "'rgba(0, 0, 0, 0.5)'",
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: colors.foreground,
            marginHorizontal: 20,
            padding: 20,
            minHeight: 100,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: fonts.bold,
                fontSize: 24,
              }}
            >
              Enter Contact Info
            </Text>
            <Pressable onPress={() => setVisible(false)}>
              <Ionicons name="close-circle" size={24} />
            </Pressable>
          </View>
          {children}
          <View style={{ flexDirection: "row-reverse" }}>
            <ActionButton title="Save" iconName="add-circle" />
            <ActionButton
              title="Cancel"
              iconName="close"
              callbackFunction={() => setVisible(false)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
