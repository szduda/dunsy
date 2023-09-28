import { useState } from "react";
import { useAuth } from "../admin";

export const useRevalidate = (initialPath: string = "") => {
  const [response, setResponse] = useState("");
  const { secret } = useAuth();

  const revalidate = async (path: string = initialPath) => {
    const raw = await fetch("/foladmin/paradise/revalidate", {
      body: JSON.stringify({
        path,
        secret,
      }),
      method: "POST",
    });
    const res = await raw.text();
    setResponse(res);
  };

  return { response, revalidate };
};
