"use client";

import { Toast } from "@base-ui/react/toast";

export const toastManager = Toast.createToastManager();

export default function Toaster() {
  return (
    <Toast.Provider toastManager={toastManager}>
      <Toast.Portal>
        <Toast.Viewport className="fixed right-4 bottom-4 z-[1000] mx-auto w-[calc(100vw-2rem)] max-w-[22.5rem]">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root
      key={toast.id}
      toast={toast}
      className="mb-2 flex items-start gap-3 rounded-[2px] border border-pebble-20 border-t-[3px] border-t-f1red bg-carbon-deep p-3 text-pebble shadow-[0_12px_30px_rgb(0_0_0/0.5)] transition-[transform,opacity] duration-300 data-starting-style:translate-y-2 data-starting-style:opacity-0 data-ending-style:translate-y-2 data-ending-style:opacity-0"
    >
      <Toast.Content className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Toast.Title className="font-display text-sm font-semibold text-pebble" />
        <Toast.Description className="text-[12px] leading-tight text-pebble-80" />
      </Toast.Content>
      <Toast.Close className="shrink-0 rounded-[2px] px-2 py-1 text-[12px] font-semibold text-pebble-80 transition-colors hover:text-f1red">
        Dismiss
      </Toast.Close>
    </Toast.Root>
  ));
}
