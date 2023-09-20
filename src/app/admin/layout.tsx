import { AuthContextProvider } from "@/features";
import { ComponentProps, FC } from "react";

const AdminLayout: FC<ComponentProps<typeof AuthContextProvider>> = ({
  children,
}) => <AuthContextProvider>{children}</AuthContextProvider>;

export default AdminLayout;
