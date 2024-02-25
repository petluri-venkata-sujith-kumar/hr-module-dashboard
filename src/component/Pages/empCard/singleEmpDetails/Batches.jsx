import React, { useState } from "react";
import Card from "./Card";
import { NavLink } from 'react-router-dom';


const Batches = ({ batchs }) => {
  // let [state,setState]=useState(batchs);
  let [val, setVal] = useState("All Batches");
  let [data, setData] = useState(batchs);

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  };

  let filterData = (status) => {
    const currentDate = getCurrentDate();
    return batchs.filter((batch, val) => {
      switch (status) {
        case "UpComing": {
          return batch.batchStartDate > currentDate;
        }
        case "Completed": {
          return (
            batch.batchStartDate < currentDate &&
            batch.batchEndDate < currentDate
          );
        }
        case "OnGoing": {
          return (
            batch.batchStartDate < currentDate &&
            batch.batchEndDate > currentDate
          );
        }
        default: {
          return batch;
        }
      }
    });
  };
  let handleChange = (e) => {
    let dat = filterData(e.target.value);
    setVal(e.target.value);
    setData(dat);
  };

  return (
    <div>
        <div className="Header">
        <h3 className="batch-Heading">
          Batches <span>({val} )</span>{" "}
        </h3>
        <div className="filter-detail">
          <select id="DropDown" onChange={handleChange}>
            <option value="All Batches">All</option>
            <option value="OnGoing">OnGoing</option>
            <option value="UpComing">UpComing</option>
            <option value="Completed">Complted</option>
          </select>
        </div>
      </div>

      <div>
        <Card data={data} />
      </div>
    </div>
  );
};

export default Batches;
