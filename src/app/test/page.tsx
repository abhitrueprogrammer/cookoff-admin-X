"use client";
import ClientTable from "@/components/Table/ClientTable";
import { QuestionsDataColumn } from "./questions-columns";

const sampleData = [
  {
    ID: "b8ab4b7c-2984-429e-bd57-f5288f485b65",
    Description: "testing question",
    Title: "testing",
    InputFormat: "1 2 3 4",
    Points: 10,
    Round: 1,
    Constraints: "some constraints",
    OutputFormat: "1 2 3 4",
  },
  {
    ID: "b8ab4b7c-2984-429e-bd57-f5288f485b65",
    Description: "testing question",
    Title: "testing",
    InputFormat: "1 2 3 4",
    Points: 10,
    Round: 1,
    Constraints: "some constraints",
    OutputFormat: "1 2 3 4",
  },
  {
    ID: "b8ab4b7c-2984-429e-bd57-f5288f485b65",
    Description: "testing question",
    Title: "testing",
    InputFormat: "1 2 3 4",
    Points: 10,
    Round: 1,
    Constraints: "some constraints",
    OutputFormat: "1 2 3 4",
  },
  {
    ID: "b8ab4b7c-2984-429e-bd57-f5288f485b65",
    Description: "testing question",
    Title: "testing",
    InputFormat: "1 2 3 4",
    Points: 10,
    Round: 1,
    Constraints: "some constraints",
    OutputFormat: "1 2 3 4",
  },
];

const Page = () => {
  return (
    <div>
      <ClientTable
        data={sampleData}
        error={null}
        isLoading={false}
        columns={QuestionsDataColumn}
      />
    </div>
  );
};

export default Page;
