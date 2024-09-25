//Refer GET request and POST request from ./getTODO.ts and ./createPost.ts

//Define API related interfaces here

//Done CreateQuestion

//UpdateQuestion

//done DeleteQuestion

//done GetAllQuestions

//done GetQuestionById


import api from ".";
export interface QuestionResponse {
  ID: string;
  Description: string;
  Title: string;
  InputFormat: string;
  Points: number;
  Round: number;
  Constraints: string;
  OutputFormat: string;
}
interface UpdateQuestionParams {
  id: string; // ID of the question to update
  description?: string; // Optional fields for updating
}

export interface CreateQuestionParams {
  description: string;
  title: string;
  input_format: string;
  points: number;
  round: number;
  constraints: string;
  output_format: string;
}
interface DeleteQuestionResponse {
  message: string;
}
// GET REQUEST
export async function GetAllQuestions() {
  try
  {
    const response = await api.get<QuestionResponse[]>("/questions");
    return response.data;

  }
  catch(e)
  {
    console.log(e);
    return []
  }
}




// POST REQUEST
export async function CreateQuestion(data: CreateQuestionParams) {
  const response = await api.post<QuestionResponse>("/question/create", data);
  return response.data;
}


// DELETE REQUEST
export async function DeleteQuestion(id: string) {
  const response = await api.delete<DeleteQuestionResponse>(`/question/${id}`);
  return response.data;
}

export async function GetQuestionById(id: string) {
  const response = await api.get<QuestionResponse>(`/question/${id}`);
  return response.data;
}




// PATCH REQUEST
export async function UpdateQuestion(data: UpdateQuestionParams) {
  const response = await api.patch<QuestionResponse>("/question", data);
  return response.data;
}
