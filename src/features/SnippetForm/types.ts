export type Pattern = {
  id?: string;
  pattern?: string;
  instrument?: string;
  title?: string;
};

export type Snippet = {
  id?: string;
  title: string;
  tags: string;
  patterns: Record<string, string>;
  description?: string;
  swing?: string;
  tempo?: string;
  signal?: string;
};

export type DbSnippet = {
  id?: string;
  title: string;
  tags: string[];
  patterns: any[];
  description?: string;
  swing?: string;
  tempo?: number;
  signal?: string;
};

export type SnippetListItem = {
  id: string;
  title: string;
};
