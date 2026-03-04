import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DropdownMenuProps {
  title: string;
  dropdownItems: string[];
}

export const DropdownMenu = ({ title, dropdownItems }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, open ? styles.buttonOpen : styles.buttonClosed]}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.buttonText}>{!selected ? title : selected}</Text>
        <Ionicons name={!open ? "chevron-down" : "chevron-up"} />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          {dropdownItems.map((value, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => {
                setSelected(value);
                setOpen(false);
              }}
            >
              <Text style={styles.dropdownText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 150,
  },
  button: {
    backgroundColor: colors.input,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  buttonClosed: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  buttonOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonText: {
    fontFamily: fonts.semiBold,
  },
  dropdown: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: colors.input,
    zIndex: 1000,
  },
  dropdownItem: {
    height: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  dropdownText: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
});
