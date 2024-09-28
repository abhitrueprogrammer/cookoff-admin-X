// import { CreateQuestion, CreateQuestionParams } from "@/api/questions";


import { CreateTestCase, CreateTestCaseParams } from "@/api/testcases"; // Update import
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
import { ApiError } from "next/dist/server/api-utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateTestcaseButton = ({ id, children }: { id:string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTestCaseParams>();

  const createTestCase = useMutation({
    mutationFn: (data: CreateTestCaseParams) => {
        data.question_iD = id;
        if (typeof data.hidden === "string") {
            data.hidden = data.hidden === "true"; // Convert "true"/"false" to boolean
        }
        data.memory = Number(data.memory);
        data.runtime = Number(data.runtime);
        console.log(data); // Logging for debugging
      return toast.promise(CreateTestCase(data), {
        loading: "Adding Test Case",
        success: "Success!",
        error: (err: ApiError) => err.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["testcases"] }); // Adjust if needed
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
                  {...register("expected_output")}
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
                  className="rounded-md border bg-white p-2"
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




// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { ApiError } from "next/dist/server/api-utils";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// // interface CreateButtonProps {
// //     questions: QuestionResponse[];
// //     setQuestions: React.Dispatch<React.SetStateAction<QuestionResponse[]>>;
// //   }

// const CreateTestcaseButton = ({ children }: { children: React.ReactNode }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const queryClient = useQueryClient();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<CreateQuestionParams>();

//   const createQuestion = useMutation({
//     mutationFn:  (data: CreateQuestionParams) => {
//       data.input_format = data.input_format?.[0]?.split("\n") ?? [];
//       data.points = +data.points;
//       data.round = +data.round;
//       // data.Round = 1;

//       data.constraints = data.constraints?.[0]?.split("\n") ?? [];
//       data.output_format = data.output_format?.[0]?.split("\n") ?? [];
//       data.sample_test_input = data.sample_test_input?.[0]?.split("\n") ?? [];
//       data.sample_test_output = data.sample_test_output?.[0]?.split("\n") ?? [];
//       console.log(data)
//       return toast.promise(CreateQuestion(data), {
//         loading: "Adding Question",
//         success: "Success!",
//         error: (err: ApiError) => err.message,
//       });
//     },
//     onSuccess: async () => {
//        await queryClient.invalidateQueries({ queryKey: ["questions"] });
//       reset();
//       setIsOpen(false);
//     },
//     onError: () => { console.log("out of syllabus")},
//   });

//   const onSubmit = (data: CreateQuestionParams) => {
//     createQuestion.mutate(data);
//   };

//   return (
//     <div className="flex">
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button
//           className="bg-white ml-auto m-1 text-orange-500 hover:bg-slate-200 hover:text-orange-600"
//           variant="outline"
//         >
//           {children}
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Create Question</DialogTitle>
//           <DialogDescription>Add questions here</DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-2">
//               <Label htmlFor="title" className="text-right">
//                 Title
//               </Label>
//               <Input
//                 id="title"
//                 placeholder="OP Question"
//                 className="col-span-3"
//                 {...register("title")}
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-2">
//               <Label htmlFor="description" className="text-right">
//                 Description
//               </Label>
//               <Textarea
//                 id="description"
//                 placeholder="yada-yada"
//                 className="col-span-3"
//                 {...register("description")}
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-2">
//               <Label htmlFor="input_format" className="text-right">
//                 Input Format
//               </Label>
//               <Textarea
//                 id="input_format"
//                 placeholder="3 integers"
//                 className="col-span-3"
//                 {...register("input_format.0")}
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-2">
//               <Label htmlFor="points" className="text-right">
//                 Points
//               </Label>
//               <Input
//                 id="points"
//                 type="number"
//                 placeholder="30"
//                 className="col-span-3"
//                 {...register("points")}
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-2">
//               <Label htmlFor="round" className="text-right">
//                 Round
//               </Label>
//               <select
//                 {...register("round")}
//                 defaultValue={1}
//                 id="round"
//                 className="rounded-md border bg-white p-2"
//               >
//                 <option value={1}>Round 1</option>
//                 <option value={2}>Round 2</option>
//                 <option value={3}>Round 3</option>
//               </select>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-2">
//               <Label htmlFor="constraints" className="text-right">
//                 Constraints
//               </Label>
//               <Textarea
//                 id="constraints"
//                 placeholder="1 < x < 10"
//                 className="col-span-3"
//                 {...register("constraints.0")}
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-2">
//               <Label htmlFor="output_format" className="text-right">
//                 Output Format
//               </Label>
//               <Textarea
//                 id="output_format"
//                 placeholder="Number"
//                 className="col-span-3"
//                 {...register("output_format.0")}
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-2">
//               <Label htmlFor="sample_test_output" className="text-right">
//                 Sample Test Output
//               </Label>
//               <Textarea
//                 id="sample_test_output"
//                 placeholder="Number"
//                 className="col-span-3"
//                 {...register("sample_test_output.0")}
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-2">
//               <Label htmlFor="sample_test_input" className="text-right">
//                 Sample Test Input
//               </Label>
//               <Textarea
//                 id="sample_test_input"
//                 placeholder="Abracadabra"
//                 className="col-span-3"
//                 {...register("sample_test_input.0")}
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-2">
//               <Label htmlFor="explanation" className="text-right">
//                 Explanation
//               </Label>
//               <Textarea
//                 id="explanation"
//                 placeholder="The why, the who, what, when, the where, and the how"
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="submit">Submit</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//     </div>
//   );
// };

// export default CreateTestcaseButton;