"use client";

import { CopyButton } from "@/components/ui/CopyButton";
import ModalDetailText from "@/components/ui/DetailItem";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { type Row } from "@tanstack/react-table";
import { useState } from "react";
import { type QuestionsDataProps } from "./questions-columns";

const ModalDetails = ({
  row,
  children,
}: {
  row: Row<QuestionsDataProps>;
  children: React.ReactNode;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-hidden break-words p-0 sm:max-w-7xl">
        <div className="border-b px-6 py-4 sm:max-w-4xl">
          <h3 className="font-medium capitalize">Details</h3>
        </div>
        <div className="flex flex-col-reverse md:flex-row " >
          <div className="flex flex-col justify-between md:border-r">
            <div className="space-y-3 border-t p-6 md:border-none sm:max-w-7xl">
              <h4 className="text-md font-medium">Info</h4>
              <ModalDetailText label="Title: " content={row.original.Title} />
              <div className="flex flex-row items-center">
                <ModalDetailText label="ID: " content={row.original.ID} />
                <CopyButton content={row.original.ID} />
              </div>
              {/* <ModalDetailText
                label="Description: " */}
                
                <div className="break-words text-sm">Discription: {row.original.Description}</div>
                
              {/* /> */}
              <ModalDetailText
                label="Input Format: "
                content={row.original.InputFormat?.join("\n")}
              />
              <ModalDetailText
                label="Output Format: "
                content={row.original.OutputFormat?.join("\n")}
              />
              <ModalDetailText
                label="Points: "
                content={row.original.Points?.toString()}
              />
              <ModalDetailText
                label="Round: "
                content={row.original.Round?.toString()}
              />
              <ModalDetailText
                label="Sample Input: "
                content={row.original.SampleTestInput?.join("\n")}
              />

                <div className="break-words text-sm">Explanation: {row.original.Explanation?.join("\n")}</div>

              <ModalDetailText
                label="Sample Output: "
                content={row.original.SampleTestOutput?.join("\n")}
              />
              <ModalDetailText
                label="Constraints: "
                content={row.original.Constraints?.join("\n")}
              />

              {/* <h4 className="text-md mt-4 font-medium">Metadata</h4> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetails;
