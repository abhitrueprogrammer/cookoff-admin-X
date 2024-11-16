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
import toast from "react-hot-toast";
import { type ApiError } from "next/dist/server/api-utils";
import { RoundEnable } from "@/api/adminDashboard";

const Round = () => {
  const [round, setRound] = useState<number>(1);
  async function onSubmit() {
    await toast.promise(RoundEnable({ round_id: round }), {
      loading: "Enabling round...",
      success: "Round Enabled!",
      error: (err: ApiError) => err.message,
    });
  }
  return (
    <div className="flex items-start justify-center">
      <div className="flex items-center gap-10 bg-black text-slate-100">
        <select
          onChange={(e) => {
            setRound(Number(e.target.value));
          }}
          defaultValue=""
          id="round"
          className="rounded-md border bg-gray-200 p-2 text-black"
        >
          <option value="" disabled>
            Select round
          </option>
          <option value={1}>Round 1</option>
          <option value={2}>Round 2</option>
          <option value={3}>Round 3</option>
        </select>
        <AlertDialog>
          <AlertDialogTrigger>
            <div className="inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Change Round
            </div>{" "}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Change round to {round}?</AlertDialogTitle>
              <AlertDialogDescription>
                The round will be enabled and there&rsquo;s no option to disable
                it from the frontend! Make sure that you are sure.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
export default Round;
