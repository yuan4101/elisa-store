// components/Notification.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { Snackbar, Alert, AlertColor } from '@mui/material';

type NotificationType = AlertColor; // 'success' | 'error' | 'warning' | 'info'

interface NotificationProps {
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose?: () => void;
}

export const Notification = ({
  message,
  type = 'success',
  duration = 2000,
  onClose,
}: NotificationProps) => {
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
    success: <CheckCircleIcon fontSize="inherit" />,
    error: <ErrorIcon fontSize="inherit" />,
    warning: <WarningIcon fontSize="inherit" />,
    info: <InfoIcon fontSize="inherit" />,
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        mt: {
          xs: '28px',
          md: '125px',
        },
        '& .MuiAlert-root': {
          alignItems: 'center',
        },
      }}
    >
      <Alert
        severity={type}
        icon={iconMap[type]}
        onClose={() => setOpen(false)}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};