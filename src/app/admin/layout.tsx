import { FC, ReactNode } from "react";
import { AuthContextProvider } from "@/features";
import { LogoIcon } from "@/features/Icons";

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <AuthContextProvider>
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
    {children}
  </AuthContextProvider>
);

export default AdminLayout;
