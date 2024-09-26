"use client";
import { GetAllQuestions, type QuestionResponse } from "@/api/questions";
import ClientTable from "@/components/Table/ClientTable";
import { useQuery } from "@tanstack/react-query";
import { QuestionsDataColumn } from "./questions-columns";

const Page = () => {
  const { data, error, isLoading } = useQuery<QuestionResponse[], Error>({
    queryKey: ["questions"],
    queryFn: GetAllQuestions,
  });

  return (
    <div>
      <ClientTable
        data={data}
        error={error}
        isLoading={isLoading}
        columns={QuestionsDataColumn}
      />
    </div>
  );
};

export default Page;
