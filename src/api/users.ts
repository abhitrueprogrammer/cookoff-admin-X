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
  

export async function GetUsers()
{
    try
    {
        const response = await api.get<User []>("/users");
        return response.data
    }
    catch(e)
    {
        console.log(e);
        return [];
    }
}