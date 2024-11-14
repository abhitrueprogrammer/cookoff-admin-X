"use client";

import { DeleteTestCase } from "@/api/testcases";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type ApiError } from "next/dist/server/api-utils";
import toast from "react-hot-toast";

const ModalDelete = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const queryClient = useQueryClient();

  const handleDelete = useMutation({
    mutationFn: (id: string) => {
      return toast.promise(DeleteTestCase(id), {
        loading: "Deleting Testcase",
        success: "Success!",
        error: (err: ApiError) => err.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["testcases"] });
    },
  });

  const onSubmit = () => {
    handleDelete.mutate(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full cursor-pointer rounded-sm bg-red-600 p-1 text-left text-sm text-white hover:bg-red-500">
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            Testcase. Dekh lo.
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
