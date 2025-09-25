"use client";

import {
  type TestCaseResponse,
  type TestCaseUpdateParams,
  UpdateTestCase,
} from "@/api/testcases";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Row } from "@tanstack/react-table";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ModalTestcaseUpdateProps {
  row: Row<TestCaseResponse>;
  children: React.ReactNode;
}

const ModalTestcaseUpdate = ({ row, children }: ModalTestcaseUpdateProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<TestCaseUpdateParams>({
    defaultValues: {
      Input: row.original.Input,
      ExpectedOutput: row.original.ExpectedOutput,
      Memory: String(row.original.Memory),
      Runtime: String(row.original.Runtime),
      Hidden: row.original.Hidden,
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: TestCaseUpdateParams) => {
      const payload: TestCaseUpdateParams = {
        ...data,
        Memory: String(data.Memory),
        Runtime: data.Runtime !== undefined ? String(data.Runtime) : undefined,
        Hidden:
          typeof data.Hidden === "string"
            ? data.Hidden === "true"
            : data.Hidden,
      };

      return toast.promise(UpdateTestCase(row.original.ID, payload), {
        loading: "Updating testcase...",
        success: "Testcase updated successfully!",
        error: (err: unknown) => {
          if (err instanceof Error) return err.message;
          return "Error updating testcase";
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["testcases"] });
      reset();
      setModalOpen(false);
    },
  });

  const onSubmit = (data: TestCaseUpdateParams) => updateMutation.mutate(data);

  return (
    <div className="flex">
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <div className="w-full cursor-pointer rounded-sm p-1 text-left text-sm text-accent hover:bg-slate-200">
            {children}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Test Case</DialogTitle>
            <DialogDescription>Edit the fields and submit</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="input" className="text-right">
                  Input
                </Label>
                <Textarea
                  id="input"
                  placeholder="Test case input"
                  className="col-span-3"
                  {...register("Input")}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="expected_output" className="text-right">
                  Expected Output
                </Label>
                <Textarea
                  id="expected_output"
                  placeholder="Expected output"
                  className="col-span-3"
                  {...register("ExpectedOutput")}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="memory" className="text-right">
                  Memory
                </Label>
                <Input
                  id="memory"
                  type="number"
                  placeholder="Memory limit"
                  className="col-span-3"
                  {...register("Memory")}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="hidden" className="text-right">
                  Hidden
                </Label>
                <select
                  {...register("Hidden")}
                  id="hidden"
                  className="col-span-3 rounded-md border bg-white p-2"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="runtime" className="text-right">
                  Runtime
                </Label>
                <Input
                  id="runtime"
                  type="number"
                  placeholder="Runtime limit"
                  className="col-span-3"
                  {...register("Runtime")}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalTestcaseUpdate;
