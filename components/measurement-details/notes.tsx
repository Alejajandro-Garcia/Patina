import { fonts } from "@/theme/fonts";
import { NotesType } from "@/types/measurementInfo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { EditableCard } from "./editable-card";

export const Notes = () => {
  const router = useRouter();
  const notes = null as NotesType | null;
  return (
    <EditableCard
      title={"Notes (optional)"}
      onPress={() => router.push("/measurement/form-pages/notes-form")}
    >
      {!notes ? (
        <View style={styles.emptyState}>
          <Ionicons name="document-text" size={50} />
          <Text style={{ fontFamily: fonts.semiBold, fontStyle: "italic" }}>
            No notes provided. Tap to add.
          </Text>
        </View>
      ) : (
        <View>
          <Text numberOfLines={2} style={{ fontFamily: fonts.regular }}>
            <Text style={{ fontFamily: fonts.bold }}>{"Product info: "}</Text>
            {notes.productInfo}
          </Text>
          {notes.toiletRnR && (
            <Text numberOfLines={1} style={{ fontFamily: fonts.regular }}>
              <Text style={{ fontFamily: fonts.bold }}>
                {"Toilet removal and reset: "}
              </Text>
              {notes.toiletRnR}
            </Text>
          )}
          {notes.furnitureRnR && (
            <Text numberOfLines={1} style={{ fontFamily: fonts.regular }}>
              <Text style={{ fontFamily: fonts.bold }}>
                {"Furniture removal and reset: "}
              </Text>
              {notes.furnitureRnR}
            </Text>
          )}
          {notes.floorPrep && (
            <Text numberOfLines={1} style={{ fontFamily: fonts.regular }}>
              <Text style={{ fontFamily: fonts.bold }}>{"Floor prep: "}</Text>
              {notes.floorPrep}
            </Text>
          )}
          {notes.appliancesRnR && (
            <Text numberOfLines={1} style={{ fontFamily: fonts.regular }}>
              <Text style={{ fontFamily: fonts.bold }}>
                {"Appliances removal and reset: "}
              </Text>
              {notes.appliancesRnR}
            </Text>
          )}
          {notes.pullUpAndDisposal && (
            <Text numberOfLines={1} style={{ fontFamily: fonts.regular }}>
              <Text style={{ fontFamily: fonts.bold }}>
                {"Pull up & disposal: "}
              </Text>
              {notes.pullUpAndDisposal}
            </Text>
          )}
          {notes.baseboards && (
            <Text numberOfLines={1} style={{ fontFamily: fonts.regular }}>
              <Text style={{ fontFamily: fonts.bold }}>{"Baseboards: "}</Text>
              {notes.baseboards}
            </Text>
          )}
          {notes.moldings && (
            <Text numberOfLines={2} style={{ fontFamily: fonts.regular }}>
              <Text style={{ fontFamily: fonts.bold }}>{"Moldings: "}</Text>
              {notes.moldings.endcaps && `${notes.moldings.endcaps} endcaps`}
              {notes.moldings.tMoldings &&
                `, ${notes.moldings.tMoldings} T-moldings`}
              {notes.moldings.reducers &&
                `, ${notes.moldings.reducers} reducers`}
            </Text>
          )}
        </View>
      )}
    </EditableCard>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    gap: 4,
    height: 100,
    justifyContent: "center",
  },
});
