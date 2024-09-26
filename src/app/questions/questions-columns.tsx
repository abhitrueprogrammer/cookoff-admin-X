import { DataTableColumnHeader } from "@/components/Table/DataTableColumnHeader";
import { DataTableRowActions } from "@/components/Table/DataTableRowActions";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import ModalDetails from "./ModalUsers";
import ModalDelete from "./ModalDelete";
import ModalUpdate from "./ModalUpdate";
export interface QuestionsDataProps {
  ID: string;
  Description: string;
  Title: string;
  InputFormat: string;
  Points: number;
  Round: number;
  Constraints: string;
  OutputFormat: string;
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
    id: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: true,
    meta: {
      className: "text-center",
      displayName: "actions",
    },
    cell: ({ row }) => (
      <div className="flex w-fit items-center gap-2">
        <ModalDetails row={row}>
          <Button className="px-2 py-1">View Event Details</Button>
        </ModalDetails>
        <DataTableRowActions row={row}>
          <ModalDelete row={row} id={row.original.ID}>
            {/* <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className={`p-2 hover:bg-red-400`}
            > */}
              Delete
            {/* </DropdownMenuItem> */}
          </ModalDelete>
          <ModalUpdate row={row}>
          Update
          </ModalUpdate>
        </DataTableRowActions>
      </div>
    ),
  }),
] as ColumnDef<QuestionsDataProps>[];
