"use client";
import ClientTable from "@/components/Table/ClientTable";
import { useQuery } from "@tanstack/react-query";
// import "./ModalCreate";
// import CreateButton from "./ModalCreate";
import { GetUsers, User } from "@/api/users";
import { useRouter } from "next/navigation";
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
