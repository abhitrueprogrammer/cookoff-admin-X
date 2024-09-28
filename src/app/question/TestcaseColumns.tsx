import { TestCaseResponse } from "@/api/testcases";
import { DataTableColumnHeader } from "@/components/Table/DataTableColumnHeader";
import { DataTableRowActions } from "@/components/Table/DataTableRowActions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { GrHide } from "react-icons/gr";

const columnHelper = createColumnHelper<TestCaseResponse>();
export const TestcaseDataColumn = [
  // columnHelper.accessor("ID", {
  //     header: ({ column }) => (
  //         <DataTableColumnHeader column={column} title="ID" />
  //     ),
  //     cell: ({ row }) => (
  //         <div className="flex gap-2">
  //             {row.original.Hidden && <GrHide size={16} />}
  //             {row.getValue("ID")}
  //         </div>
  //         ),
  //         enableSorting: true,
  //         enableHiding: false,
  //         meta: {
  //             className: "text-left",
  //             displayName: "ID",
  //         },
  //     }),
  columnHelper.accessor("ID", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original.Hidden && <GrHide size={16} />}
        {row.getValue("ID")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "ID",
    },
  }),
  columnHelper.display({
    id: "input",
    header: "Input",
    enableSorting: false,
    enableHiding: true,
    meta: {
      className: "text-center",
      displayName: "input",
    },
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" >Input</Button>
            </DialogTrigger>
          <DialogContent>
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
    meta: {
      className: "text-left",
      displayName: "Memory",
    },
  }),
  columnHelper.accessor("ExpectedOutput", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ExpectedOutput" />
    ),

    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "ExpectedOutput",
    },
  }),
  columnHelper.accessor("ExpectedOutput", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ExpectedOutput" />
    ),

    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "ExpectedOutput",
    },
  }),
  columnHelper.accessor("Runtime", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Runtime" />
    ),

    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "Runtime",
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: true,
    meta: {
      className: "text-center",
      displayName: "actions",
    },
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <DataTableRowActions row={row}>
          {/* <ModalDelete row={row} id={row.original.ID}>

            Delete
          </ModalDelete>
          <ModalUpdate id={row.original.ID}>
              Update
          </ModalUpdate> */}
        </DataTableRowActions>
      </div>
    ),
  }),
  ,
] as ColumnDef<TestCaseResponse>[];
