"use client";

import { getTestcaseByQuestion, type TestCaseResponse } from "@/api/testcases";
import ClientTable from "@/components/Table/ClientTable";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/CopyButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import ModalCreateTestcase from "./ModalCreateTestcase";
import { TestcaseDataColumn } from "./TestcaseColumns";
const Page = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery<TestCaseResponse[], Error>({
    queryKey: ["testcases", id],
    queryFn: async () => {
      return await getTestcaseByQuestion(id);
    },
  });
  console.log(data);
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-slate-900 text-white hover:bg-slate-700">
            Test Case Info
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[83.33vh] max-w-fit overflow-y-auto bg-black text-white">
          <DialogHeader>
            <DialogTitle>
              QID: {id} <CopyButton content={id} />{" "}
            </DialogTitle>
            <DialogDescription>A table all about test cases</DialogDescription>
          </DialogHeader>
          <div className="bg-black">
            <ModalCreateTestcase id={id}> Create</ModalCreateTestcase>
            <div className="max-w-xl md:max-w-7xl">
              <ClientTable
                data={data}
                error={error}
                isLoading={isLoading}
                columns={TestcaseDataColumn}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// const ModalDetails = ({
//   id,
//   children,
// }: {
//   id: string;
//   children: React.ReactNode;
// }) => {
//   // const [testcase]
// };

export default Page;
