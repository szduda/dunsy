import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePickSnippet } from "@/features/admin";

const PARAM_NAME = "id";

export const useIdParam = () => {
  const { pick, reset } = usePickSnippet();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has(PARAM_NAME)) {
      pick(searchParams.get(PARAM_NAME)!);
    }

    return reset;
  }, [searchParams]);

  const setIdParam = (newId: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (!newId) {
      params.delete(PARAM_NAME);
    } else {
      params.set(PARAM_NAME, newId);
    }

    const query = params ? `?${params}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  };

  return {
    setIdParam,
  };
};
