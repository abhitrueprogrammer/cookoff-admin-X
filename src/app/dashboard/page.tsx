"use client";
import { useRef } from "react";

import { GetAllQuestions, QuestionResponse } from "@/api/questions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const submitHandle = async (data: FormData) => {
  console.log(data);
};
export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-end bg-black text-slate-100">
      <div className="m-5 ml-auto">
        <CreateButton></CreateButton>
      </div>
      <div className="m-5 h-2/3 overflow-y-auto">
        <TableDemo></TableDemo>
      </div>
    </div>
  );
}

export function TableDemo() {
  const [questions, setQuestions] = useState<QuestionResponse[]>([]);

  useEffect(() => {
    const getQues = async () => {
      const response = await GetAllQuestions();
      setQuestions(response);
    }; // Assuming this is the function returning a Promise
    getQues();
  }, []);
  return (
    <Table>
      <TableCaption>List of questions added</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Points</TableHead>
          <TableHead>Round</TableHead>
          <TableHead>View More</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map((question) => (
          <TableRow key={question.ID}>
            <TableCell className="font-medium">{question.Title}</TableCell>
            <TableCell>{question.Points}</TableCell>
            <TableCell>{question.Round}</TableCell>
            <TableCell>
              <Button> View More</Button>
            </TableCell>
            <TableCell>
              <MeatBallzMenu></MeatBallzMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

//move to @/components
export function CreateButton() {
  const idRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const inputFormatRef = useRef<HTMLInputElement>(null);
  const pointsRef = useRef<HTMLInputElement>(null);
  const roundRef = useRef<HTMLInputElement>(null);
  const constraintsRef = useRef<HTMLInputElement>(null);
  const outputFormatRef = useRef<HTMLInputElement>(null);
  const [round, setRound] = useState("1");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const questionResponse = {
      ID: idRef.current?.value || "",
      Description: descriptionRef.current?.value || "",
      Title: titleRef.current?.value || "",
      InputFormat: inputFormatRef.current?.value || "",
      Points: Number(pointsRef.current?.value) || 0,
      Round: Number(round) || 0,
      Constraints: constraintsRef.current?.value || "",
      OutputFormat: outputFormatRef.current?.value || "",
    };

    console.log(questionResponse);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-slate-800 text-orange-500 hover:bg-slate-600 hover:text-orange-600"
          variant="outline"
        >
          Create Questions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Question</DialogTitle>
          <DialogDescription>Add questions here</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="OP Question"
                className="col-span-3"
                ref={titleRef}
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
                ref={descriptionRef}
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
                ref={inputFormatRef}
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
                ref={pointsRef}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="round" className="text-right">
                Round
              </Label>
              <Select onValueChange={(value) => setRound(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Round" />
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
                ref={constraintsRef}
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
                ref={outputFormatRef}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function MeatBallzMenu() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-3xl">···</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer hover:bg-orange-100">
            Update
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer bg-red-600 text-white hover:bg-red-500">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
