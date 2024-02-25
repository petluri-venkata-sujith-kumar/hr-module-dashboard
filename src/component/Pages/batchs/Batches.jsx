import { MdSearch } from "react-icons/md";
import React, { useState, useEffect, useContext, Fragment } from "react";
import "./batches.css";
import Batch from "./Batch";
import Spinner from "../../spinner/Spinner";
import ContextProvider, { ContextApi } from "../../../context/ModelContext";
import { AxiosInstance } from "../../../Instance/AxiosInstance";
import CreateBatchForm from "../../../Forms/CreateBatchForm";

const Batches = () => {
  let { toggle, handleToggle } = useContext(ContextApi);
  let [state, setState] = useState({
    batches: [],
    isLoading: true,
  });
  let [selectedFilter, setSelectedFilter] = useState("All");

  let [seachBatchTerm, setSearchBatchTerm] = useState("");

  let handleSearch = (searchItem) => {
    setSearchBatchTerm(searchItem);
  };

  let handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  let { batches, isLoading } = state;

  let FilteredBatches = batches
    ?.filter((batch) => {
      if (seachBatchTerm === "") {
        return batch;
      } else if (
        batch?.subjectName
          ?.toLowerCase()
          ?.includes(seachBatchTerm?.toLowerCase()) ||
        batch?.batchId?.toString()?.includes(seachBatchTerm) ||
        batch?.batchCode
          ?.toLowerCase()
          ?.includes(seachBatchTerm?.toLowerCase()) ||
        batch?.location
          ?.toLowerCase()
          ?.includes(seachBatchTerm?.toLowerCase()) ||
        batch?.instituteName
          ?.toLowerCase()
          ?.includes(seachBatchTerm?.toLowerCase()) ||
        batch?.batchMode?.toLowerCase()?.includes(seachBatchTerm?.toLowerCase())
      ) {
        return batch;
      }
    })
    ?.reverse()
    ?.map((batch) => {
      return (
        <Fragment key={batch.batchId}>
          <Batch batch={batch} key={batch.batchId}></Batch>
        </Fragment>
      );
    });

  let FilteredBatchesAssigned = batches
    ?.filter((batch) => {
      switch (selectedFilter) {
        case "ALL":
          return batch;
        case "ASSIGNED":
          return batch?.batchStatus?.startsWith(selectedFilter);
        case "NOT_YET_ASSIGNED":
          return batch?.batchStatus?.includes(selectedFilter);
      }
    })
    ?.reverse()
    .map((batch) => (
      <Fragment key={batch.batchId}>
        <Batch batch={batch}></Batch>
      </Fragment>
    ));

  let fetchAllBatches = async () => {
    let { data } = await AxiosInstance.get("/batch");
    setState({ ...state, batches: data.body, isLoading: false });
  };
  useEffect(() => {
    fetchAllBatches();
  }, []);

  return (
    <div className="batch-container" id={`${toggle && "toggleopened"}`}>
      <div>
        <div className="batches-Header-Container">
          <div className="searchBar-Container">
            <div className="filter-Container">
              <select
                id="filter"
                onChange={handleFilterChange}
                value={selectedFilter}
              >
                <option selected value="ALL">
                  ALL
                </option>
                <option value="ASSIGNED">ASSIGNED</option>
                <option value="NOT_YET_ASSIGNED">NOT_YET_ASSIGNED</option>
              </select>
            </div>
            <div className="search-search">
              <span>
                <MdSearch />
              </span>
              <input
                type="text"
                placeholder="Search by Batch ID , Batch Mode, institute Name, Location.  "
                onInput={(e) => handleSearch(e.target.value)}
              />
            </div>
            <ContextProvider>
              <div className="create-Batches" onClick={handleToggle}>
                <span>Create Batch</span>
              </div>
              {toggle && <CreateBatchForm prop={{ toggle, handleToggle }} />}
            </ContextProvider>
          </div>
        </div>

        <section id="all-Batches-container">
          <article className="all-Bacthes">
            {state.isLoading === true ? (
              <Spinner />
            ) : selectedFilter === "All" ? (
              FilteredBatches
            ) : (
              FilteredBatchesAssigned
            )}
          </article>
        </section>
      </div>
    </div>
  );
};

export default Batches;
