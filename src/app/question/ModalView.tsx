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
      <DialogContent className="max-h-[75vh] overflow-hidden overflow-y-auto break-words p-0 sm:max-w-7xl">
        <div className="border-b px-6 py-4 sm:max-w-4xl">
          <ModalDetailText label="" content={row.original.Title} />
        </div>
        <div className="space-y-3 border-t p-6 pt-0 sm:max-w-7xl md:border-none">
          <div className="flex flex-row items-center">
            <ModalDetailText label="ID: " content={row.original.ID} />
            <CopyButton content={row.original.ID} />
          </div>

          <div className="break-words text-sm">
            Discription: {row.original.Description}
          </div>

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

          <div className="break-words text-sm">
            Explanation: {row.original.Explanation?.join("\n")}
          </div>

          <ModalDetailText
            label="Sample Output: "
            content={row.original.SampleTestOutput?.join("\n")}
          />
          <ModalDetailText
            label="Constraints: "
            content={row.original.Constraints?.join("\n")}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetails;
