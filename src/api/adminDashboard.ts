import { handleAPIError } from "@/lib/error";
import api from ".";
// import { generateSampleLeaderboard as generateSampleLeaderBoard } from "./sampleData";

export interface RoundParams {
  round_id: number;
}

export interface LeaderBoardUser {
  ID: string;
  Name: string;
  Score: number | null;
}

export async function RoundEnable(data: RoundParams) {
  try {
    const response = await api.post<{ message: string }>("/round/enable", data);
    return response.data;
  } catch (e) {
    console.log(e);
    throw handleAPIError(e);
  }
}

export async function GetLeaderBoard() {
  try {
    const response = await api.get<LeaderBoardUser[]>("/leaderboard");
    return response.data
      .filter((user) => user.Score !== null) // Exclude users with null scores
      .sort((a, b) => b.Score! - a.Score!) // Sort by score in descending order
      .slice(0, 10); // Take the top 10

    // return generateSampleLeaderBoard()
    // .filter((user) => user.Score !== null)
    // .sort((a, b) => b.Score! - a.Score!)
    // .slice(0, 10);
  } catch (e) {
    throw handleAPIError(e);
  }
}
