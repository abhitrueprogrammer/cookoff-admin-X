import { LeaderBoardUser } from "@/api/adminDashboard";
import { DataTableColumnHeader } from "@/components/Table/DataTableColumnHeader";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<LeaderBoardUser>();

export const LeaderBoardDataColumn = [
    // columnHelper.accessor("ID", {
    //     header: ({ column }) => (
    //       <DataTableColumnHeader column={column} title="Round" />
    //     ),
    //     enableSorting: true,
    //     meta: {
    //       className: "text-left",
    //       displayName: "Round",
    //     },
    //   }),
    columnHelper.accessor("Name", {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        enableSorting: true,
        meta: {
          className: "text-center",
          displayName: "Name",
        },
      }),
      columnHelper.accessor("Score", {
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Score" />
        ),
        enableSorting: true,
        meta: {
          className: "text-center",
          displayName: "Score",
        },
      }),
] as ColumnDef<LeaderBoardUser>[];
