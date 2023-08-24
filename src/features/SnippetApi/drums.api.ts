import { db } from "@/firebase";
import { FirebaseError } from "firebase/app";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  DocumentReference,
} from "firebase/firestore/lite";
import { DbSnippet } from "./types";

const DRUMS_COLLECTION = "drums";

export const addDrums = async (snippet: DbSnippet) => {
  if (snippet.patterns.length < 1) {
    console.log("Snippet data invalid: min 1 pattern is required.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, DRUMS_COLLECTION), {
      ...snippet,
      createdAt: serverTimestamp(),
    });
    console.log("Snippet created with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error(
      "Error adding snippet: ",
      e instanceof FirebaseError && e.code
    );
  }
};

export const updateDrums = async (
  docRef: DocumentReference,
  snippet: Partial<DbSnippet>
) => {
  try {
    await updateDoc(docRef, {
      ...snippet,
      updatedAt: serverTimestamp(),
    });
    console.log("Snippet updated with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error updating snippet: ", e instanceof FirebaseError && e);
  }
};
