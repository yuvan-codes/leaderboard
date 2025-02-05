import { createContext, useState } from "react";

export const PointsContext = createContext({
  allPoints: null,
  setAllPoints: () => {},
  admin: null,
  setAdmin: () => {},
});

export const PointsContextProvider = ({ children }) => {
  const [allPoints, setAllPoints] = useState([]);
  const [admin, setAdmin] = useState(false);
  return (
    <PointsContext.Provider
      value={{
        allPoints,
        setAllPoints,
        admin,
        setAdmin,
      }}
    >
      {children}
    </PointsContext.Provider>
  );
};
