/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

export const BatchContextApi = createContext();

export const BatchContextProvider = ({ children }) => {
  const { userData } = useUser();

  let [mainState, setMainState] = useState({
    mainStateBacthes: null,
  });

  let [state, setState] = useState({
    batches: null,
    isLoading: true,
  });

  let [searchBatchTerm, setSearchBatchTerm] = useState("");

  let handleSearch = (searchItem) => {
    setSearchBatchTerm(searchItem);
  };

  useEffect(() => {
    setState({ ...state, batches: userData?.batchs, isLoading: false });
    setMainState({ mainStateBacthes: userData?.batchs });
  }, [userData]);

  return (
    <BatchContextApi.Provider
      value={{
        state,
        setState,
        searchBatchTerm,
        handleSearch,
        ...mainState,
      }}
    >
      {children}
    </BatchContextApi.Provider>
  );
};
