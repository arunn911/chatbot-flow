import React, { createContext, useState, FC } from "react";

const TopbarContext = createContext<any>(undefined);

interface DataProviderProps {
  children: React.ReactNode;
}
export const TopbarProvider: FC<DataProviderProps> = ({ children }) => {
  const [topbar, setTopbar] = useState<any>(null);

  return (
    <TopbarContext.Provider value={[topbar, setTopbar]}>
      {children}
    </TopbarContext.Provider>
  );
};

export default TopbarContext;
