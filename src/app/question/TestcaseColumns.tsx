import { type TestCaseResponse } from "@/api/testcases";
import { DataTableColumnHeader } from "@/components/Table/DataTableColumnHeader";
import { DataTableRowActions } from "@/components/Table/DataTableRowActions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { GrHide } from "react-icons/gr";
import TestcaseDelete from "./ModalTestcaseDelete";
import ModalTestcaseUpdate from "./ModalTestcaseUpdate";

const columnHelper = createColumnHelper<TestCaseResponse>();

export const TestcaseDataColumn = [
  columnHelper.accessor("ID", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.Hidden && <GrHide size={16} />}
        {row.getValue("ID")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
    meta: { className: "text-left", displayName: "ID" },
  }),

  columnHelper.display({
    id: "input",
    header: "Input",
    enableSorting: false,
    enableHiding: true,
    meta: { className: "text-center", displayName: "Input" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger>
            <Button className="bg-black" variant="outline">
              View Input
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] overflow-y-auto break-words">
            {row.original.Input}
          </DialogContent>
        </Dialog>
      </div>
    ),
  }),

  columnHelper.accessor("Memory", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Memory" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: { className: "text-left", displayName: "Memory" },
  }),

  columnHelper.accessor("ExpectedOutput", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expected Output" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: { className: "text-left", displayName: "ExpectedOutput" },
  }),

  columnHelper.accessor("Runtime", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Runtime" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: { className: "text-left", displayName: "Runtime" },
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: true,
    meta: { className: "text-center", displayName: "Actions" },
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <DataTableRowActions row={row}>
          <div className="space-y-1">
            <TestcaseDelete id={row.original.ID}>Delete</TestcaseDelete>
            <ModalTestcaseUpdate row={row}>Update</ModalTestcaseUpdate>
          </div>
        </DataTableRowActions>
      </div>
    ),
  }),
] as ColumnDef<TestCaseResponse>[];
