// import { CreateQuestion, CreateQuestionParams } from "@/api/questions";
import { Button } from "@/components/ui/button";
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
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { ApiError } from "next/dist/server/api-utils";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";

import {useRouter} from 'next/navigation'
// interface CreateButtonProps {
//     questions: QuestionResponse[];
//     setQuestions: React.Dispatch<React.SetStateAction<QuestionResponse[]>>;
//   }

const CreateButton = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Button className="bg-slate-800 text-orange-500 m-2 hover:bg-slate-600 hover:text-orange-600"
     onClick={()=>{router.push('/question/create')}}>{children}</Button>
  );
};

export default CreateButton;
