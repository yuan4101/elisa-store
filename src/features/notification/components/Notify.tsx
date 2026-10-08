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
        vertical: "top",
        horizontal: isMobile ? "center" : "right",
      }}
      slots={{
        transition: Slide,
      }}
      slotProps={{
        transition: {
          direction: isMobile ? "down" : "left",
        },
      }}
      sx={{
        mb: 0,
        mt: { xs: 0, md: "150px" },
        top: isMobile ? "0 !important" : undefined,
        left: isMobile ? "0 !important" : undefined,
        right: isMobile ? "0 !important" : undefined,
        transform: "scale(var(--font-scale, 1))",
        transformOrigin: isMobile ? "top left" : "top right",
        maxWidth: isMobile ? "calc(100vw / var(--font-scale, 1))" : "calc(100vw / var(--font-scale, 1) - 32px)",
        width: isMobile ? "calc(100vw / var(--font-scale, 1))" : undefined,
        "& .MuiAlert-root": {
          borderRadius: isMobile ? "0px" : "8px",
          alignItems: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          cursor: "pointer",
          width: "100%",
        },
        "& .MuiAlert-message": {
          wordBreak: "break-word",
        }
      }}
    >
      <Alert
        severity={type}
        icon={iconMap[type]}
        onClick={() => {
          setOpen(false);
          onClose?.();
        }}
        sx={{ width: "100%", borderRadius: isMobile ? "0px" : "8px" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
