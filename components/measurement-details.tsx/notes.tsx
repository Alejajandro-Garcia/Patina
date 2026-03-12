import { fonts } from "@/theme/fonts";
import { useState } from "react";
import { Text } from "react-native";
import { LabeledInput } from "../labeled-input";
import { EditableCard } from "./editable-card";
import { ModalContainer } from "./modals/modal-container";

export const Notes = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <EditableCard
      title={"Notes"}
      onPress={() => setModalVisible(true)}
      modal={
        <ModalContainer
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Enter Notes"
        >
          <LabeledInput
            label="Product Info"
            placeholder="European Collection - Paris Grey 7x8x9 20 mil wear layer"
          />
          <LabeledInput label="Toilet Removal and Reset" placeholder="0" />
          <LabeledInput label="Furniture Removal and Reset" placeholder="0" />
          <LabeledInput label="Floor Prep" placeholder="0" />
          <LabeledInput label="Appliances Removal and Reset" placeholder="0" />
          <LabeledInput label="Pull Up & Disposal" placeholder="0" />
          <LabeledInput label="Baseboards" placeholder="0" />
          <LabeledInput
            label="Moldings"
            placeholder="99 endcaps, 99 T-moldings, 99 reducers"
          />
        </ModalContainer>
      }
    >
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
