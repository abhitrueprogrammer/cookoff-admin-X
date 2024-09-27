import { User } from "@/api/users";
import { DataTableColumnHeader } from "@/components/Table/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<User>();

export const UserDataColumn = [

    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },


  columnHelper.accessor("Name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Name",
    },
  }),

  columnHelper.accessor("RegNo", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RegNo" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "RegNo",
    },
  }),
  columnHelper.accessor("Email", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Email",
    },
  }),
  columnHelper.accessor("RoundQualified", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Round" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Round",
    },
  }),
  columnHelper.accessor("Score", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Score",
    },
  }),
  columnHelper.display(
    {
        id:"roast",
        header:"Roast/Unroast",
        enableSorting: false,
        enableHiding: true,
        meta: 
        {
            className: "text-center",
            displayName: "roast",
        },
        cell: ({row}) => 
        (
            <div>
                {row.original.IsBanned ?
                <div><Button>Roast</Button></div>
                : <div><Button>Unroast</Button> </div>
            }
            </div>
        )

    }
  )
] as ColumnDef<User>[];
// name reg email round score roast/unroast

// columnHelper.display({
//     id: "view-more",
//     header: "View More",
//     enableSorting: false,
//     enableHiding: true,
//     meta: {
//       className: "text-center",
//       displayName: "view-more",
//     },
//     cell: ({ row }) => (
//       <div className="flex justify-center gap-2">
//         <ModalDetails row={row}>
//           <Button className="px-2 py-1">View More Details</Button>
//         </ModalDetails>
//       </div>
//     ),
//   }),