/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { BatchContextApi } from "../../context/BatchContext";

const Filter = () => {
  let { state, setState, mainStateBacthes } = useContext(BatchContextApi);
  let { batches } = state;


  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setState({ batches: mainStateBacthes });
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  const filteredBatches = batches?.filter((batch) => {
    const currentDate = getCurrentDate();
    switch (selectedOption) {
      case "upcoming":
        return batch.batchStartDate > currentDate;
      case "completed":
        return batch.batchEndDate < currentDate;
      case "current":
        return (
          batch.batchStartDate <= currentDate &&
          batch.batchEndDate >= currentDate
        );

      case "online":
        return batch?.batchMode
          ?.toLowerCase()
          ?.includes(selectedOption?.toLowerCase());
      case "offline":
        return batch?.batchMode
          ?.toLowerCase()
          ?.includes(selectedOption?.toLowerCase());
      case "allbatches":
        return batch;
      default:
        return batch;
    }
  });

  let updateBatch = () => {
    setState({ ...state, batches: filteredBatches });
  };

  useEffect(() => {
    updateBatch();
  }, [selectedOption]);

  return (
    <div id="filter">
      <select id="" onChange={handleSelectChange}>
        <option selected disabled>
          Apply Filter
        </option>
        <option value="allbatches">All Batches</option>
        <option value="upcoming">Upcoming Batch</option>
        <option value="completed">Completed Batch</option>
        <option value="current">Current Batches</option>
        <option value="online">Online Batches</option>
        <option value="offline">Offline Batches</option>
      </select>
    </div>
  );
};

export default Filter;
