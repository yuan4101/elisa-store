"use client";

import React, { createContext, useState } from "react";
import Notify from "../components/Notify";

export enum NotificationType {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
}

export interface Notification {
  message: string;
  type: NotificationType;
  duration?: number;
}

export interface NotificationContextType {
  showNotification: (notification: Notification) => void;
  hideNotification: () => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (notification: Notification) => {
    setNotification(notification);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const showSuccess = (message: string, duration?: number) => {
    showNotification({ message, type: NotificationType.Success, duration });
  };

  const showError = (message: string, duration?: number) => {
    showNotification({ message, type: NotificationType.Error, duration });
  };

  const showWarning = (message: string, duration?: number) => {
    showNotification({ message, type: NotificationType.Warning, duration });
  };

  const showInfo = (message: string, duration?: number) => {
    showNotification({ message, type: NotificationType.Info, duration });
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
      <Notify
        message={notification?.message}
        type={notification?.type}
        duration={notification?.duration}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  );
}
