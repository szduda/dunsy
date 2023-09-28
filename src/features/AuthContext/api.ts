import { FirebaseError } from "firebase/app";
import { collection, getDocs, query } from "firebase/firestore/lite";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db } from "@/firebase";
import { auth } from "@/firebaseAuth";

export const logIn = async (email: string, password: string) => {
  if (auth.currentUser) {
    console.log("Already logged in", auth.currentUser?.email);
    return;
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

export const getConfig = async (userUid?: string) => {
  if (!userUid) {
    return "";
  }

  const col = collection(db, "editorConfig");
  const res = await getDocs(query(col));

  const config = res.docs[0];

  return config.data();
};
