import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [progress, setProgress] = useState(0);
  const value = {
    progress,
    setProgress,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
