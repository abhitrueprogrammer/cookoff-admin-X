import { Button } from "@/components/ui/button"
import {useRouter} from "next/navigation"

const  ModalUpdate = ({id, children}: {id:string, children: React.ReactNode;}) =>
{
  const router = useRouter()
  console.log(id)
  return(<Button className="bg-white text-black hover:bg-gray-100 w-full pl-0" onClick={()=>{router.push(`/question/create/${id}`)}}>{children}</Button>)

}

export default ModalUpdate;

// "use client";

// import { UpdateQuestion, type UpdateQuestionParams } from "@/api/questions";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@radix-ui/react-label";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { type Row } from "@tanstack/react-table";
// import { ApiError } from "next/dist/server/api-utils";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import { type QuestionsDataProps } from "./questions-columns";

// const ModalUpdate = ({
//   id,
//   row,
//   children,
// }: {
//   id: string;
//   row: Row<QuestionsDataProps>;
//   children: React.ReactNode;
// }) => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   //   console.log(row.original);
//   //   function updateHandler(event: FormEvent<HTMLButtonElement>): void {
//   //     throw new Error("Function not implemented.");
//   //   }
//   // const [isOpen, setIsOpen] = useState(false);
//   const queryClient = useQueryClient();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<UpdateQuestionParams>();

//   const createQuestion = useMutation({
//     mutationFn: (data: UpdateQuestionParams) => {
//       data.id = id;
//       data.input_format = data.input_format?.[0]?.split("\n") ?? [];
//       data.points = +data.points;
//       data.round = +data.round;
//       // data.Round = 1;

//       data.constraints = data.constraints?.[0]?.split("\n") ?? [];
//       data.output_format = data.output_format?.[0]?.split("\n") ?? [];
//       data.sample_test_input = data.sample_test_input?.[0]?.split("\n") ?? [];
//       data.sample_test_output = data.sample_test_output?.[0]?.split("\n") ?? [];
//       data.explanation = data.explanation?.[0]?.split("\n") ?? [];
//       console.log(data);
//       return toast.promise(UpdateQuestion(data), {
//         loading: "Updating Question",
//         success: "Success!",
//         error: (err: ApiError) => err.message,
//       });
//     },
//     onSuccess: async () => {
//       await queryClient.invalidateQueries({ queryKey: ["questions"] });
//       reset();
//       // setIsOpen(false);
//     },
//   });

//   const onSubmit = (data: UpdateQuestionParams) => {
//     createQuestion.mutate(data);
//   };
//   return (
//     <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
//       <DialogTrigger className="ml-1 w-full cursor-pointer rounded-sm text-left text-sm">
//         {children}
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <DialogHeader>
//             <DialogTitle>{children}</DialogTitle>
//             <DialogDescription>Edit the fields</DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="title" className="text-right">
//                   Title
//                 </Label>
//                 <Input
//                   id="title"
//                   placeholder="OP Question"
//                   className="col-span-3"
//                   {...register("title")}
//                   defaultValue={row.original.Title}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-2">
//                 <Label htmlFor="description" className="text-right">
//                   Description
//                 </Label>
//                 <Textarea
//                   id="description"
//                   placeholder="yada-yada"
//                   className="col-span-3"
//                   {...register("description")}
//                   defaultValue={row.original.Description}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-2">
//                 <Label htmlFor="input_format" className="text-right">
//                   Input Format
//                 </Label>
//                 <Textarea
//                   id="input_format"
//                   placeholder="3 integers"
//                   className="col-span-3"
//                   {...register("input_format.0")}
//                   defaultValue={row.original.InputFormat}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-2">
//                 <Label htmlFor="points" className="text-right">
//                   Points
//                 </Label>
//                 <Input
//                   id="points"
//                   type="number"
//                   placeholder="30"
//                   className="col-span-3"
//                   {...register("points")}
//                   defaultValue={row.original.Points}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-2">
//                 <Label htmlFor="round" className="text-right">
//                   Round
//                 </Label>
//                 <select
//                   {...register("round")}
//                   defaultValue={row.original.Round}
//                   id="round"
//                   className="rounded-md border bg-white p-2"
//                 >
//                   <option value={1}>Round 1</option>
//                   <option value={2}>Round 2</option>
//                   <option value={3}>Round 3</option>
//                 </select>
//               </div>
//               <div className="grid grid-cols-4 items-center gap-2">
//                 <Label htmlFor="constraints" className="text-right">
//                   Constraints
//                 </Label>
//                 <Textarea
//                   id="constraints"
//                   placeholder="1 < x < 10"
//                   className="col-span-3"
//                   defaultValue={row.original.Constraints?.join("\n")}
//                   {...register("constraints.0")}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-2">
//                 <Label htmlFor="output_format" className="text-right">
//                   Output Format
//                 </Label>
//                 <Textarea
//                   id="output_format"
//                   placeholder="Number"
//                   className="col-span-3"
//                   defaultValue={row.original.OutputFormat}
//                   {...register("output_format.0")}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-2">
//                 <Label htmlFor="sample_test_output" className="text-right">
//                   Sample Test Output
//                 </Label>
//                 <Textarea
//                   id="sample_test_output"
//                   placeholder="Number"
//                   className="col-span-3"
//                   // defaultValue={row.original.SampleTestOutput}

//                   {...register("sample_test_output.0")}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-2">
//                 <Label htmlFor="sample_test_input" className="text-right">
//                   Sample Test Input
//                 </Label>
//                 <Textarea
//                   id="sample_test_input"
//                   placeholder="Abracadabra"
//                   className="col-span-3"
//                   {...register("sample_test_input.0")}
//                   // defaultValue={row.original.SampleTestInput}
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-2">
//                 <Label htmlFor="explanation" className="text-right">
//                   Explanation
//                 </Label>
//                 <Textarea
//                   id="explanation"
//                   placeholder="The why, the who, what, when, the where, and the how"
//                   className="col-span-3"
//                   {...register("explanation.0")}
//                   // defaultValue={row.original.Explanation}
//                 />
//               </div>
//             </div>{" "}
//           </div>
//           <DialogFooter>
//             <Button type="submit">Save changes</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ModalUpdate;
