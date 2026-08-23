"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Field } from "@base-ui/react/field";
import { Checkbox } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import F1Button from "@/components/ui/F1Button";
import { toastManager } from "@/components/Toaster";

type SubscribeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SubscribeDialog({
  open,
  onOpenChange,
}: SubscribeDialogProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onOpenChange(false);
    toastManager.add({
      title: "You're subscribed!",
      description: "Check your inbox.",
    });
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[90] bg-black/70 transition-opacity duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-[100] w-[calc(100vw-2rem)] max-w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-pebble-20 border-t-[3px] border-t-f1red bg-carbon-deep p-6 text-pebble shadow-[0_24px_60px_rgb(0_0_0/0.6)] transition-opacity duration-150 data-starting-style:opacity-0 data-ending-style:opacity-0">
          <div className="flex flex-col gap-1">
            <Dialog.Title className="font-display text-lg font-semibold text-pebble">
              Join the Paddock
            </Dialog.Title>
            <Dialog.Description className="text-sm text-pebble-80">
              Get race analysis, paddock stories, and live data in your inbox.
            </Dialog.Description>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            <Field.Root name="email">
              <Field.Label className="text-sm font-semibold text-pebble">
                Email address
              </Field.Label>
              <Field.Control
                type="email"
                required
                placeholder="you@example.com"
                className="mt-1 h-10 w-full rounded-[2px] border border-pebble-40 bg-carbon px-3 text-sm text-pebble placeholder:text-pebble-80 focus:outline-2 focus:-outline-offset-1 focus:outline-f1red"
              />
              <Field.Error
                match="valueMissing"
                className="text-[12px] text-f1red"
              >
                Please enter your email.
              </Field.Error>
              <Field.Error
                match="typeMismatch"
                className="text-[12px] text-f1red"
              >
                Enter a valid email address.
              </Field.Error>
            </Field.Root>

            <Field.Root name="consent" className="flex flex-col gap-1">
              <Field.Label className="flex items-center gap-2 text-sm text-pebble-80">
                <Checkbox.Root
                  required
                  name="consent"
                  className="flex size-4 shrink-0 items-center justify-center rounded-[2px] border border-pebble-40 bg-carbon text-white data-checked:border-f1red data-checked:bg-f1red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-f1red"
                >
                  <Checkbox.Indicator className="flex data-unchecked:hidden">
                    <Check size={12} strokeWidth={3} />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                I agree to receive the F1 Fan Paddock newsletter.
              </Field.Label>
              <Field.Error
                match="valueMissing"
                className="text-[12px] text-f1red"
              >
                Please accept the terms to subscribe.
              </Field.Error>
            </Field.Root>

            <F1Button type="submit" variant="primary" className="mt-1 w-full">
              Subscribe
            </F1Button>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
