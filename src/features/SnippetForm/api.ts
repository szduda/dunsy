import { db } from "@/firebase";
import { FirebaseError } from "firebase/app";
import { collection, addDoc, serverTimestamp } from "firebase/firestore/lite";

type Snippet = {
  title: string;
  tags: string;
  patterns: Record<string, string>;
  description: string;
  swing: string;
  tempo: string;
  signal: string;
};

export const addSnippet = async ({
  title,
  tags,
  patterns,
  ...data
}: Snippet) => {
  const firstLen = Object.values(patterns as Record<string, string>)?.[0]
    .length;
  const meter = firstLen % 4 === 0 ? 4 : firstLen % 3 === 0 ? 3 : -1;

  if (
    meter < 0 ||
    !title ||
    (tags?.length || 0) < 3 ||
    (Object.keys(patterns)?.length || 0) < 1 ||
    Object.values(patterns as Record<string, string>).some(
      (p) => p.length % meter !== 0
    )
  ) {
    return {
      message: "Incomplete data payload",
    };
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
    ...(data.description ? { description: data.description } : {}),
    ...(data.signal ? { signal: data.signal } : {}),
    ...(data.swing ? { swing: data.swing } : {}),
    ...(data.tempo ? { tempo: Number(data.tempo) } : {}),
    tags: tags.split(",").map((tag: string) => tag.trim()),
    patterns: patternsRefs,
  });

  return {
    message: snippet?.id ? "Snippet added" : "Failed to add the snippet",
  };
};

const addDrums = async (snippet: any = {}) => {
  if (snippet.tempo && (snippet.tempo < 80 || snippet.tempo > 180)) {
    console.log("Snippet data invalid: tempo must be between 80 and 180.");
    return;
  }

  if (snippet.patterns.length < 1) {
    console.log("Snippet data invalid: min 1 pattern is required.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "_drums"), {
      ...snippet,
      createdAt: serverTimestamp(),
    });
    console.log("Snippet written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error(
      "Error adding snippet: ",
      e instanceof FirebaseError && e.code
    );
  }
};

const addPattern = async (patternData: any = {}) => {
  if (
    !patternData.pattern ||
    [...patternData.pattern].some((char) => !["x", "o", "-"].includes(char))
  ) {
    console.log("Pattern data invalid: incorrect notation.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "_patterns"), patternData);
    console.log("Pattern written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error(
      "Error adding pattern: ",
      e instanceof FirebaseError && e.code
    );
  }
};
