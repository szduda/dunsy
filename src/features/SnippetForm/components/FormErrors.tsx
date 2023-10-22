import { FC } from "react";
import Image from "next/image";

export const FormErrors: FC<{ errors: string[] }> = ({ errors }) => (
  <div className="py-4 flex md:flex-row-reverse justify-center md:justify-between md:order-reverse items-center flex-wrap w-full">
    <div className="py-4 flex-1">
      {errors.map((msg) => (
        <div key={msg} className="text-xl text-redy py-2">
          {msg}
        </div>
      ))}
    </div>
    <div className="py-4 md:pr-8">
      <Image
        placeholder="blur"
        blurDataURL="fallback.jpeg"
        src="/dictator.jpeg"
        alt="The Great Validator"
        quality={20}
        width={165}
        height={330}
        className="rounded-md"
      />
    </div>
  </div>
);
