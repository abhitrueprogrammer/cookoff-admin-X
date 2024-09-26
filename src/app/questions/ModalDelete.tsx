"use client";

import { type Row } from "@tanstack/react-table";
import { useState } from "react";
import { type QuestionsDataProps } from "./questions-columns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteQuestion } from "@/api/questions";
import { ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface questionDelete
{
    id: string
}
const ModalDelete = ({
  row,
  children,
  id,
}: {
  row: Row<QuestionsDataProps>;
  children: React.ReactNode;
  id: string;
}) => {
    const queryClient = useQueryClient()



    const handleDelete = useMutation({
        mutationFn: (id: string) => {
          return toast.promise(
              DeleteQuestion(id),
              {
                loading: "Adding Question",
                success: "Success!",
                error: (err: ApiError) => err.message,
              })},
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["questions"] })
      
        },
        onError: () => {
          }
          })
      
      const onSubmit = () => {
        handleDelete.mutate(id)
      }
  

    
  async function handleDeleteRequest(id: string) {
    try {
      console.log(id);
      await toast.promise(DeleteQuestion(id), {
        loading: "Deleting Question",
        success: "Sucess!",
        error: (err: ApiError) => err.message,
      });
    } catch (err) {
      console.error("Couldn't delete question:", err);
    }
    console.log();
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full cursor-pointer text-sm rounded-sm bg-red-600 p-1 text-left text-white hover:bg-red-500">
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onSubmit}
            className="cursor-pointer bg-red-600 text-white hover:bg-red-500"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalDelete;
