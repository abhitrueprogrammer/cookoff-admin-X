"use client";
import { GetLeaderBoard,type  LeaderBoardUser } from "@/api/adminDashboard";
import Round from "@/components/round";

import { useQuery } from "@tanstack/react-query";

function Dashboard() {
  const { data, error, isLoading } = useQuery<LeaderBoardUser[], Error>({
    queryKey: ["leaderboard"],
    queryFn: GetLeaderBoard,
  });
  return (
    <div className="min-h-screen text-white">
      <div className="border-gray-300-4 relative w-full rounded-md border p-10 shadow-md">
        <span className="absolute -top-3 left-4 bg-black px-2 text-lg font-semibold text-white">
          Round Select
        </span>

        <Round />
      </div>
      <div className="s-sling m-3 mt-10 text-center text-xl font-semibold">
        Leaderboard
      </div>
      {/* Add Loading and Error Handling here */}
      {isLoading ? (
        <div className="text-center mt-5">
          <p>Loading leaderboard...</p>
        </div>
      ) : error ? (
        <div className="text-center mt-5 text-red-500">
          <p>Error loading leaderboard: {error.message}</p>
        </div>
      ) : data && data.length > 0 ? (
        <div className="m-5 flex flex-col items-center gap-5">
          <p
            className="w-fit cursor-pointer rounded-sm border bg-yellow-700 p-2 text-lg hover:bg-yellow-600"
            onClick={() => navigator.clipboard.writeText(data[0]!.ID)}
          >
            #1 {data[0]?.Name}
          </p>

          {data.length > 1 && (
            <div className="flex justify-around gap-5">
              <p
                className="w-fit cursor-pointer rounded-sm border bg-green-700 p-2 text-lg hover:bg-green-600"
                onClick={() => navigator.clipboard.writeText(data[1]!.ID)}
              >
                #2 {data[1]?.Name}
              </p>

              {data.length > 2 && (
                <p
                  className="w-fit cursor-pointer rounded-sm border bg-red-700 p-2 text-lg hover:bg-red-600"
                  onClick={() => navigator.clipboard.writeText(data[2]!.ID)}
                >
                  #3 {data[2]?.Name}
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>No data available</p>
      )}

      <div className="flex justify-center">
        <table className="border-collapse">
          {data?.slice(3, 6).map((user, index) => (
            <tr
              key={user.ID}
              className="cursor-pointer rounded-md text-white"
              onClick={() => navigator.clipboard.writeText(user.ID)}
            >
              <td className="m-10 bg-black px-4 py-2 text-left hover:bg-slate-700">
                {index + 4}. {user.Name}
              </td>
            </tr>
          ))}
        </table>{" "}
        <table className="border-collapse">
          {data?.slice(6, 10).map((user, index) => (
            <tr
              key={user.ID}
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(user.ID)}
            >
              <td className="m-10 bg-black px-4 py-2 text-left hover:bg-slate-700">
                {index + 7}. {user.Name}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
