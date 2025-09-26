'use client';

import React, { createContext, useContext, useState } from 'react';
import Notification from '../types/notification';
import Notify from '../components/notification/notify';

interface NotificationContextType {
  showNotification: (notification: Notification) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (notification: Notification) => {
    setNotification(notification);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      {/* El componente Notify se renderiza aquí automáticamente */}
      <Notify
        message={notification?.message}
        type={notification?.type}
        onClose={hideNotification}
      />
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};