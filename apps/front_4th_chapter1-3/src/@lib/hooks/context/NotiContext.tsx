import { createContext, ReactNode, useContext, useState } from "react";
import { Notification } from "../../components";
import { useCallback, useMemo } from "../index";

export interface NotiContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

const NotiContext = createContext<NotiContextType | undefined>(undefined);

export const useNotiContext = () => {
  const context = useContext(NotiContext);
  if (context === undefined) {
    throw new Error("useNotiContext must be used within an NotiProvider");
  }
  return context;
};

export const NotiContextProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    [],
  );
  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const value: NotiContextType = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification],
  );

  return <NotiContext.Provider value={value}>{children}</NotiContext.Provider>;
};
