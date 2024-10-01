"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
function Dashboard() {
  const router = useRouter();
  return (
    <div>
      <div className="flex h-screen w-full items-center justify-around gap-20">
        <Button
          onClick={() => {
            router.push("/question");
          }}
          className="p-15 m-10 h-80 flex-grow border-2 border-orange-500 text-6xl"
        >
          QUESTIONS
        </Button>
        <Button
          onClick={() => {
            router.push("/users");
          }}
          className="p-15 m-10 h-80 flex-grow border-2 border-orange-500 text-6xl"
        >
          USERS
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
