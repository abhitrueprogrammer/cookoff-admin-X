"use client";

import { CreateTestCase, type CreateTestCaseParams } from "@/api/testcases";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateTestcaseButton = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<CreateTestCaseParams>();

  const createTestCase = useMutation({
    mutationFn: (data: CreateTestCaseParams) => {
      const hidden =
        typeof data.hidden === "string"
          ? data.hidden === "true"
          : !!data.hidden;

      const payload = {
        expected_output: data.expected_output,
        input: data.input,
        memory: data.memory ? String(data.memory) : "0",
        runtime: data.runtime ? String(data.runtime) : "0",
        hidden,
        question_id: id,
      };

      console.log("Payload sent to backend:", payload);

      return toast.promise(CreateTestCase(payload), {
        loading: "Adding Test Case",
        success: "Test Case added successfully!",
        error: (err: unknown) =>
          err instanceof Error ? err.message : "Error creating testcase",
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["testcases"] });
      reset();
      setIsOpen(false);
    },
    onError: () => {
      console.log("Error occurred while creating test case");
    },
  });

  const onSubmit = (data: CreateTestCaseParams) => {
    createTestCase.mutate(data);
  };

  return (
    <div className="flex">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="m-1 ml-auto bg-white text-orange-500 hover:bg-slate-200 hover:text-orange-600"
            variant="outline"
          >
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Test Case</DialogTitle>
            <DialogDescription>Add test cases here</DialogDescription>
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
                  {...register("input")}
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
                  {...register("expected_output", { required: true })}
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
                  {...register("memory")}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="hidden" className="text-right">
                  Hidden
                </Label>
                <select
                  {...register("hidden")}
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
                  {...register("runtime")}
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

export default CreateTestcaseButton;
