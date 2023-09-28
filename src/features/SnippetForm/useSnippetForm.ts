import { FormEvent, useState } from "react";
import {
  addSnippet,
  updateSnippet,
  Snippet,
  getSnippet,
} from "@/features/SnippetApi";
import { useAuth, usePickSnippet } from "@/features/admin";
import { SwingStyle } from "../SnippetApi/types";

const swings: Record<SwingStyle, string> = {
  "": "none",
  "<<<": "4/4 rushy",
  "<": "4/4 hasty",
  "-->": "4/4 lilazy",
  ">": "4/4 bluesy",
  "<<": "6/8 hasty",
  ">>": "6/8 lazy",
};

const defaultFormData: Snippet = {
  id: "",
  slug: "",
  authorUid: "",
  title: "",
  description: "",
  tags: "",
  swing: "",
  tempo: "",
  signal: "",
  patterns: {
    dundunba: "",
    sangban: "",
    kenkeni: "",
    kenkeni2: "",
    bell: "",
  },
};

export type FormData = typeof defaultFormData;

export const useSnippetForm = () => {
  const { initialData, pick } = usePickSnippet();
  const mode = initialData ? "edit" : "add";
  const { user } = useAuth();
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ...defaultFormData,
    ...initialData,
    patterns: {
      ...defaultFormData.patterns,
      ...initialData?.patterns,
    },
  });

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
      } else {
        setErrors(res.messages);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (partial: Partial<FormData>) =>
    setFormData({
      ...defaultFormData,
      ...formData,
      ...partial,
      patterns: {
        ...defaultFormData.patterns,
        ...formData.patterns,
        ...(partial["patterns"] ?? {}),
      },
    });

  const resetForm = () => {
    setFormData(defaultFormData);
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
  };
};
