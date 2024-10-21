"use client";
import { useParams } from "next/navigation";

import {
  GetQuestionById,
  type QuestionResponse,
  UpdateQuestion,
  type UpdateQuestionParams,
} from "@/api/questions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type ApiError } from "next/dist/server/api-utils";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

const CreateButton = () => {
  const params = useParams<{ qid: string }>();

  const router = useRouter();
  const [question, setQuestion] = useState<QuestionResponse>();
  const [description, setDescription] = useState<string>("teri-mummy");
  const queryClient = useQueryClient();
  useEffect(() => {
    void toast.promise(
      GetQuestionById(params.qid).then(async (q) => {
        setQuestion(q);
      }),
      {
        loading: "Getting Question",
        success: "Success!",
        error: (err: ApiError) => err.message,
      },
    );
  }, [params.qid]);
  const { register, handleSubmit, reset } = useForm<UpdateQuestionParams>();
  const createQuestion = useMutation({
    mutationFn: (data: UpdateQuestionParams) => {
      data.id = params.qid;
      data.input_format = data.input_format?.[0]?.split("\n") ?? [];
      data.points = +data.points;
      data.round = +data.round;
      data.constraints = data.constraints?.[0]?.split("\n") ?? [];
      data.output_format = data.output_format?.[0]?.split("\n") ?? [];
      data.sample_test_input = data.sample_test_input?.[0]?.split("\n") ?? [];
      data.sample_test_output = data.sample_test_output?.[0]?.split("\n") ?? [];
      data.sample_explanation = data.sample_explanation?.[0]?.split("\n") ?? [];
      console.log(data);
      return toast.promise(UpdateQuestion(data), {
        loading: "Updating Question",
        success: "Success!",
        error: (err: ApiError) => err.message,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["questions"] });
      reset();
      router.push("/question");
    },
  });

  const onSubmit = (data: UpdateQuestionParams) => {
    createQuestion.mutate(data);
  };

  return (
    <div className="m-10 space-y-10 text-white">
      <h1 className="s-sling font- text-center text-2xl font-bold text-accent">
        Edit Questions
      </h1>
      <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="title"
            className="text-right text-lg font-bold  text-white"
          >
            Title
          </Label>
          <Input
            id="title"
            placeholder="OP Question"
            className="col-span-3"
            defaultValue={question?.Title}
            {...register("title")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="description"
            className="col-span-1 text-right text-lg font-bold text-white"
          >
            Description
          </Label>
          <div className="col-span-3 flex gap-2">
            {/* <Editor /> */}
            <Textarea
              id="description"
              defaultValue={description}
              className="w-full"
              {...register("description")}
              onChange={(e) => setDescription(e.target.value)}
              rows={10}
            ></Textarea>
            <Markdown className="markdown w-full border p-2">
              {description}
            </Markdown>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="input_format"
            className="text-right text-lg font-bold text-white"
          >
            Input Format
          </Label>
          <Textarea
            id="input_format"
            placeholder="3 integers"
            className="col-span-3"
            defaultValue={question?.InputFormat.join("\n")}
            {...register("input_format.0")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="points"
            className="text-right text-lg font-bold text-white"
          >
            Points
          </Label>
          <Input
            id="points"
            type="number"
            placeholder="30"
            className="col-span-3"
            defaultValue={question?.Points}
            {...register("points")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="round"
            className="text-right text-lg font-bold text-white"
          >
            Round
          </Label>
          <select
            {...register("round")}
            defaultValue={question?.Round}
            id="round"
            className="rounded-md border bg-gray-200 p-2 text-black"
          >
            <option value={1}>Round 1</option>
            <option value={2}>Round 2</option>
            <option value={3}>Round 3</option>
          </select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="constraints"
            className="text-right text-lg font-bold text-white"
          >
            Constraints
          </Label>
          <Textarea
            id="constraints"
            placeholder="1 < x < 10"
            className="col-span-3"
            defaultValue={question?.Constraints?.join("\n")}
            {...register("constraints.0")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="output_format"
            className="text-right text-lg font-bold text-white"
          >
            Output Format
          </Label>
          <Textarea
            id="output_format"
            placeholder="Number"
            className="col-span-3"
            defaultValue={question?.OutputFormat.join("\n")}
            {...register("output_format.0")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="sample_test_input"
            className="text-right text-lg font-bold text-white"
          >
            Sample Test Input
          </Label>
          <Textarea
            id="sample_test_input"
            placeholder="Abracadabra"
            className="col-span-3"
            defaultValue={question?.SampleTestOutput.join("\n")}
            {...register("sample_test_input.0")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="sample_test_output"
            className="text-right text-lg font-bold text-white"
          >
            Sample Test Output
          </Label>
          <Textarea
            id="sample_test_output"
            placeholder="Number"
            className="col-span-3"
            defaultValue={question?.SampleTestOutput.join("\n")}
            {...register("sample_test_output.0")}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label
            htmlFor="explanation"
            className="text-right text-lg font-bold text-white"
          >
            Explanation
          </Label>
          <Textarea
            id="explanation"
            placeholder="The why, the who, what, when, the where, and the how"
            className="col-span-3"
            defaultValue={question?.Explanation.join("\n")}
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

export default CreateButton;
