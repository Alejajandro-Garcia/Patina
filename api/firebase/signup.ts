import { router } from "expo-router";
import { Auth, createUserWithEmailAndPassword } from "firebase/auth";

const handleSignUp = (auth: Auth, username: string, password: string) => {
  if (!username && !password) {
    return;
  }
  createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      console.debug(userCredential.user);
      router.dismissAll();
      router.replace("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.debug(errorCode, errorMessage);
    });
};

export default handleSignUp;
