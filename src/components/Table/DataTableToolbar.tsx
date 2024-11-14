"use client";

import { SetUserRound, type SetUserRoundProps, type User } from "@/api/users";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Table } from "@tanstack/react-table";
import { type ApiError } from "next/dist/server/api-utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  // const [rowsPerPage, setRowsPerPage] = useState(10); // State for rows per page
  const pathname = usePathname();
  const { register, handleSubmit, setValue, reset } =
    useForm<SetUserRoundProps>();

  const promoteUsers = useMutation({
    mutationFn: (data: SetUserRoundProps) => {
      return toast.promise(SetUserRound(data), {
        loading: "Promoting Users",
        success: "Success!",
        error: (err: ApiError) => err.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      setIsOpen(false);
    },
    onError: () => {
      console.log("Error occurred while promoting users");
    },
  });

  const OnSubmit = (data: SetUserRoundProps) => {
    const selectedRows = table.getSelectedRowModel().rows;
    const userIds: string[] = selectedRows.map(
      (row) => (row.original as User).ID,
    );

    if (userIds.length > 0) {
      setValue("user_ids", userIds);
      promoteUsers.mutate({ ...data, user_ids: userIds });
    } else {
      console.error("No users selected.");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative w-full">
          <Input
            placeholder="Search"
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="h-8 w-full rounded-[8px] border-[1px] pl-8"
            style={{ boxShadow: "0px 1px 2px 0px #00000014" }}
          />
        </div>
        <div className="ml-2">
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
              {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  Per Page {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {pathname.includes("/users") && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                    <option value={0}>Round 0</option>
                    <option value={1}>Round 1</option>
                    <option value={2}>Round 2</option>
                    <option value={3}>Round 3</option>
                  </select>
                </DialogDescription>
              </DialogHeader>
              <Button onClick={handleSubmit(OnSubmit)}>Continue</Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
