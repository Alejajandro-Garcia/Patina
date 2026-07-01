import { Auth, signInWithEmailAndPassword } from "firebase/auth";

const handleSignIn = (auth: Auth, username: string, password: string) => {
  if (!username && !password) return;
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.debug(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.debug(errorCode, errorMessage);
    });
};

export default handleSignIn;
