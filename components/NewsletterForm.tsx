"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toastManager } from "@/components/Toaster";

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmail("");
    toastManager.add({
      title: "You're subscribed!",
      description: "New paddock stories and race-weekend verdicts are on the way.",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
      <Input
        type="email"
        required
        placeholder="you@example.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={compact ? "h-9" : ""}
      />
      <Button
        type="submit"
        className={compact ? "h-9 bg-f1red text-white hover:bg-f1red-dark" : "bg-f1red text-white hover:bg-f1red-dark"}
      >
        Subscribe
      </Button>
    </form>
  );
}