import { FC, ReactNode, createContext, useContext, useState } from "react";
import { getSnippet } from "@/features/SnippetApi";
import { FormData } from "./useSnippetForm";
import { useRouter } from "next/navigation";

type PickSnippetContext = {
  initialData: Partial<FormData> | null;
  loading: boolean;
  pick(id: string): void;
  reset(): void;
};

export const Context = createContext<PickSnippetContext>({
  initialData: null,
  loading: false,
  pick: () => null,
  reset: () => null,
});
export const usePickSnippet = () => useContext(Context);

export const PickSnippetProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [initialData, setInitialData] =
    useState<PickSnippetContext["initialData"]>(null);
  const [loading, setLoading] = useState(false);

  const pick = async (id: string) => {
    setLoading(true);
    try {
      const snippet = await getSnippet(id);
      setInitialData({ id, ...snippet } as any);
    } catch (error) {
      setInitialData(null);
      router.push("/foladmin");
    }
    setLoading(false);
  };

  const reset = () => setInitialData(null);

  return (
    <Context.Provider value={{ initialData, pick, reset, loading }}>
      {children}
    </Context.Provider>
  );
};
