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
import toast from "react-hot-toast";

interface ModalDeleteProps {
  children: React.ReactNode;
  id: string;
  questionID?: string;
}

const ModalDelete = ({ children, id, questionID }: ModalDeleteProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (testCaseID: string) =>
      toast.promise(DeleteTestCase(testCaseID), {
        loading: "Deleting Testcase...",
        success: "Testcase deleted successfully!",
        error: (err: unknown) => {
          if (err instanceof Error) return err.message;
          return "Error updating testcase";
        },
      }),
    onSuccess: async () => {
      if (questionID) {
        await queryClient.invalidateQueries({
          queryKey: ["testcases", questionID],
        });
      } else {
        await queryClient.invalidateQueries({ queryKey: ["testcases"] });
      }
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(id);
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
            testcase.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
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
