import { handleAPIError } from "@/lib/error";
import { type ApiResponse } from "@/schemas/api";
import { type loginFormSchema } from "@/schemas/forms/login";
import { type z } from "zod";
import api from ".";

export async function login(body: z.infer<typeof loginFormSchema>) {
  try {
    const { data } = await api.post<ApiResponse>(`/login/user`, body);
    return data.message;
  } catch (e) {
    throw handleAPIError(e);
  }
}
