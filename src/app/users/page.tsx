"use client";
import ClientTable from "@/components/Table/ClientTable";
import { useQuery } from "@tanstack/react-query";
// import "./ModalCreate";
// import CreateButton from "./ModalCreate";
import { GetUsers, User } from "@/api/users";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { UserDataColumn } from "./user-columns";
const Page = () => {
  const { data, error, isLoading } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: GetUsers,
  });
  // <div className="flex h-screen flex-col justify-end bg-black text-slate-100">
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col bg-black text-slate-100">
      {/* <div className="left  justify-between m-5 ml-auto"> */}
      <div className="flex items-end justify-between">
        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
          className="bg-bb m-4 hover:bg-slate-950"
        >
          <FaHome size={20} className="text-white"></FaHome>
        </Button>

        <Button className="m-2`" disabled>Promote users</Button>
      </div>
      <div>
        <ClientTable
          data={data}
          error={error}
          isLoading={isLoading}
          columns={UserDataColumn}
        />
      </div>
    </div>
  );
};

export default Page;
