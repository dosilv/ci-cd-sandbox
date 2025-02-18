import React from "react";
import {
  AuthContextProvider,
  NotiContextProvider,
  ThemeContextProvider,
} from "./@lib";
import ContextWrapper from "./@lib/hooks/context/ContextWrapper";
import Contents from "./Contents";

const App: React.FC = () => {
  return (
    <ContextWrapper
      providers={[
        ThemeContextProvider,
        AuthContextProvider,
        NotiContextProvider,
      ]}
    >
      <Contents />
    </ContextWrapper>
  );
};

export default App;
