import { colors } from "@/theme/colors";
import { ToastShowParams } from "toastify-react-native/utils/interfaces";
const FailedToast = (errorMessage: string) => {
  const FailedToastConfig: ToastShowParams = {
    type: "error",
    text1: errorMessage,
    position: "bottom",
    visibilityTime: 5000,
    backgroundColor: colors.foreground,
    textColor: "red",
    useModal: false,
  };
  return FailedToastConfig;
};

export default FailedToast;
