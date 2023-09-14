import { FC, useState } from "react";
import { Button, PickSnippetModal, SnippetForm } from "@/features";
import { getSnippet } from "@/features/SnippetApi";
import { FormData } from "../SnippetForm/useSnippetForm";

export const Crossroad: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
    setInitialData({ id, ...snippet });
    setModalOpen(false);
    setMode("edit");
  };

  return (
    <div className="w-screen h-screen bg-cover bg-guard bg-center fixed top-0 flex justify-center">
      <div className="flex flex-col md:flex-row px-4 items-center md:justify-around w-full bg-[#14292688]">
        <div className="w-full md:w-[240px] p-4 md:py-8">
          <Button
            className="md:min-w-full border-transparent"
            onClick={() => {
              setInitialData(null);
              setMode("add");
            }}
          >
            Add new
          </Button>
        </div>
        <div className="w-full md:w-[240px] p-4 md:py-8">
          <Button
            className="md:min-w-full border-transparent"
            onClick={() => setModalOpen(true)}
          >
            Edit
          </Button>
        </div>
      </div>
      <PickSnippetModal
        onPick={onPick}
        onClose={() => setModalOpen(false)}
        className={[
          "transition ease-in-out origin-center duration-300",
          modalOpen
            ? "opacity-1 scale-y-100 rotate-0"
            : "opacity-0 scale-y-0 rotate-12",
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
};
