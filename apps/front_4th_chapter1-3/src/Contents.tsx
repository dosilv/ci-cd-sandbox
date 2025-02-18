import React, { useState } from "react";
import { generateItems } from "./utils";
import {
  useAuthContext,
  useCallback,
  useNotiContext,
  useThemeContext,
} from "./@lib";
import {
  Header,
  ItemList,
  ComplexForm,
  NotificationSystem,
} from "./@lib/components";

const Contents: React.FC = () => {
  const { theme } = useThemeContext();
  const { setUser } = useAuthContext();
  const { addNotification } = useNotiContext();

  const login = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (email: string, password: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification, setUser],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification, setUser]);

  const [items, setItems] = useState(() => generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header login={login} logout={logout} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList items={items} onAddItemsClick={addItems} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
};

export default Contents;
