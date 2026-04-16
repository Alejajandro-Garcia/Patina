import { colors } from "@/theme/colors";
import { ToastShowParams } from "toastify-react-native/utils/interfaces";

const SuccessToast: ToastShowParams = {
  type: "success",
  text1: "Successfully saved",
  position: "bottom",
  visibilityTime: 5000,
  textColor: "green",
  backgroundColor: colors.input,
};

export default SuccessToast;
