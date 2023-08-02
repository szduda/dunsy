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
  const patternKeys = Object.keys(patterns);
  const patternValues = Object.values(patterns);
  let messages: string[] = [];

  const firstLen = patternValues?.[0].length;
  const meter = firstLen % 4 === 0 ? 4 : firstLen % 3 === 0 ? 3 : -1;

  const incorrectPatterns = patternKeys.filter(
    (inst) => patterns[inst].length % meter !== 0
  );

  if (meter < 0) {
    messages.push(`Incorrect pattern: ${patternKeys[0]}`);
  }

  if (meter > 0 && incorrectPatterns.length > 0) {
    messages.push(`Incorrect patterns: ${incorrectPatterns.join(", ")}`);
  }

  if (!title) {
    messages.push("A non-empty title please.");
  }

  if ((tags?.length || 0) < 3) {
    messages.push(
      "At least 3 tags please. They must be separated with a coma."
    );
  }
  if ((Object.keys(patterns)?.length || 0) < 1) {
    messages.push("Incomplete data payload");
  }

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
    ...(data.description ? { description: data.description } : {}),
    ...(data.signal ? { signal: data.signal } : {}),
    ...(data.swing ? { swing: data.swing } : {}),
    ...(data.tempo ? { tempo: Number(data.tempo) } : {}),
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
    messages: ["Failed to add the snippet"],
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
