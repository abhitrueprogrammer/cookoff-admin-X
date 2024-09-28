import { Roast, User } from "@/api/users";
import { DataTableColumnHeader } from "@/components/Table/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ApiError } from "next/dist/server/api-utils";
import { FaCrown } from "react-icons/fa6";

import toast from "react-hot-toast";
import BanBtn from "./user-ban";

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
        cell: ({ row }) => (
        <div className="flex gap-2">
            {row.original.Role === "admin" && <FaCrown size={16} />}
            {row.getValue("Name")}
        </div>
        ),
        enableSorting: true,
        enableHiding: false,
        meta: {
        className: "text-left",
        displayName: "Name",
        },
    }),
//   columnHelper.accessor("Name", {
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Name" />
//     ),
//     enableSorting: true,
//     meta: {
//       className: "text-left",
//       displayName: "Name",
//     },
//   }),

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
  columnHelper.display({
    id: "roast",
    header: "Roast/Unroast",
    enableSorting: false,
    enableHiding: true,
    meta: {
      className: "text-center",
      displayName: "roast",
    },
    cell: ({ row, table }) => (
      <div>
        <BanBtn row={row}></BanBtn>
        {/* <PromoteButton table={table}></PromoteButton> */}
        {/* {row.original.IsBanned ?
                <div><Button >Unroast</Button></div>
                : <div><Button onClick={()=>{Ban(row.original.ID)}}>Roast</Button> </div>
            } */}
      </div>
    ),
  }),
] as ColumnDef<User>[];

function Ban(id: string) {
  const queryClient = useQueryClient();
  const handleBan = useMutation({
    mutationFn: (id: string) => {
      return toast.promise(Roast(id), {
        loading: "Roasting...",
        success: "Roast success",
        error: (err: ApiError) => err.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  handleBan.mutate(id);
}
// const queryClient = useQueryClient()

// const handleDelete = useMutation({
//     mutationFn: (id: string) => {
//       return toast.promise(
//           DeleteQuestion(id),
//           {
//             loading: "Deleting Question",
//             success: "Success!",
//             error: (err: ApiError) => err.message,
//           })},
//      onSuccess: async () => {
//       await queryClient.invalidateQueries({ queryKey: ["questions"] })

//     },

//       })

//   const onSubmit = () => {
//     handleDelete.mutate(id)
//   }

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
