import { getSnippets } from "@/features/SnippetApi";

export default async function sitemap() {
  const snippets = await getSnippets(undefined, { limit: 1000 });
  let maxDate = 0;
  const snippetRoutes = snippets.map(({ slug, lastModified }) => {
    const lastMod = lastModified ?? 0;
    if (lastMod > maxDate) {
      maxDate = lastMod!;
    }

    return {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`,
      lastModified: new Date(lastMod).toISOString(),
    };
  });

  const routes = ["", "/grooves", "/help", "/story"].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${route}`,
    lastModified: new Date(maxDate).toISOString(),
  }));

  return [...routes, ...snippetRoutes];
}
