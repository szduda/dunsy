import { FormEvent, useState } from "react";
import {
  addSnippet,
  updateSnippet,
  Snippet,
  getSnippet,
} from "@/features/SnippetApi";

const swings = {
  "": "none",
  ">": "4/4",
  ">>": "6/8 tiriba, djaa",
  "<<": "6/8 soli, dunumba",
  "-->": "4/4 gnawa",
  "--<": "4/4 soboninkun",
};

const defaultFormData: Snippet = {
  id: "",
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

export const useSnippetForm = (_initialData: Partial<FormData> = {}) => {
  const [initialData, setInitialData] = useState(_initialData);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ...defaultFormData,
    ...initialData,
    patterns: {
      ...defaultFormData.patterns,
      ...initialData.patterns,
    },
  });

  const patternsDirty = Object.keys(formData.patterns).some(
    (instrument) =>
      formData.patterns[instrument] !==
      (initialData.patterns?.[instrument] || "")
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
        : await addSnippet(formData);
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
    resetForm();
    const refetched = await getSnippet(String(initialData.id));
    const newInitial = { id: initialData.id, ...refetched };
    updateFormData(newInitial);
    setInitialData(newInitial);
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
  };
};
