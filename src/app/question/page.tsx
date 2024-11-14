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
  return (
    <div>
      <div className="flex h-screen flex-col bg-black text-slate-100">
        <div className="flex items-end justify-between">
          <CreateButton>Create</CreateButton>
        </div>
        <div className="overflow-y-auto">
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
