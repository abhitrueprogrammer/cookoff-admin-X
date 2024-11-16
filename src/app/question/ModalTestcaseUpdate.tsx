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
import { type ApiError } from "next/dist/server/api-utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ModalTestcaseUpdate = ({
  row,
  children,
}: {
  row: Row<TestCaseResponse>;
  children: React.ReactNode;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<TestCaseUpdateParams>();

  const createQuestion = useMutation({
    mutationFn: (data: TestCaseUpdateParams) => {
      if (typeof data.hidden === "string") {
        data.hidden = data.hidden === "true"; // Convert "true"/"false" to boolean
      }
      data.memory = Number(data.memory);
      data.runtime = Number(data.runtime);
      console.log(data); // Logging for debugging
      return toast.promise(UpdateTestCase(row.original.ID, data), {
        loading: "Updating Testcase",
        success: "Success!",
        error: (err: ApiError) => err.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["testcases"] });
      reset();
      setModalOpen(false);
      // setIsOpen(false);
    },
  });

  const onSubmit = (data: TestCaseUpdateParams) => {
    createQuestion.mutate(data);
  };
  return (
    <div className="flex">
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        {/* <Dialog open={isOpen} onOpenChange={setIsOpen}> */}
        <DialogTrigger asChild>
          <div className="w-full cursor-pointer rounded-sm p-1 text-left text-sm text-accent hover:bg-slate-200">
            {children}
          </div>
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
                  defaultValue={row.original.Input}
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
                  {...register("expected_output")}
                  defaultValue={row.original.ExpectedOutput}
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
                  defaultValue={row.original.Memory}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="hidden" className="text-right">
                  Hidden
                </Label>
                <select
                  {...register("hidden")}
                  id="hidden"
                  className="rounded-md border bg-white p-2"
                  defaultValue={row.original.Hidden.toString()}
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
                  placeholder="Runtime limit"
                  className="col-span-3"
                  defaultValue={row.original.Runtime}
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

export default ModalTestcaseUpdate;
