import { ActionButton } from "@/components/action-button";
import MeasurementCard from "@/components/measurement";
import { PatinaPage } from "@/components/patina-page";
import { SearchBar } from "@/components/searchbar";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import database from "@/watermelonDB";
import MeasurementModel from "@/watermelonDB/model/measurement";
import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import { auth } from "../firebaseConfig";

import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const fuseOptions = {
  keys: ["name"],
  threshold: 0.4,
  ignoreLocation: true,
};

function Index({ measurements }: { measurements: MeasurementModel[] }) {
  const navigation = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.debug("\x1b[1m\x1b[32mlogged in\x1b[0m");
        setCheckingUser(false);
        return;
      }
      console.debug("\x1b[1m\x1b[32msigned out\x1b[0m");
      setCheckingUser(false);
    });
  }, []);

  const fuse = useMemo(
    () => new Fuse(measurements, fuseOptions),
    [measurements],
  );

  const data = useMemo(() => {
    if (!searchQuery) return measurements;
    return fuse.search(searchQuery).map((result) => result.item);
  }, [searchQuery, fuse, measurements]);

  if (checkingUser) {
    return (
      <View>
        <Text>hello</Text>
      </View>
    );
  }

  return (
    <PatinaPage>
      <View style={styles.container}>
        <SearchBar handleSearch={setSearchQuery} />

        <Pressable style={styles.actionsRow} onPress={() => Keyboard.dismiss()}>
          <ActionButton
            title="Add"
            iconName="add-circle"
            callbackFunction={() =>
              navigation.push("/measurement/new-measurement")
            }
          />
        </Pressable>

        <FlatList
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          onScroll={() => Keyboard.dismiss()}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                paddingVertical: 40,
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
                backgroundColor: colors.foreground,
              }}
            >
              <Image
                source={require("@/assets/images/tape-measure.png")}
                style={{ width: 80, height: 80, resizeMode: "contain" }}
              />
              <Text style={{ fontFamily: fonts.semiBold, fontStyle: "italic" }}>
                No measurements yet. Tap to add.
              </Text>
              <ActionButton
                title="Add measurements"
                iconName="add-circle"
                callbackFunction={() =>
                  navigation.push("/measurement/new-measurement")
                }
                disableMargin
                height={50}
                width={180}
              />
            </View>
          }
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: MeasurementModel }) => (
            <MeasurementCard measurement={item} />
          )}
        />
      </View>
    </PatinaPage>
  );
}

const enhance = withObservables([], () => ({
  measurements: database
    .get<MeasurementModel>("measurements")
    .query(Q.sortBy("date", Q.desc))
    .observe(),
}));

export default enhance(Index);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  scrollContainer: {
    marginTop: 12,
    flex: 1,
  },
});
