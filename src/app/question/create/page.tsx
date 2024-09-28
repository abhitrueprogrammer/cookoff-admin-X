"use client";

import { CreateQuestion, CreateQuestionParams } from "@/api/questions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./editor"), { ssr: false });

// import "@blocknote/mantine/style.css";

import { ApiError } from "next/dist/server/api-utils";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { getData } from "./editor";
// interface CreateButtonProps {
//     questions: QuestionResponse[];
//     setQuestions: React.Dispatch<React.SetStateAction<QuestionResponse[]>>;
//   }

const Create = () => {
  // const editor = useCreateBlockNote();
  const router = useRouter();

  const queryClient = useQueryClient();
  // Creates a new editor instance.
  // const editor = useCreateBlockNote();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateQuestionParams>();

  const createQuestion = useMutation({
    mutationFn: async (data: CreateQuestionParams) => {
      // if (editor) {

      const markdown = await getData();
      if (markdown) {
        data.description = markdown;
      }
      // }
      data.input_format = data.input_format?.[0]?.split("\n") ?? [];
      data.points = +data.points;
      data.round = +data.round;
      // data.Round = 1;
      data.constraints = data.constraints?.[0]?.split("\n") ?? [];
      data.output_format = data.output_format?.[0]?.split("\n") ?? [];
      data.sample_test_input = data.sample_test_input?.[0]?.split("\n") ?? [];
      data.sample_test_output = data.sample_test_output?.[0]?.split("\n") ?? [];
      data.sample_explanation = data.sample_explanation?.[0]?.split("\n") ?? [];
      console.log(data.sample_explanation);
      return toast.promise(CreateQuestion(data), {
        loading: "Adding Question",
        success: "Success!",
        error: (err: ApiError) => err.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["questions"] });
      reset();
      router.push("/question");
    },
    onError: () => {
      console.log("out of syllabus");
    },
  });

  const onSubmit = (data: CreateQuestionParams) => {
    createQuestion.mutate(data);
  };

  return (
    <div className="m-10 space-y-10 text-white">
      <div className="flex items-center">
        <Button
          onClick={() => {
            router.push("/dashboard");
          }}
          className="bg-bb hover:bg-slate-950"
        >
          <FaHome size={20} className="text-white"></FaHome>
        </Button>
        <h1 className="s-sling font- flex-grow text-center text-2xl font-bold text-accent">
          Add Questions
        </h1>
      </div>
      <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="title"
            className="text-right text-lg font-bold text-primary"
          >
            Title
          </Label>
          <Input
            id="title"
            placeholder="OP Question"
            className="col-span-3"
            {...register("title")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="description"
            className="col-span-1 text-right text-lg font-bold text-primary"
          >
            Description
          </Label>
          {/* <Editor  editor={editor}  /> */}
          <Editor />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="input_format"
            className="text-right text-lg font-bold text-primary"
          >
            Input Format
          </Label>
          <Textarea
            id="input_format"
            placeholder="3 integers"
            className="col-span-3"
            {...register("input_format.0")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="points"
            className="text-right text-lg font-bold text-primary"
          >
            Points
          </Label>
          <Input
            id="points"
            type="number"
            placeholder="30"
            className="col-span-3"
            {...register("points")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="round"
            className="text-right text-lg font-bold text-primary"
          >
            Round
          </Label>
          <select
            {...register("round")}
            defaultValue={1}
            id="round"
            className="rounded-md border bg-gray-200 p-2 text-black"
          >
            <option value={0}>Round 0</option>
            <option value={1}>Round 1</option>
            <option value={2}>Round 2</option>
            <option value={3}>Round 3</option>
          </select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="constraints"
            className="text-right text-lg font-bold text-primary"
          >
            Constraints
          </Label>
          <Textarea
            id="constraints"
            placeholder="1 < x < 10"
            className="col-span-3"
            {...register("constraints.0")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="output_format"
            className="text-right text-lg font-bold text-primary"
          >
            Output Format
          </Label>
          <Textarea
            id="output_format"
            placeholder="Number"
            className="col-span-3"
            {...register("output_format.0")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="sample_test_output"
            className="text-right text-lg font-bold text-primary"
          >
            Sample Test Output
          </Label>
          <Textarea
            id="sample_test_output"
            placeholder="Number"
            className="col-span-3"
            {...register("sample_test_output.0")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="sample_test_input"
            className="text-right text-lg font-bold text-primary"
          >
            Sample Test Input
          </Label>
          <Textarea
            id="sample_test_input"
            placeholder="Abracadabra"
            className="col-span-3"
            {...register("sample_test_input.0")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="explanation"
            className="text-right text-lg font-bold text-primary"
          >
            Explanation
          </Label>
          <Textarea
            id="explanation"
            placeholder="The why, the who, what, when, the where, and the how"
            className="col-span-3"
            {...register("sample_explanation.0")}
          />
        </div>

        <Button className="ml-auto flex" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Create;
