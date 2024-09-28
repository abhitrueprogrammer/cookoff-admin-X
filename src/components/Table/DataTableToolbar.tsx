"use client";

import { Table } from "@tanstack/react-table";

// import { Search } from "@/assets/icons";
import { SetUserRound, SetUserRoundProps, User } from "@/api/users";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Dialog,

  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DataTableViewOptions } from "./DataTableViewOptions";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  // const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SetUserRoundProps>();

  const promoteUsers = useMutation({
    mutationFn: (data: SetUserRoundProps) => {
      return toast.promise(SetUserRound(data), {
        loading: "Promoting Users",
        success: "Success!",
        error: (err: ApiError) => err.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] }); // Adjust if needed
      reset();
      // setIsOpen(false);
    },
    onError: () => {
      console.log("Error occurred while creating test case");
    },
  });


  const OnSubmit = (data: SetUserRoundProps) => {
    console.log("Entered submit");
    const selectedRows = table.getSelectedRowModel().rows;
    console.log(selectedRows);
    const temp: string[] = [];
    for (const i of selectedRows) {
      const x = i.original as User;
      temp.push(x.ID);
    }
  
    setValue("user_ids", temp);
    console.log("HIII324324");

    promoteUsers.mutate(data);
  };

  return (
    <div className="flex items-center justify-between">
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={table.getSelectedRowModel().rows.length === 0}>
            Promote
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="m-3">
            <DialogTitle>
              Are you absolutely sure you want to promote?
            </DialogTitle>
            <DialogDescription>
              <select
                {...register("round")}
                defaultValue={1}
                id="round"
                className="flex justify-center rounded-md border bg-gray-200 p-2 text-black"
              >
                <option value={1}>Round 1</option>
                <option value={2}>Round 2</option>
                <option value={3}>Round 3</option>
              </select>
            </DialogDescription>
          </DialogHeader>
            {/* <DialogClose>Cancel</DialogClose> */}
            <Button
              onClick={
                handleSubmit(OnSubmit)}
            >
              Continue
            </Button>
        </DialogContent>
      </Dialog>

      <div className="flex flex-1 items-center space-x-2">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
            {/* <Search /> */}
          </div>
          <Input
            placeholder="Search"
            value={(table.getColumn("Name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("Name")?.setFilterValue(event.target.value)
            }
            className="h-8 w-full rounded-[8px] border-[1px] pl-8"
            style={{ boxShadow: "0px 1px 2px 0px #00000014" }}
          />
        </div>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-fit rounded-[8px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                Last {pageSize} Month
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
