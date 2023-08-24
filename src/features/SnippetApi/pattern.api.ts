import { db } from "@/firebase";
import { FirebaseError } from "firebase/app";
import {
  collection,
  addDoc,
  updateDoc,
  DocumentReference,
  getDocs,
  deleteDoc,
  query,
  where,
  documentId,
} from "firebase/firestore/lite";
import { DbSnippet, Pattern, Snippet } from "./types";

const PATTERNS_COLLECTION = "patterns";

export const addPattern = async (data: Pattern) => {
  try {
    const docRef = await addDoc(collection(db, PATTERNS_COLLECTION), data);
    console.log("Pattern written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error(
      "Error adding pattern: ",
      e instanceof FirebaseError && e.code
    );
  }
};

export const updatePatterns = async (
  existingData: DbSnippet,
  patterns: Snippet["patterns"]
) => {
  const existingPatterns = await getDocs(
    query(
      collection(db, PATTERNS_COLLECTION),
      where(documentId(), "in", existingData.patterns)
    )
  );

  return await Promise.all(
    Object.keys(patterns)
      .map((instrument) => {
        const newPattern = patterns?.[instrument];
        const pattern = existingPatterns.docs.find(
          (doc) => doc.data().instrument === instrument
        );

        if (pattern?.exists()) {
          if (!newPattern) {
            removePattern(pattern.ref);
            return;
          }

          if (pattern.data().pattern !== newPattern) {
            updatePattern(pattern.ref, {
              id: pattern.id,
              pattern: patterns[instrument],
            });
          }

          // changes or no, return existing ref
          return Promise.resolve(pattern.ref);
        } else if (newPattern) {
          // return new ref
          return addPattern({
            instrument,
            title: instrument,
            pattern: patterns[instrument],
          });
        }
      })
      .filter(Boolean)
  );
};

const updatePattern = async (docRef: DocumentReference, data: Pattern) => {
  if (!data.id) {
    console.log("Pattern data invalid: missing ID.");
    return;
  }

  try {
    const response = await updateDoc(docRef, data);
    console.log("Pattern {id: ", docRef.id, "} updated");
    return response;
  } catch (e) {
    console.error(
      "Error updating pattern: ",
      e instanceof FirebaseError && e.code
    );
  }
};

export const removePattern = async (docRef: DocumentReference) => {
  try {
    const response = await deleteDoc(docRef);
    console.log("Pattern {id: ", docRef.id, "} removed");
    return response;
  } catch (e) {
    console.error(
      "Error removing pattern: ",
      e instanceof FirebaseError && e.code
    );
  }
};
