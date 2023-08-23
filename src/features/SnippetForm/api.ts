import { db } from "@/firebase";
import { FirebaseError } from "firebase/app";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  documentId,
  limit,
  orderBy,
} from "firebase/firestore/lite";
import { DbSnippet, Pattern, Snippet } from "./types";

const DRUMS_COLLECTION = "drums";
const PATTERNS_COLLECTION = "patterns";

export const getSnippets = async (search?: string) => {
  const col = collection(db, DRUMS_COLLECTION);
  const response = await getDocs(
    search
      ? query(
          col,
          where("tags", "array-contains", search.toLowerCase().trim()),
          orderBy("createdAt", "desc"),
          limit(20)
        )
      : query(col, orderBy("createdAt", "desc"), limit(5))
  );

  return response.docs.map((doc) => ({ id: doc.id, title: doc.data().title }));
};

export const getSnippet = async (id: string) => {
  const raw = await getDoc(doc(db, DRUMS_COLLECTION, id));
  const rawData = raw.data();
  const rawPatterns = await Promise.all(
    rawData?.patterns
      .filter(Boolean)
      .map(async (patternRef: DocumentReference) => await getDoc(patternRef))
  );

  return {
    ...rawData,
    ...(rawData?.tempo ? { tempo: String(rawData.tempo) } : {}),
    tags: rawData?.tags.join(", "),
    patterns: rawPatterns.reduce((acc, current) => {
      const { instrument, pattern } = current.data() ?? {};
      return { ...acc, [instrument]: pattern };
    }, {}),
  } as Snippet;
};

export const addSnippet = async (data: Snippet) => {
  const { title, tags, patterns, description, swing, signal, tempo } = data;
  const messages = validate(data);

  if (messages.length > 0) {
    return { messages };
  }

  const patternsRefs = await Promise.all(
    Object.keys(patterns)
      .map(
        (instrument) =>
          instrument &&
          patterns[instrument] &&
          addPattern({
            instrument,
            title: instrument,
            pattern: patterns[instrument],
          })
      )
      .filter(Boolean)
  );

  const snippet = await addDrums({
    title,
    ...(description ? { description: description } : {}),
    ...(signal ? { signal: signal } : {}),
    ...(swing ? { swing: swing } : {}),
    ...(tempo ? { tempo: Number(tempo) } : {}),
    tags: tags.split(",").map((tag: string) => tag.trim()),
    patterns: patternsRefs,
  });

  if (snippet?.id) {
    return {
      messages: ["Snippet added"],
      ok: true,
    };
  }

  return {
    messages: ["Off you go. The rhythm vault is closed today."],
  };
};

export const updateSnippet = async (data: Snippet) => {
  const { title, tags, description, swing, signal, tempo } = data;
  const messages = validate(data);

  if (!data.id) {
    throw new Error("Missing id param in data");
  }

  if (messages.length > 0) {
    return { messages };
  }

  const document = await getDoc(doc(db, DRUMS_COLLECTION, data.id));
  const existingData = document.data() as DbSnippet;
  const patternsRefs = await updatePatterns(existingData, data);

  const success = await updateDrums(document.ref, {
    title,
    ...(description ? { description: description } : {}),
    ...(signal ? { signal: signal } : {}),
    ...(swing ? { swing: swing } : {}),
    ...(tempo ? { tempo: Number(tempo) } : {}),
    tags: tags.split(",").map((tag: string) => tag.trim()),
    patterns: patternsRefs.filter(Boolean),
  });

  if (success) {
    return {
      messages: ["Snippet updated"],
      ok: true,
    };
  }

  return {
    messages: ["Off you go. The rhythm vault is closed today."],
  };
};

const validate = ({ title, tags, patterns, tempo }: Snippet) => {
  const patternKeys = Object.keys(patterns).filter((key) =>
    Boolean(patterns[key])
  );
  const patternValues = Object.values(patterns).filter(Boolean);
  let messages: string[] = [];

  const firstLen = patternValues?.[0]?.length || 1;
  const meter =
    Number.parseInt(tags.charAt(0)) || firstLen % 6 === 0
      ? 6
      : firstLen % 4 === 0
      ? 4
      : firstLen % 3 === 0
      ? 3
      : -1;

  const incorrectPatterns = patternKeys.filter(
    (inst) => patterns[inst].length % meter !== 0
  );

  if (!title) {
    messages.push("A non-empty title please.");
  }

  if ((tags?.length || 0) < 3) {
    messages.push(
      "At least 3 tags please. They must be separated with a coma."
    );
  }

  if (patternValues.length < 1) {
    messages.push("At least one drum pattern please.");
  } else {
    if (meter < 0) {
      messages.push(`Incorrect pattern: ${patternKeys[0]}.`);
    }

    if (meter > 0 && incorrectPatterns.length > 0) {
      messages.push(`Incorrect patterns: ${incorrectPatterns.join(", ")}.`);
    }
  }

  const incorrectNotation = patternKeys.find((inst) =>
    [...patterns[inst]].some((char) => !["x", "o", "-"].includes(char))
  );

  if (incorrectNotation) {
    messages.push("Incorrect notation. Patterns speak only: x o -");
  }

  if (tempo && (Number(tempo) < 80 || Number(tempo) > 180)) {
    messages.push("Tempo between 80 and 180 please.");
  }

  return messages;
};

const addDrums = async (snippet: DbSnippet) => {
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

const updateDrums = async (docRef: DocumentReference, snippet: DbSnippet) => {
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

const addPattern = async (data: Pattern) => {
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

const updatePatterns = async (existingData: DbSnippet, data: Snippet) => {
  const existingPatterns = await getDocs(
    query(
      collection(db, PATTERNS_COLLECTION),
      where(documentId(), "in", existingData.patterns)
    )
  );

  return await Promise.all(
    Object.keys(data.patterns).map((instrument) => {
      const patternDoc = existingPatterns.docs.find(
        (doc) => doc.data().instrument === instrument
      );

      const newPattern = data.patterns?.[instrument];

      if (patternDoc?.exists()) {
        if (!newPattern) {
          removePattern(patternDoc.ref);
          return;
        }

        if (patternDoc.data().pattern !== newPattern) {
          updatePattern(patternDoc.ref, {
            id: patternDoc.id,
            pattern: data.patterns[instrument],
          });
        }

        // changes or no, return existing ref
        return Promise.resolve(patternDoc.ref);
      } else {
        // return new ref
        return addPattern({
          instrument,
          title: instrument,
          pattern: data.patterns[instrument],
        });
      }
    })
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

const removePattern = async (docRef: DocumentReference) => {
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
