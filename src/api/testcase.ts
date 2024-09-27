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
  
export async function getTestcase(id: string) {
    
    try
    {
        const response = api.get<TestCaseResponse>(`/questions/${id}`)
    }
    catch(e)
    {
        console.log(e)
        handleAPIError(e)
    }
}
