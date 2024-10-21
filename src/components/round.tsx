"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ApiError } from "next/dist/server/api-utils";
import { RoundEnable } from "@/api/round";

const Round = () => {
  const [round, setRound] = useState<number>(1);
  function onSubmit() {
    toast.promise(RoundEnable({round_id: round}), {
      loading: "Enabling round...",
      success: "Round Enabled!",
      error: (err: ApiError) => err.message,
    });
  }
  return (
    <div className=" flex items-start  justify-center">
      <div className="flex items-center gap-10  bg-black text-slate-100">
        <select
          onChange={(e)=>{setRound(Number(e.target.value))}}
          defaultValue="1"
          id="round"
          className="rounded-md border bg-gray-200 p-2 text-black"
        >
          <option value={1}>Round 1</option>
          <option value={2}>Round 2</option>
          <option value={3}>Round 3</option>
        </select>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button>Change Round</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Change round to {round}?</AlertDialogTitle>
              <AlertDialogDescription>
                The round will be enabled and there's no option to disable it from the frontend! Make sure that you are sure.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onSubmit}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
export default Round;
