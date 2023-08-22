import { Button, SnippetForm } from "@/features";
import { FC, useState } from "react";
import { FormData } from "../SnippetForm/useSnippetForm";

export const Choice: FC = () => {
  const [data, setData] = useState<Partial<FormData>>();
  const [mode, setMode] = useState<"add" | "edit" | null>(null);

  if (mode) {
    return <SnippetForm initialData={data} onBack={() => setMode(null)} />;
  }

  return (
    <div
      style={{ backgroundImage: "url('/guard.avif')" }}
      className="w-screen h-screen bg-cover bg-center fixed top-0 flex justify-center"
    >
      <div className="flex flex-col md:flex-row px-4 items-start md:justify-center w-full">
        <div className="w-full md:w-[360px] p-4 md:py-8">
          <Button
            className="md:min-w-full bg-emerald-800 hover:bg-emerald-700 border-transparent"
            onClick={() => {
              setData(undefined);
              setMode("add");
            }}
          >
            Add new
          </Button>
        </div>
        <div className="w-full md:w-[360px] p-4 md:py-8">
          <Button
            className="md:min-w-full border-transparent"
            onClick={() => {
              setData({ title: "test" });
              setMode("edit");
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};
