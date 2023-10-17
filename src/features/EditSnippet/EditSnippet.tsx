import {
  PickSnippetModal,
  SnippetForm,
  usePickSnippet,
} from "@/features/admin";
import { useIdParam } from "../SnippetForm/useIdParam";
import { useEffect } from "react";

export const EditSnippet = () => {
  const { loading, initialData, reset } = usePickSnippet();
  const { setIdParam } = useIdParam();

  useEffect(() => reset, []);

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 right-0 h-screen text-3xl font-black flex items-center justify-center p-4 tracking-widest text-center">
          Loading...
        </div>
      ) : initialData ? (
        <SnippetForm />
      ) : (
        <PickSnippetModal onPick={setIdParam} />
      )}
    </>
  );
};
