import { Crossroad } from "@/features";
import { LogoIcon } from "@/features/Icons";

const AdminPage = () => (
  <>
    <header className="flex justify-center items-center pt-14 pb-8 px-4 w-full">
      <LogoIcon
        height={48}
        innerClass="animate-swing"
        className="overflow-visible"
      />
      <h1 className="font-black p-4 text-3xl text-redy-dark hidden md:block">
        edundytor
      </h1>
    </header>
    <main className="flex mx-auto flex-col items-center justify-center px-2 pt-8 pb-8 max-w-[960px]">
      <Crossroad />
    </main>
  </>
);

export default AdminPage;
