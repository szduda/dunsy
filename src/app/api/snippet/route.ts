import { addPattern, addSnippet } from "@/firebase";
import { DocumentReference } from "firebase/firestore/lite";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!request.body) {
    return NextResponse.json(
      { message: "Missing request body" },
      { status: 400 }
    );
  }

  const { title, author, description, signal, swing, tags, patterns } =
    await request.json();

  if (!canEdit(author)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const patternsRefs = await Promise.all(
    Object.keys(patterns).map((instrument) =>
      addPattern({
        instrument,
        title: instrument,
        pattern: patterns[instrument],
        author,
      })
    )
  );

  const snippet = await addSnippet({
    author,
    title,
    description,
    signal,
    swing,
    tags: tags.split(",").map((tag: string) => tag.trim()),
    patterns: patternsRefs,
  });

  return NextResponse.json(
    { message: "Snippet added" },
    { status: snippet?.id ? 200 : 500 }
  );
}

const canEdit = (author: string) =>
  ["Szdun Dudumba", "Mamarcel Zambara", "Ritara Raingura"].includes(author);
