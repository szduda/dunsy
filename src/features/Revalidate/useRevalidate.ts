import { useState } from "react";
import { useSearchParams } from "next/navigation";

export const useRevalidate = (initialPath: string = "") => {
  const [response, setResponse] = useState("");
  const params = useSearchParams();
  const secret = params.get("q");

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
