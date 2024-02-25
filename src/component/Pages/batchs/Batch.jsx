import React, { useState } from 'react'
import { FiEdit } from "react-icons/fi"
import "./batches.css"

const Batch = ({ batch }) => {

  let { batchId, batchCode, subjectName, batchStatus, batchStartDate, batchEndDate, totalDays, batchMode, instituteName, location } = batch;
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

 
  return (

    <section id='batches'>
    <article className="batch-Card">
      <div className='subject-Name'>
        <h1>{subjectName}</h1> 
        <span><FiEdit /></span>
      </div>
      
      <hr />
      
      <p><span>Batch ID:</span> {batchId}</p>
      <p><span>Batch Code:</span> {batchCode}</p>
      <p><span>Batch Status:</span > {batchStatus}</p>
      <p><span>Batch Start Date:</span> {batchStartDate}</p>
      {showMore && (
        <>
          <p><span>Batch End Date:</span> {batchEndDate}</p>
          <p><span>Total Days:</span> {totalDays}</p>
          <p><span>Location:</span> {location}</p>
        </>
      )}
      <p><span>Batch Mode: </span><span className={`status-btn ${batchMode==='ONLINE'? 'online':'offline'}`}>{batchMode}</span> </p>
      <p><span>Institute Name:</span> {instituteName}</p>
      <div className='show-Btn'>
      <div><a href="#" onClick={toggleShowMore} className='show-More'>
          {showMore ? 'Show Less' : 'Show More'}
        </a></div>
      {batchStatus === "NOT_YET_ASSIGNED" && (
        <div><button className='assign_Btn'>ASSIGN</button></div>
     
        
      )}
       </div>
      
      
      
        
    </article>
  </section>
  )
}

export default Batch