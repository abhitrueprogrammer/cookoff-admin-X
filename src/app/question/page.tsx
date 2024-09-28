"use client";
import { GetAllQuestions, type QuestionResponse } from "@/api/questions";
import ClientTable from "@/components/Table/ClientTable";
import { useQuery } from "@tanstack/react-query";
import "./ModalCreate";
import CreateButton from "./ModalCreate";
import { QuestionsDataColumn } from "./questions-columns";
import { Button } from "@/components/ui/button";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";
const Page = () => {
  const { data, error, isLoading } = useQuery<QuestionResponse[], Error>({
    queryKey: ["questions"],
    queryFn: GetAllQuestions,
  });
  // <div className="flex h-screen flex-col justify-end bg-black text-slate-100">
  const router = useRouter()
  return (
    
    <div>
      <div className="flex h-screen flex-col  bg-black text-slate-100">
        <div className="flex justify-between items-end">
        <Button onClick={()=>{ router.push("/dashboard")}} className="bg-bb m-4 hover:bg-slate-950" ><FaHome size={20} className="text-white"></FaHome></Button>
          {data && <CreateButton  >Create</CreateButton>}
        </div>
        <div >
          <ClientTable
            data={data}
            error={error}
            isLoading={isLoading}
            columns={QuestionsDataColumn}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
