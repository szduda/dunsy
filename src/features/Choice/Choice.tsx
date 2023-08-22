import { FC, useState } from "react";
import { Button, PickSnippetModal, SnippetForm, getSnippet } from "@/features";
import { FormData } from "../SnippetForm/useSnippetForm";

export const Choice: FC = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [initialData, setInitialData] = useState<Partial<FormData> | null>(
    null
  );
  const [mode, setMode] = useState<"add" | "edit" | null>(null);

  if (mode) {
    return (
      <SnippetForm
        initialData={initialData || undefined}
        onBack={() => {
          setMode(null);
          setInitialData(null);
        }}
      />
    );
  }

  const onPick = async (id: string) => {
    const snippet = await getSnippet(id);
    setInitialData(snippet);
    setModalOpen(false);
    setMode("edit");
  };

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
              setInitialData(null);
              setMode("add");
            }}
          >
            Add new
          </Button>
        </div>
        <div className="w-full md:w-[360px] p-4 md:py-8">
          <Button
            className="md:min-w-full border-transparent"
            onClick={() => setModalOpen(true)}
          >
            Edit
          </Button>
        </div>
      </div>
      {modalOpen && (
        <PickSnippetModal onPick={onPick} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};
