import { app, auth } from "@/firebase";
import { FirebaseError } from "firebase/app";
import {
  getAuth,
  indexedDBLocalPersistence,
  initializeAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

// export const auth = initializeAuth(app, {
//   persistence: indexedDBLocalPersistence,
// });

export const logIn = async (email: string, password: string) => {
  if (auth.currentUser) {
    console.log("Already logged in", auth.currentUser?.email);
    // return auth.currentUser;
  }

  if (!email || !password) {
    console.log("Missing email or password.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;
    console.log("User logged in", user.email);
    return user;
  } catch (e) {
    console.error("Login error", e instanceof FirebaseError && e.code);
  }
};
