import { handleAPIError } from "@/lib/error";
import api from ".";

export interface TestCaseResponse {
    ID: string;
    ExpectedOutput: string;
    Memory: number;
    Input: string;
    Hidden: boolean;
    QuestionID: string;
    Runtime: number;
  }
  export interface getTestcaseByQuestion
  {
    data: TestCaseResponse[],
    message: string
  }
export  interface CreateTestCaseParams {
    expected_output: string;
    memory: number;
    input: string;
    hidden: boolean;
    runtime: number | null;
    question_iD: string;
  }
  export async function CreateTestCase(data: CreateTestCaseParams) {
    try {
      console.log("Given data" + JSON.stringify(data))
      const response = await api.post<CreateTestCaseParams>("/testcase", data);
      return response.data;
    } catch (e) {
  
      console.log(e)
      throw handleAPIError(e);
    }
  }
  
  export async function getTestcaseByQuestion(id: string)
  {
    try
    {
        const response = await api.get<getTestcaseByQuestion>(`/questions/${id}/testcases`)
        return response.data.data;
    }
    catch(e)
    {
        console.log(e)
        // handleAPIError(e)
        return []
    }
  }
  
// export async function getTestcase(id: string) {
    
//     try
//     {
//         const response = api.get<TestCaseResponse>(`/questions/${id}`)
//     }
//     catch(e)
//     {
//         console.log(e)
//         handleAPIError(e)
//     }
// }
