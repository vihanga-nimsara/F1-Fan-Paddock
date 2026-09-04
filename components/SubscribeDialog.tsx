"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
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
    <Dialog
      open={open}
      onClose={() => onOpenChange(false)}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "4px",
            borderTop: "3px solid #e10600",
            fontFamily: "var(--font-body)",
          },
        },
      }}
    >
      <DialogTitle sx={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
        Join the Paddock
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email address"
            type="email"
            name="email"
            required
            fullWidth
            size="small"
            placeholder="you@example.com"
          />
          <FormControlLabel
            control={<Checkbox name="consent" required />}
            label="I agree to receive the F1 Fan Paddock newsletter."
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disableElevation
          >
            Subscribe
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
