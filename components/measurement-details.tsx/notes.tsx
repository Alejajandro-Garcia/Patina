import { fonts } from "@/theme/fonts";
import { Text } from "react-native";
import { EditableCard } from "./editable-card";

export const Notes = () => {
  return (
    <EditableCard title={"Notes"}>
      <Text numberOfLines={2} style={{ fontFamily: fonts.regular }}>
        <Text style={{ fontFamily: fonts.bold }}>Product info:</Text>
        {` European Collection - Paris Grey 7x8x9 20 mil wear layer`}
      </Text>
      <Text numberOfLines={1} style={{ fontFamily: fonts.regular }}>
        <Text style={{ fontFamily: fonts.bold }}>
          Toilet removal and reset:
        </Text>
        {` 89`}
      </Text>
      <Text numberOfLines={1} style={{ fontFamily: fonts.regular }}>
        <Text style={{ fontFamily: fonts.bold }}>
          Furniture removal and reset:
        </Text>
        {` 89`}
      </Text>
      <Text numberOfLines={1} style={{ fontFamily: fonts.regular }}>
        <Text style={{ fontFamily: fonts.bold }}>Floor prep:</Text>
        {` 89`}
      </Text>
      <Text numberOfLines={1} style={{ fontFamily: fonts.regular }}>
        <Text style={{ fontFamily: fonts.bold }}>
          Appliances removal and reset:
        </Text>
        {` 89`}
      </Text>
      <Text numberOfLines={1} style={{ fontFamily: fonts.regular }}>
        <Text style={{ fontFamily: fonts.bold }}>Pull up & disposal:</Text>
        {` 89`}
      </Text>
      <Text numberOfLines={1} style={{ fontFamily: fonts.regular }}>
        <Text style={{ fontFamily: fonts.bold }}>Baseboards:</Text>
        {` 89`}
      </Text>
      <Text numberOfLines={2} style={{ fontFamily: fonts.regular }}>
        <Text style={{ fontFamily: fonts.bold }}>Moldings:</Text>
        {` 99 endcaps, 99 T-moldings, 99 reducers`}
      </Text>
    </EditableCard>
  );
};
