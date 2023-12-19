/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ApplicationContext = createContext();

const ApplicationContextProvider = ({ children }) => {
  const [visitorList, setVisitorList] = useState([]);
  const [clickOnNo, setClickOnNo] = useState(false);
  return (
    <ApplicationContext.Provider
      value={{ visitorList, setVisitorList, clickOnNo, setClickOnNo }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
export default ApplicationContextProvider;
