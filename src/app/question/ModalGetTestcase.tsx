"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ModalDetails = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {

    // const [testcase]
  return (
    <div>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Test Case Info</DialogTitle>
          <DialogDescription>
            Here's the info about those juicy testcases
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
 
        </div>

      </DialogContent>
    </Dialog>

    </div>
  );
};

export default ModalDetails;
