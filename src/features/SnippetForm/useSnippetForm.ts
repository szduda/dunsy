import { FormEvent, useState } from "react";
import {
  addSnippet,
  updateSnippet,
  Snippet,
  getSnippet,
} from "@/features/SnippetApi";
import { useAuth, usePickSnippet } from "@/features/admin";
import { SwingStyle } from "../SnippetApi/types";
import { useRevalidate } from "../Revalidate/useRevalidate";

const swings: Record<SwingStyle, string> = {
  "": "none",
  "<<<": "4/4 rushy",
  "<": "4/4 hasty",
  "-->": "4/4 lilazy",
  ">": "4/4 bluesy",
  "<<": "6/8 hasty",
  ">>": "6/8 lazy",
};

export const useSnippetForm = () => {
  const { initialData, pick, formData, resetFormData, updateFormData } =
    usePickSnippet();
  const mode = initialData ? "edit" : "add";
  const { user } = useAuth();
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { revalidate } = useRevalidate();

  const patternsDirty = Object.keys(formData.patterns).some(
    (instrument) =>
      formData.patterns[instrument] !==
      (initialData?.patterns?.[instrument] || "")
  );

  const dirty = Object.keys(formData).some((field) => {
    const value = formData[field as keyof Snippet];
    // try shallow comparison
    if (value === (initialData?.[field as keyof Snippet] || "")) {
      return false;
    }

    if (field === "patterns") {
      return patternsDirty;
    }

    return true;
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = formData.id
        ? await updateSnippet(formData, patternsDirty)
        : await addSnippet({ ...formData, authorUid: user?.uid! });
      if (res.ok) {
        setSuccess(true);
        setErrors([]);

        if (mode === "add") {
          revalidate("");
          revalidate("grooves");
        } else if (mode === "edit") {
          if (initialData!.slug !== formData.slug) {
            revalidate(initialData!.slug!);
          } else {
            revalidate(formData.slug);
          }
        }
      } else {
        setErrors(res.messages);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    resetFormData();
    setLoading(false);
    setSuccess(false);
    setErrors([]);
  };

  const editAgain = async () => {
    if (!initialData?.id) {
      return;
    }

    resetForm();
    const refetched = await getSnippet(String(initialData.id));
    const newInitial = { id: initialData.id, ...refetched };
    updateFormData(newInitial);
    pick(initialData.id);
  };

  return {
    handleSubmit,
    loading,
    errors,
    success,
    swings,
    formData,
    updateFormData,
    resetForm,
    editAgain,
    dirty,
    mode,
  } as const;
};
