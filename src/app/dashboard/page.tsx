"use client";
import Round from "@/components/round";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
function Dashboard() {
  const router = useRouter();
  return (
    <div className="h-screen">
      <div>
        {/* <div className="border-gray-300-4 relative m-10 w-full rounded-md border shadow-md">
          <span className="absolute -top-3 left-4 bg-black px-2 text-lg font-semibold text-white">
            Navigate
          </span>

          <div className="mt-2 flex justify-center">
            <Button
              onClick={() => {
                router.push("/question");
              }}
              className="p-15 m-10 border-2 border-orange-500 p-5"
            >
              QUESTIONS
            </Button>
            <Button
              onClick={() => {
                router.push("/users");
              }}
              className="p-15 m-10 border-2 border-orange-500 p-5"
            >
              USERS
            </Button>
          </div>
        </div> */}
        <div className="border-gray-300-4 relative m-10 w-full rounded-md border shadow-md p-10">
          <span className="absolute -top-3 left-4 bg-black px-2 text-lg font-semibold text-white">
            Round Select
          </span>

          <Round />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
