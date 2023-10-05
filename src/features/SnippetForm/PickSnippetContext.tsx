import { FC, ReactNode, createContext, useContext, useState } from "react";
import { Snippet, getSnippet } from "@/features/SnippetApi";
import { useRouter } from "next/navigation";

const defaultFormData: Snippet = {
  id: "",
  slug: "",
  authorUid: "",
  title: "",
  description: "",
  tags: "",
  swing: "",
  tempo: "110",
  signal: "",
  patterns: {
    dundunba: "",
    sangban: "",
    kenkeni: "",
    kenkeni2: "",
    bell: "",
    djembe: "",
  },
};

export type FormData = typeof defaultFormData;

type PickSnippetContext = {
  loading: boolean;
  initialData: Partial<FormData> | null;
  pick(id: string): void;
  reset(): void;
  formData: FormData;
  updateFormData(data: Partial<FormData>): void;
  resetFormData(): void;
  currentBarSize: number;
};

export const Context = createContext<PickSnippetContext>({
  loading: false,
  initialData: null,
  pick: () => null,
  reset: () => null,
  formData: defaultFormData,
  updateFormData: () => null,
  resetFormData: () => null,
  currentBarSize: -1,
});
export const usePickSnippet = () => useContext(Context);

export const PickSnippetProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [initialData, setInitialData] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const pick = async (id: string) => {
    setLoading(true);
    try {
      const snippet = await getSnippet(id);
      const data = { id, ...snippet };
      setInitialData(data);
      setFormData({
        ...defaultFormData,
        ...data,
        patterns: {
          ...defaultFormData.patterns,
          ...data?.patterns,
        },
      });
    } catch (error) {
      setInitialData(null);
      router.push("/foladmin");
    }
    setLoading(false);
  };

  const updateFormData = (partial: Partial<FormData>) =>
    setFormData({
      ...defaultFormData,
      ...formData,
      ...partial,
      patterns: {
        ...defaultFormData.patterns,
        ...formData.patterns,
        ...(partial?.["patterns"] ?? {}),
      },
    });

  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  const reset = () => {
    setInitialData(null);
    resetFormData();
  };

  const len = Object.values(formData.patterns).find(Boolean)?.length ?? 0;
  const currentBarSize = 2 * (len % 3 === 0 ? 3 : len % 4 === 0 ? 4 : 0);

  return (
    <Context.Provider
      value={{
        initialData,
        pick,
        reset,
        loading,
        formData,
        updateFormData,
        resetFormData,
        currentBarSize: len > 2 && len >= currentBarSize ? currentBarSize : -2,
      }}
    >
      {children}
    </Context.Provider>
  );
};
