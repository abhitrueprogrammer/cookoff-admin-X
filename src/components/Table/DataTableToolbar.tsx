"use client";

import { SetUserRound, SetUserRoundProps, User } from "@/api/users";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";
import { ApiError } from "next/dist/server/api-utils";
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

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="absolute inset-y-0 left-0 flex items-center pl-2"></div>
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
      </div>
    </div>
  );
}
