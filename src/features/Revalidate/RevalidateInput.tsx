import { FC, useState } from "react";
import { Button, Input } from "@/features/rsc";
import { useRevalidate } from "./useRevalidate";

export const RevalidateInput: FC = () => {
  const [path, setPath] = useState("");
  const { response, revalidate } = useRevalidate();

  if (response === "Unauthorized") {
    return (
      <div
        className="fixed w-screen h-screen top-0 left-0 right-0 bg-redy flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1000000 }}
      >
        <div className="text-4xl text-yellowy font-black">Good joke indeed</div>
      </div>
    );
  }

  return (
    <label>
      <div className="flex items-center flex-wrap">
        <div className="mr-1 tracking-wider">
          {process.env.NEXT_PUBLIC_BASE_URL}/
        </div>
        <Input value={path} onChange={(e) => setPath(e.target.value)} />
        <Button ninja mini onClick={() => revalidate(path)}>
          Revalidate
        </Button>
      </div>
      {response && (
        <div className="w-full text-yellowy">
          <span className="opacity-50">Response:</span> <br />
          {response}
        </div>
      )}
    </label>
  );
};

export const RevalidateAll: FC = () => {
  const [safetySwitch, setSafetySwitch] = useState(false);
  return (
    <>
      <Button mini className="min-w-[150px] mr-4" disabled={!safetySwitch}>
        Revalidate all
      </Button>
      <label className="flex">
        <Input
          type="checkbox"
          checked={safetySwitch}
          onChange={(e) => setSafetySwitch(e.target.checked)}
        />
        <div className="ml-2 text-graye">I know what I&rsquo;m doing</div>
      </label>
    </>
  );
};
