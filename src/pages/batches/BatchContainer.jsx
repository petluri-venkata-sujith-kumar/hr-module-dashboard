/* eslint-disable react/prop-types */
import AllBatches from "./AllBatches";
import SearchContainer from "./SearchContainer";
import { BatchContextProvider } from "../../context/BatchContext";
import "./batchContainer.css";

const BatchContainer = () => {
  return (
    <div id="batch-container">
      <BatchContextProvider>
        <SearchContainer />
        <AllBatches />
      </BatchContextProvider>
    </div>
  );
};

export default BatchContainer;
