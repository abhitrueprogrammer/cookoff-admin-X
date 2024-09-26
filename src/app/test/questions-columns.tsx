import { DataTableColumnHeader } from "@/components/Table/DataTableColumnHeader";
import { DataTableRowActions } from "@/components/Table/DataTableRowActions";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import ModalDetails from "./ModalUsers";

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
  // columnHelper.accessor("ID", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ID" />
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  //   meta: {
  //     className: "text-left",
  //     displayName: "ID",
  //   },
  // }),
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
  // columnHelper.accessor("Description", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Description" />
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  //   meta: {
  //     className: "text-left",
  //     displayName: "Description",
  //   },
  // }),
  // columnHelper.accessor("InputFormat", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Input Format" />
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  //   meta: {
  //     className: "text-left",
  //     displayName: "Input Format",
  //   },
  // }),
  // columnHelper.accessor("OutputFormat", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Output Format" />
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  //   meta: {
  //     className: "text-left",
  //     displayName: "Output Format",
  //   },
  // }),
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
  // columnHelper.accessor("Constraints", {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Constraints" />
  //   ),
  //   enableSorting: true,
  //   enableHiding: false,
  //   meta: {
  //     className: "text-left",
  //     displayName: "Constraints",
  //   },
  // }),

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
          <ModalDetails row={row}>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className={`p-2`}
            >
              Delete
            </DropdownMenuItem>
          </ModalDetails>
          <ModalDetails row={row}>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className={`p-2`}
            >
              Update
            </DropdownMenuItem>
          </ModalDetails>
        </DataTableRowActions>
      </div>
    ),
  }),
] as ColumnDef<QuestionsDataProps>[];
