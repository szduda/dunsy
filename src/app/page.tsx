import { SnippetForm } from "@/features";

export default function Home() {
  return (
    <main className="flex min-h-screen mx-auto flex-col items-center justify-center px-2 pt-8 pb-32 max-w-[800px]">
      <SnippetForm />
    </main>
  );
}
