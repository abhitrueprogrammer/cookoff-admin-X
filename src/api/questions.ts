import { handleAPIError } from "@/lib/error";
import api from ".";
// import { generateSampleData } from "./sampleData";

export interface UpdateQuestionParams {
  id: string;
  description: string;
  title: string;
  input_format: string[];
  points: number;
  round: number;
  constraints: string[];
  output_format: string[];
  sample_test_input: string[];
  sample_test_output: string[];
  sample_explanation: string[];
}

export interface QuestionResponse {
  ID: string;
  Description: string;
  Title: string;
  InputFormat: string[];
  Points: number;
  Round: number;
  Constraints: string[] | null;
  OutputFormat: string[];
  SampleTestInput: string[];
  SampleTestOutput: string[];
  Explanation: string[];
}

export interface CreateQuestionParams {
  description: string;
  title: string;
  input_format: string[];
  points: number;
  round: number;
  constraints: string[];
  output_format: string[];
  sample_test_input: string[];
  sample_test_output: string[];
  sample_explanation: string[];
}

interface DeleteQuestionResponse {
  message: string;
}
// GET REQUEST
export async function GetAllQuestions() {
  try {
    const response = await api.get<QuestionResponse[]>("/questions");
    return response.data;
    // return generateSampleData()
  } catch (e) {
    console.log(e);
    return [];
  }
}

// POST REQUEST
export async function CreateQuestion(data: CreateQuestionParams) {
  try {
    console.log(data);
    const response = await api.post<QuestionResponse>("/question/create", data);
    return response.data;
  } catch (e) {
    console.log(e);
    throw handleAPIError(e);
  }
}

// DELETE REQUEST
export async function DeleteQuestion(id: string) {
  try {
    const response = await api.delete<DeleteQuestionResponse>(
      `/question/${id}`,
    );
    return response.data;
  } catch (e) {
    throw handleAPIError(e);
  }
}

export async function GetQuestionById(id: string) {
  const response = await api.get<QuestionResponse>(`/question/${id}`);
  return response.data;
}

// PATCH REQUEST
export async function UpdateQuestion(data: UpdateQuestionParams) {
  try {
    const response = await api.patch<QuestionResponse>("/question", data);
    return response.data;
  } catch (e) {
    throw handleAPIError(e);
  }
}
