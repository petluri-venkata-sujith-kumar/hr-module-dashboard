import { createContext, useState } from "react";
import { Toaster } from "react-hot-toast";

export const ContextApi = createContext();

const ContextProvider = ({ children }) => {
  let [toggle, setToggle] = useState(false);
  let handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <ContextApi.Provider value={{ toggle, handleToggle }}>
      {children}
      <Toaster/>
    </ContextApi.Provider>
  );
};
export default ContextProvider;
