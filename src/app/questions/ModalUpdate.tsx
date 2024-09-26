"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { type Row } from "@tanstack/react-table";
import { FormEvent, useState } from "react";
import { type QuestionsDataProps } from "./questions-columns";
import { useQueryClient } from "@tanstack/react-query";



const ModalUpdate = ({
  row,
  children,
}: {
  row: Row<QuestionsDataProps>;
  children: React.ReactNode;
}) => {
    const queryClient = useQueryClient()

  const [isModalOpen, setModalOpen] = useState(false);
  console.log(row.original);
  function updateHandler(event: FormEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger className="ml-1 w-full cursor-pointer rounded-sm text-left text-sm">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
          <DialogDescription>Edit the fields</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="OP Question"
                className="col-span-3"
                defaultValue={row.original.Title}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discription" className="text-right">
                Discription
              </Label>
              <Input
                id="discription"
                placeholder="yada-yada"
                className="col-span-3"
                defaultValue={row.original.Description}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="input_format" className="text-right">
                Input Format
              </Label>
              <Input
                id="input_format"
                placeholder="3 integers"
                className="col-span-3"
                defaultValue={row.original.InputFormat}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="points" className="text-right">
                Points
              </Label>
              <Input
                id="points"
                type="number"
                placeholder="30"
                className="col-span-3"
                defaultValue={row.original.Points}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="round" className="text-right">
                Round
              </Label>
              {/* <Select onValueChange={(value) => setRound(value)}> */}

              <Select defaultValue={row.original.Round.toString()}>
                <SelectTrigger className="w-[180px]">
                     <SelectValue  placeholder="Round" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="constrains" className="text-right">
                Constrains
              </Label>
              <Input
                id="constrains"
                placeholder="1 < x < 10"
                className="col-span-3"
                defaultValue={row.original.Constraints}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="output_format" className="text-right">
                Output Format
              </Label>
              <Input
                id="output_format"
                placeholder="Number"
                className="col-span-3"
                defaultValue={row.original.OutputFormat}
              />
            </div>
          </div>{" "}
        </div>
        <DialogFooter>
          <Button type="submit" onSubmit={updateHandler}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdate;
