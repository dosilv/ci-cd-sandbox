import React, { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

type ContextProvider = React.ComponentType<ProviderProps>;

type ContextWrapperProps = {
  providers: ContextProvider[];
  children: ReactNode;
};

const ContextWrapper: React.FC<ContextWrapperProps> = ({
  providers,
  children,
}) => {
  // 주입된 providers를 역순으로 래핑
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, children);
};

export default ContextWrapper;
