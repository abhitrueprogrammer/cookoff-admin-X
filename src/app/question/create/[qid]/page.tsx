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

  const [sampleInputs, setSampleInputs] = useState<string[]>([""]);
  const [sampleOutputs, setSampleOutputs] = useState<string[]>([""]);
  const [explanations, setExplanations] = useState<string[]>([""]);
  const [inputFormats, setInputFormats] = useState<string[]>([""]);
  const queryClient = useQueryClient();
  const handleInputChange = (index: number, value: string, type: string) => {
    if (type === "input") {
      const newInputs = [...sampleInputs];
      newInputs[index] = value;
      setSampleInputs(newInputs);
    } else if (type === "output") {
      const newOutputs = [...sampleOutputs];
      newOutputs[index] = value;
      setSampleOutputs(newOutputs);
    } else if (type === "explanation") {
      const newExplanations = [...explanations];
      newExplanations[index] = value;
      setExplanations(newExplanations);
    } else if (type === "format") {
      const newFormats = [...inputFormats];
      newFormats[index] = value;
      setInputFormats(newFormats);
    }
  };

  const deleteEntry = (index: number, type: string) => {
    if (type === "input") {
      setSampleInputs(sampleInputs.filter((_, i) => i !== index));
    } else if (type === "output") {
      setSampleOutputs(sampleOutputs.filter((_, i) => i !== index));
    } else if (type === "explanation") {
      setExplanations(explanations.filter((_, i) => i !== index));
    } else if (type === "format") {
      setInputFormats(inputFormats.filter((_, i) => i !== index));
    }
  };

  const { setValue, register, handleSubmit, reset } =
    useForm<UpdateQuestionParams>();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const q = await GetQuestionById(params.qid);

        setQuestion(q);
        setDescription(q.Description);
        setExplanations(q.Explanation);
        setInputFormats(q.InputFormat);
        setSampleOutputs(q.SampleTestOutput);
        setSampleInputs(q.SampleTestInput);

        if (q.Constraints) {
          setValue("constraints.0", q.Constraints.join("\n"));
        }
        if (q.OutputFormat) {
          setValue("output_format.0", q.OutputFormat.join("\n"));
        }
        if (q.Round) {
          setValue("round", q.Round);
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    void fetchQuestion();
  }, [params.qid, setValue]);

  const createQuestion = useMutation({
    mutationFn: (data: UpdateQuestionParams) => {
      data.id = params.qid;
      data.input_format = inputFormats;
      data.points = +data.points;
      data.round = +data.round;
      data.constraints = data.constraints?.[0]?.split("\n") ?? [];
      data.output_format = data.output_format?.[0]?.split("\n") ?? [];
      data.sample_test_input = sampleInputs;
      data.sample_test_output = sampleOutputs;
      data.sample_explanation = explanations;
      console.log("data", data);
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
  const addSampleInput = () => {
    setSampleInputs([...sampleInputs, ""]);
  };

  const addSampleOutput = () => {
    setSampleOutputs([...sampleOutputs, ""]);
  };

  const addExplanation = () => {
    setExplanations([...explanations, ""]);
  };

  const addInputFormat = () => {
    setInputFormats([...inputFormats, ""]);
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
            className="text-right text-lg font-bold text-white"
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
              defaultValue={question?.Description}
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
        {/* Input Format Section */}
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="flex flex-row items-center justify-end gap-2">
            <Label
              htmlFor="input_format"
              className="col-span-3 whitespace-nowrap text-right text-lg font-bold text-white"
            >
              Input Format
            </Label>
            <Button type="button" onClick={addInputFormat}>
              +
            </Button>
          </div>
          <div className="col-span-3 flex w-full flex-col gap-2">
            {inputFormats.map((format, index) => (
              <div key={index} className="flex items-center gap-2">
                <Textarea
                  value={format}
                  placeholder="3 integers"
                  className="col-span-3"
                  onChange={(e) =>
                    handleInputChange(index, e.target.value, "format")
                  }
                />
                <Button
                  type="button"
                  onClick={() => deleteEntry(index, "format")}
                  className="text-red-500"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="grid grid-cols-4 items-center gap-4">
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
        </div> */}
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
        {/* Sample Test Output Section */}
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="flex flex-row items-center justify-end gap-2">
            <Label
              htmlFor="sample_test_output"
              className="whitespace-nowrap text-right text-lg font-bold text-white"
            >
              Sample Test Output
            </Label>
            <Button type="button" onClick={addSampleOutput}>
              +
            </Button>
          </div>
          <div className="col-span-3 flex w-full flex-col gap-2">
            {sampleOutputs.map((output, index) => (
              <div key={index} className="flex items-center gap-2">
                <Textarea
                  value={output}
                  placeholder="Number"
                  className="w-full"
                  onChange={(e) =>
                    handleInputChange(index, e.target.value, "output")
                  }
                />
                <Button
                  type="button"
                  onClick={() => deleteEntry(index, "output")}
                  className="text-red-500"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Test Input Section */}
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="flex flex-row items-center justify-end gap-2">
            <Label
              htmlFor="sample_test_input"
              className="whitespace-nowrap text-right text-lg font-bold text-white"
            >
              Sample Test Input
            </Label>
            <Button type="button" onClick={addSampleInput}>
              +
            </Button>
          </div>
          <div className="col-span-3 flex w-full flex-col gap-2">
            {sampleInputs.map((input, index) => (
              <div key={index} className="flex items-center gap-2">
                <Textarea
                  value={input}
                  placeholder="Input"
                  className="w-full"
                  onChange={(e) =>
                    handleInputChange(index, e.target.value, "input")
                  }
                />
                <Button
                  type="button"
                  onClick={() => deleteEntry(index, "input")}
                  className="text-red-500"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Explanation Section */}
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="flex flex-row items-center justify-end gap-2">
            <Label
              htmlFor="sample_explanation"
              className="whitespace-nowrap text-right text-lg font-bold text-white"
            >
              Sample Explanation
            </Label>
            <Button type="button" onClick={addExplanation}>
              +
            </Button>
          </div>
          <div className="col-span-3 flex w-full flex-col gap-2">
            {explanations.map((explanation, index) => (
              <div key={index} className="flex items-center gap-2">
                <Textarea
                  value={explanation}
                  placeholder="Explanation"
                  className="w-full"
                  onChange={(e) =>
                    handleInputChange(index, e.target.value, "explanation")
                  }
                />
                <Button
                  type="button"
                  onClick={() => deleteEntry(index, "explanation")}
                  className="text-red-500"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button className="ml-auto flex" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateButton;
