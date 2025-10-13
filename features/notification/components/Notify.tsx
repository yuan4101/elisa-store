"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { Snackbar, Alert } from "@mui/material";
import { NotificationType } from "../context/NotificationContext";

interface NotifyProps {
  message?: string;
  type?: NotificationType;
  duration?: number;
  onClose?: () => void;
}

export default function Notify({
  message,
  type = NotificationType.Success,
  duration = 2000,
  onClose,
}: NotifyProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
      const timer = setTimeout(() => {
        setOpen(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  const iconMap = {
    [NotificationType.Success]: <CheckCircleIcon fontSize="inherit" />,
    [NotificationType.Error]: <ErrorIcon fontSize="inherit" />,
    [NotificationType.Warning]: <WarningIcon fontSize="inherit" />,
    [NotificationType.Info]: <InfoIcon fontSize="inherit" />,
  };

  if (!message) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        mt: {
          xs: "145px",
          md: "130px",
        },
        "& .MuiAlert-root": {
          borderRadius: "6px",
          alignItems: "center",
        },
      }}
    >
      <Alert
        severity={type}
        icon={iconMap[type]}
        onClose={() => setOpen(false)}
        sx={{ width: "100%", borderRadius: "6px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
