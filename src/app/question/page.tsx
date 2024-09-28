"use client";
import { GetAllQuestions, type QuestionResponse } from "@/api/questions";
import ClientTable from "@/components/Table/ClientTable";
import { useQuery } from "@tanstack/react-query";
import "./ModalCreate";
import CreateButton from "./ModalCreate";
import { QuestionsDataColumn } from "./questions-columns";
const Page = () => {
  const { data, error, isLoading } = useQuery<QuestionResponse[], Error>({
    queryKey: ["questions"],
    queryFn: GetAllQuestions,
  });
  // <div className="flex h-screen flex-col justify-end bg-black text-slate-100">

  return (
    <div className="flex h-screen flex-col  bg-black text-slate-100">
      <div className="left m-5 ml-auto">
        {data && <CreateButton >Create</CreateButton>}
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
  );
};

export default Page;
