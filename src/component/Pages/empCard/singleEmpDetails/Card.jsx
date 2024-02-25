import React from 'react'
import NoDataFound from './NoDataFound';

const Card = ({data}) => {
    console.log(data);
  return (
    <div className='wrapper-container'>
      
    {
     data.length!==0?data.map((val,i)=>{
            return<div className='card-detail'>
            <h2>{val.subjectName}</h2>
            <hr />
            <p>BatchCode:{val.batchCode}</p>
            <p>StartDate:{val.batchStartDate}</p>
            <p>Mode:{val.batchMode}</p>

            </div>
        }):<NoDataFound/>

      }
    

    </div>
  )
}

export default Card