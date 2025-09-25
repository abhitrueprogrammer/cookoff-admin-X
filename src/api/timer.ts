import { handleAPIError } from "@/lib/error";
import api from ".";

export interface GetTimeResponse {
  server_time: string;
  round_start_time: string;
  round_end_time: string;
}

export interface SetTimeParams {
  round: string;
  time: string;
}

export interface UpdateTimeParams {
  duration: number;
}

export interface StartRoundResponse {
  success: boolean;
  round: number;
}

/**
 * Fetch the current round and server times.
 */
export async function getTime(): Promise<GetTimeResponse | null> {
  try {
    const response = await api.get<GetTimeResponse>("/GetTime");
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Set the end time for a specific round.
 */
export async function setTime(
  data: SetTimeParams,
): Promise<{ success: boolean }> {
  try {
    const response = await api.post<{ success: boolean }>("/SetTime", data);
    return response.data;
  } catch (e) {
    throw handleAPIError(e);
  }
}

/**
 * Update the remaining time of the current round.
 */
export async function updateTime(data: UpdateTimeParams): Promise<void> {
  try {
    await api.post("/UpdateTime", data);
  } catch (e) {
    throw handleAPIError(e);
  }
}

/**
 * Start a new round. Increments internal round counter and sets start times.
 */
export async function startRound(): Promise<StartRoundResponse> {
  try {
    const response = await api.post<StartRoundResponse>("/StartRound");
    return response.data;
  } catch (e) {
    throw handleAPIError(e);
  }
}
