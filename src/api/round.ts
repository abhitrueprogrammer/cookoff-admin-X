import { handleAPIError } from "@/lib/error";
import api from ".";

export interface RoundParams{
    round_id: number;
  }


export async function RoundEnable(data: RoundParams) {
    try {
      console.log(data)
      const response = await api.post<{message:string}>("/round/enable", data);
      return response.data;
    } catch (e) {
  
      console.log(e)
      throw handleAPIError(e);
    }
  }