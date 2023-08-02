import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex mx-auto justify-center px-2 pt-2 md:pt-8 pb-8 max-w-[800px]">
      <div className="flex flex-col">
        <Image
          className="rounded-lg my-8"
          src="/guard.avif"
          width={544}
          height={384}
          alt="The Doors of Durin"
        />
        <h2 className="my-8 md:my-16 w-full text-center text-sky-700 text-4xl tracking-wider">
          Page Not Found
        </h2>
        <h3 className="my-8 w-full text-5xl text-center text-stone-200">404</h3>
      </div>
    </main>
  );
}
