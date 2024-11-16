import { handleAPIError } from "@/lib/error";
import api from ".";
export interface User {
  ID: string;
  Email: string;
  RegNo: string;
  Password: string;
  Role: string;
  RoundQualified: number;
  Score: number | null;
  Name: string;
  IsBanned: boolean;
}
export interface SetUserRoundProps {
  user_ids: string[];
  round: number;
}

export async function SetUserRound(data: SetUserRoundProps) {
  try {
    console.log(data);
    const response = await api.post<SetUserRoundProps>("/upgrade", {
      round: Number(data.round),
      user_ids: data.user_ids,
    });
    return response.data;
  } catch (e) {
    console.log(e);
    throw handleAPIError(e);
  }
}

export async function GetUsers() {
  try {
    const response = await api.get<User[]>("/users");
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function Roast(id: string) {
  try {
    const response = await api.post<{ message: string }>("/roast", {
      user_id: id,
    });
    return response.data;
  } catch (error) {
    throw handleAPIError(error);
  }
}

export async function UnRoast(id: string) {
  try {
    const response = await api.post<{ message: string }>("/unroast", {
      user_id: id,
    });
    return response.data;
  } catch (error) {
    throw handleAPIError(error);
  }
}
