"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastManager } from "@/components/Toaster";

type SubscribeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SubscribeDialog({
  open,
  onOpenChange,
}: SubscribeDialogProps) {
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onOpenChange(false);
    setEmail("");
    toastManager.add({
      title: "You're subscribed!",
      description: "Check your inbox — the paddock is in your corner.",
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Join the Paddock
          </DialogTitle>
          <DialogDescription>
            Race-weekend verdicts, new stories and the fastest F1 data — straight
            to your inbox.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="subscribe-email">Email address</Label>
            <Input
              id="subscribe-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full bg-f1red text-white hover:bg-f1red-dark">
              Subscribe
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}