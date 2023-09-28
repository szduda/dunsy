import { Button } from "@/features/Button";
import Link from "next/link";

const AdminPage = () => (
  <main className="flex mx-auto flex-col items-center justify-center px-2 pt-8 pb-8 max-w-[960px]">
    <div className="w-screen h-screen bg-cover bg-guard bg-center fixed top-0 flex justify-center">
      <div className="flex flex-col md:flex-row px-4 items-center md:justify-around w-full bg-[#14292688]">
        <div className="w-full md:w-[240px] p-4 md:py-8">
          <Link href={"/foladmin/add"}>
            <Button className="md:min-w-full border-transparent">
              Add new
            </Button>
          </Link>
        </div>
        <div className="w-full md:w-[240px] p-4 md:py-8">
          <Link href={"/foladmin/edit"}>
            <Button className="md:min-w-full border-transparent">Edit</Button>
          </Link>
        </div>
      </div>
    </div>
  </main>
);

export default AdminPage;
