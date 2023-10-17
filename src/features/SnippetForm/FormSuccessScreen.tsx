import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/features/rsc";

type Props = {
  mode: "create" | "update" | "read";
  editAgain(): void;
  resetForm(): void;
};

export const FormSuccessScreen: FC<Props> = ({
  mode,
  editAgain,
  resetForm,
}) => (
  <div className="flex flex-col items-center">
    <Image
      className="rounded-lg my-8"
      src="/gods.avif"
      quality={25}
      width={717}
      height={403}
      alt="Happy African Gods"
    />
    <h2 className="my-8 md:my-16 w-full text-center text-greeny-light text-4xl tracking-wider">
      Mandé Gods are pleased with your sacrifice
    </h2>
    {mode === "update" ? (
      <Button className="mt-8" onClick={editAgain}>
        Edit this rhythm again
      </Button>
    ) : (
      <Button className="mt-8" onClick={resetForm}>
        Add another rhythm
      </Button>
    )}
    <Link href="/foladmin">
      <Button className="mt-8 bg-transparent md:hover:bg-transparent border-transparent hover:border-graye">
        <span className="text-graye-light">Go to the mountains</span>
      </Button>
    </Link>
  </div>
);
