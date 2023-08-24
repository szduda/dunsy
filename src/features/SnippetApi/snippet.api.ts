import { db } from "@/firebase";
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore/lite";
import { DbSnippet, Snippet } from "./types";
import { addDrums, updateDrums } from "./drums.api";
import { addPattern, updatePatterns } from "./pattern.api";
import { validate } from "./validate";

const DRUMS_COLLECTION = "drums";

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

  const patternsRefs = (await Promise.all(
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
  )) as DocumentReference[];

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

export const updateSnippet = async (data: Snippet, patternsDirty: boolean) => {
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
  const tagsArray = tags.split(",").map((tag: string) => tag.trim());

  const newPatterns =
    patternsDirty &&
    ((await updatePatterns(existingData, data.patterns)).filter(
      Boolean
    ) as DocumentReference[]);

  const success = await updateDrums(document.ref, {
    ...(title && title !== existingData.title ? { title } : {}),
    ...(description !== existingData.description ? { description } : {}),
    ...(signal !== existingData.signal ? { signal } : {}),
    ...(swing !== existingData.swing ? { swing } : {}),
    ...(tempo !== String(existingData.tempo || 0)
      ? { tempo: Number(tempo) }
      : {}),
    ...(tagsArray.join() !== existingData.tags.join()
      ? { tags: tagsArray }
      : {}),
    ...(newPatterns ? { patterns: newPatterns } : {}),
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
