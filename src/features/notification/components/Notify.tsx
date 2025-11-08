"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { Snackbar, Alert, Slide } from "@mui/material";
import { NotificationType } from "../context/NotificationContext";

interface NotifyProps {
  message?: string;
  type?: NotificationType;
  duration?: number;
  onClose?: () => void;
}

// Hook para detectar si es móvil
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

export default function Notify({
  message,
  type = NotificationType.Success,
  duration = 2000,
  onClose,
}: NotifyProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

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
      anchorOrigin={{
        vertical: isMobile ? "bottom" : "top",
        horizontal: isMobile ? "center" : "right",
      }}
      slots={{
        transition: Slide,
      }}
      slotProps={{
        transition: {
          direction: isMobile ? "up" : "left",
        },
      }}
      sx={{
        mb: { xs: 2, md: 0 },
        mt: { xs: 0, md: "150px" },
        "& .MuiAlert-root": {
          borderRadius: "8px",
          alignItems: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Alert
        severity={type}
        icon={iconMap[type]}
        onClose={() => setOpen(false)}
        sx={{ width: "100%", borderRadius: "8px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
