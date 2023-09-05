import { DocumentReference } from "firebase/firestore/lite";

export type SwingStyle = "" | ">" | ">>" | "<<" | "-->" | "--<";

export type Pattern = {
  id?: string;
  pattern?: string;
  instrument?: string;
  title?: string;
  authorUid: string;
};

export type Snippet = {
  id?: string;
  title: string;
  tags: string;
  patterns: Record<string, string>;
  description?: string;
  swing?: SwingStyle;
  tempo?: string;
  signal?: string;
  authorUid: string;
};

export type DbSnippet = {
  id?: string;
  title: string;
  tags: string[];
  patterns: DocumentReference[];
  description?: string;
  swing?: SwingStyle;
  tempo?: number;
  signal?: string;
  authorUid: string;
};

export type SnippetListItem = {
  id: string;
  title: string;
};
