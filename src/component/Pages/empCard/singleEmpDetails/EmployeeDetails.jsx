import { MdOutlineMail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import React from "react";
import Batches from "./Batches";
import { NavLink } from "react-router-dom";
const EmployeeDetails = ({ val }) => {
  let { empId, name, email, phone, batchs ,userRole} = val;
  return (
    <div className="emp-Main-Div">
      <NavLink to="/hrdashboard/employee" className="back-btn">Back</NavLink>
        <div>
        <div className="emp-Profile">
      <img src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg" alt="Employee" />
      <h2 className="employee-Name">{name}</h2>
       <p>{userRole}</p>
   
      <div className="emp-details">
        <span id="emp-Id">
         EmpId:
          
        </span>
        <p>{empId}</p>
      </div>
      <div className="emp-details">
        <span>
          <MdOutlineMail title="email" />
          
        </span>
        <p>{email}</p>
      
      </div>
      <div className="emp-details">
        <span>
          <FaPhoneVolume />
        
        </span>
        <p>{phone}</p>
      </div>
      </div>
      </div>
      <div id="employee-Batch">
          <Batches batchs={batchs}/>
      </div>
    </div>

  );
};

export default EmployeeDetails;
