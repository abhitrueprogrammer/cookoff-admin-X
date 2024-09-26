"use client";
import { useRef } from "react";

import {
  CreateQuestion,
  CreateQuestionParams,
  DeleteQuestion,
  GetAllQuestions,
  QuestionResponse,
} from "@/api/questions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { useEffect, useState } from "react";

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
import { ApiError } from "next/dist/server/api-utils";
import router from "next/router";
import toast from "react-hot-toast";

export default function Home() {
  const [questions, setQuestions] = useState<QuestionResponse[]>([]);
  useEffect(() => {
    const getQues = async () => {
      const response = await GetAllQuestions();
      setQuestions(response);
    }; // Assuming this is the function returning a Promise
    void getQues();
  }, []);
  return (
    <div className="flex h-screen flex-col justify-end bg-black text-slate-100">
      <div className="m-5 ml-auto">
        <CreateButton
          questions={questions}
          setQuestions={setQuestions}
        ></CreateButton>
      </div>
      <div className="m-5 h-2/3 overflow-y-auto">
        {/* <TableDemo
          questions={questions}
          setQuestions={setQuestions}
        ></TableDemo> */}
      </div>
    </div>
  );
}

// export function TableDemo({ questions, setQuestions }: CreateButtonProps) {
//   return (
    
//     // <Table>
//     //   <TableCaption>List of questions added</TableCaption>
//     //   <TableHeader>
//     //     <TableRow>
//     //       <TableHead className="w-[100px]">Title</TableHead>
//     //       <TableHead>Points</TableHead>
//     //       <TableHead>Round</TableHead>
//     //       <TableHead>View More</TableHead>
//     //       <TableHead>Action</TableHead>
//     //     </TableRow>
//     //   </TableHeader>
//     //   <TableBody>
//     //     {questions.map((question) => (
//     //       <TableRow key={question.ID}>
//     //         <TableCell className="font-medium">{question.Title}</TableCell>
//     //         <TableCell>{question.Points}</TableCell>
//     //         <TableCell>{question.Round}</TableCell>
//     //         <TableCell>
//     //           <Button> View More</Button>
//     //         </TableCell>
//     //         <TableCell>
//     //           <MeatBallzMenu
//     //             question={question}
//     //             questions={questions}
//     //             setQuestions={setQuestions}
//     //           ></MeatBallzMenu>
//     //         </TableCell>
//     //       </TableRow>
//     //     ))}
//     //   </TableBody>
//     // </Table>
//   );
// }
interface CreateButtonProps {
  questions: QuestionResponse[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionResponse[]>>;
}

interface MeatBallzProps {
  question: QuestionResponse;
  questions: QuestionResponse[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionResponse[]>>;
}
//move to @/components
 const CreateButton = ({ questions, setQuestions }: CreateButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const descriptionRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const inputFormatRef = useRef<HTMLInputElement>(null);
  const pointsRef = useRef<HTMLInputElement>(null);
  const constraintsRef = useRef<HTMLInputElement>(null);
  const outputFormatRef = useRef<HTMLInputElement>(null);
  const [round, setRound] = useState("1");
  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const questionResponse: CreateQuestionParams = {
      description: descriptionRef.current?.value ?? "",
      title: titleRef.current?.value ?? "",
      input_format: inputFormatRef.current?.value ?? "",
      points: Number(pointsRef.current?.value) ?? 0,
      round: Number(round) ?? 0,
      constraints: constraintsRef.current?.value ?? "",
      output_format: outputFormatRef.current?.value ?? "",
    };
    try {
      const newQuestion = await toast.promise(
        CreateQuestion(questionResponse),
        {
          loading: "Adding Question",
          success: "Sucess!",
          error: (err: ApiError) => err.message,
        },
      );
      setQuestions([...questions, newQuestion]);
      setIsOpen(false);
    } catch (err) {
      console.error("Couldn't add question:", err);
    }
    console.log();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        <form onSubmit={handleQuestionSubmit}>
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

 const MeatBallzMenu = ({
  question,
  questions,
  setQuestions,
}: MeatBallzProps) => {
  async function handleDeleteRequest(id: string) {
    try {
      await toast.promise(DeleteQuestion(id), {
        loading: "Deleting Question",
        success: "Sucess!",
        error: (err: ApiError) => err.message,
      });
      setQuestions(
        questions.filter((quest) => 
          quest.ID !== question.ID
        ),
      );
      void router.push("/dashboard");
    } catch (err) {
      console.error("Couldn't delete question:", err);
    }
    console.log();
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-3xl">···</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer p-1 hover:bg-orange-100">
            Update
          </DropdownMenuItem>
          
          <AlertDialog >
            <AlertDialogTrigger className="cursor-pointer bg-red-600  text-white hover:bg-red-500 w-full text-left p-1" >Delete</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    void handleDeleteRequest(question.ID);
                  }}
                  className="cursor-pointer bg-red-600 text-white hover:bg-red-500"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>{" "}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
