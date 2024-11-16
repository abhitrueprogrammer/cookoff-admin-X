import { DataTableColumnHeader } from "@/components/Table/DataTableColumnHeader";
import { DataTableRowActions } from "@/components/Table/DataTableRowActions";
import { Button } from "@/components/ui/button";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";
import ModalDetails from "./ModalView";
import ModalGetTestcase from "./ModalGetTestcase";
export interface QuestionsDataProps {
  ID: string;
  Description: string;
  Title: string;
  InputFormat: string[];
  Points: number;
  Round: number;
  Constraints: string[] | null;
  OutputFormat: string[];
  SampleTestInput: string[];
  SampleTestOutput: string[];
  Explanation: string[];
}

const columnHelper = createColumnHelper<QuestionsDataProps>();
export const QuestionsDataColumn = [
  columnHelper.accessor("Title", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "Title",
    },
  }),
  columnHelper.accessor("Points", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Points" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "Points",
    },
  }),
  columnHelper.accessor("Round", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Round" />
    ),

    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "Round",
    },
  }),
  columnHelper.display({
    id: "view-more",
    header: "View More",
    enableSorting: false,
    enableHiding: true,
    meta: {
      className: "text-center",
      displayName: "view-more",
    },
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <ModalDetails row={row}>
          <Button className="px-2 py-1">View More Details</Button>
        </ModalDetails>
      </div>
    ),
  }),

  columnHelper.display({
    id: "questions",
    header: "Questions",
    enableSorting: false,
    enableHiding: true,
    meta: {
      className: "text-center",
      displayName: "questions",
    },
    cell: ({ row }) => (
      <DataTableRowActions row={row}>
        <div className="flex flex-col justify-center gap-1">
          <ModalDelete row={row} id={row.original.ID}>
            Delete
          </ModalDelete>
          <ModalUpdate id={row.original.ID}>Update</ModalUpdate>
        </div>
      </DataTableRowActions>
    ),
  }),

  columnHelper.display({
    id: "test-cases",
    header: "Test Cases",
    enableSorting: false,
    enableHiding: true,
    meta: {
      className: "text-center",
      displayName: "test-cases",
    },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <ModalGetTestcase id={row.original.ID}></ModalGetTestcase>
      </div>
    ),
  }),
] as ColumnDef<QuestionsDataProps>[];
