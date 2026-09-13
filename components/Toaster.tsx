"use client";

import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export type ToastItem = { id: number; title: string; description?: string };

type ToastInput = { title: string; description?: string };

let listeners: ((toasts: ToastItem[]) => void)[] = [];
let current: ToastItem[] = [];
let counter = 0;

function emit() {
  listeners.forEach((l) => l(current));
}

export const toastManager = {
  add({ title, description }: ToastInput) {
    const id = ++counter;
    current = [...current, { id, title, description }];
    emit();
  },
  subscribe(cb: (toasts: ToastItem[]) => void) {
    listeners.push(cb);
    cb(current);
    return () => {
      listeners = listeners.filter((l) => l !== cb);
    };
  },
};

export default function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>(current);

  useEffect(() => toastManager.subscribe(setToasts), []);

  const remove = (id: number) =>
    setToasts((list) => list.filter((t) => t.id !== id));

  return (
    <>
      {toasts.map((toast, i) => (
        <Snackbar
          key={toast.id}
          open
          autoHideDuration={5000}
          onClose={(_, reason) => {
            if (reason !== "clickaway") remove(toast.id);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{ bottom: (theme) => theme.spacing(2 + i * 8) }}
        >
          <Alert
            icon={false}
            variant="outlined"
            onClose={() => remove(toast.id)}
            sx={{
              width: "100%",
              borderRadius: "3px",
              borderTop: "3px solid #e10600",
              borderColor: "rgba(20,20,28,0.12)",
              bgcolor: "#ffffff",
              color: "#16161d",
              fontFamily: "var(--font-body)",
            }}
          >
            <strong style={{ fontFamily: "var(--font-display)" }}>
              {toast.title}
            </strong>
            {toast.description ? (
              <div style={{ fontWeight: 400 }}>{toast.description}</div>
            ) : null}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
