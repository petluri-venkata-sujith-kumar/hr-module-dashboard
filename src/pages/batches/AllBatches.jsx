/* eslint-disable react/prop-types */
import { Fragment, useContext } from "react";
import Batch from "./Batch";
import { BatchContextApi } from "../../context/BatchContext";
import Spinner from "../../component/empspinnner/Spinner";

const AllBatches = () => {
  const { state, searchBatchTerm } = useContext(BatchContextApi);
  let { batches, isLoading } = state;

  let filteredBatches = batches?.filter((batch) => {
    if (searchBatchTerm === "") {
      return batch;
    } else if (
      batch?.subjectName
        ?.toLowerCase()
        ?.includes(searchBatchTerm?.toLowerCase()) ||
      batch?.batchId?.toString()?.includes(searchBatchTerm) ||
      batch?.batchCode
        ?.toLowerCase()
        ?.includes(searchBatchTerm?.toLowerCase()) ||
      batch?.location
        ?.toLowerCase()
        ?.includes(searchBatchTerm?.toLowerCase()) ||
      batch?.instituteName
        ?.toLowerCase()
        ?.includes(searchBatchTerm?.toLowerCase()) ||
      batch?.batchMode?.toLowerCase()?.includes(searchBatchTerm?.toLowerCase())
    ) {
      return batch;
    }
  });

  const renderedBatches =
    filteredBatches?.length > 0 ? (
      filteredBatches.map((batch) => (
        <Fragment key={batch?.batchId}>
          <Batch batch={batch}></Batch>
        </Fragment>
      ))
    ) : (
      <p>No batches found.</p>
    );

  return (
    <section id="allBatches-container">
      <article className="allBatches">
        {isLoading === true ? <Spinner /> : renderedBatches}
      </article>
    </section>
  );
};

export default AllBatches;
