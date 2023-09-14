import Link from "next/link";

const HomePage = () => (
  <main className="flex mx-auto flex-col items-center justify-center px-2 pt-8 pb-8 max-w-[1024px]">
    <Link href="/konkoba">Konkoba</Link>
    <Link href="/djaa-kouroussa">Djaa Kouroussa</Link>
    <Link href="/dunumba-intro">Dunumba Intro</Link>
  </main>
);

export default HomePage;
