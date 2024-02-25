import React, { useEffect, useState } from 'react';
import "./employeeDetails.css"
import EmployeeDetails from './EmployeeDetails';
import { useParams } from 'react-router-dom';
import { AxiosInstance } from '../../../../Instance/AxiosInstance';
const GetDetails = () => {

    let [data,setData]=useState(null);
    let {userId}=useParams()

    let fetchUser=async()=>{
     let {data:{body}}=await AxiosInstance.get(`user/${userId}`);
     console.log(body);
     setData(body);
    }
    
    useEffect(()=>{
        fetchUser();

    },[])

  return (
    <div>
          {
            data!==null?<EmployeeDetails val={data}/>:"Loading"
          }
    </div>
  )
}

export default GetDetails