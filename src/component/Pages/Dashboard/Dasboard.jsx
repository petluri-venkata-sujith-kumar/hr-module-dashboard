import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { AxiosInstance } from "../../../Instance/AxiosInstance";
const Dashboard = () => {
  const [employees, setEmployees] = useState(null);
  const [batch, setBatch] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesResponse = await AxiosInstance.get("user/all");
        setEmployees(employeesResponse.data.body);

        const batchesResponse = await AxiosInstance.get("batch");
        setBatch(batchesResponse.data.body);
        console.log(batchesResponse.data.body);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  let InactiveEmployees = employees?.filter((emp) =>
    emp?.userStatus.includes("IN_ACTIVE")
  );
  let ActiveEmployees = employees?.filter(
    (emp) => emp?.userStatus === "ACTIVE"
  );
  let NotAssignedBatches = batch?.filter((batches) =>
    batches?.batchStatus?.includes("NOT_YET_ASSIGNED")
  );
  let AssignedBatches = batch?.filter(
    (batches) => batches?.batchStatus === "ASSIGNED"
  );

  return (
    <>
      <div className="hrwelcome">
          <div className="hrImg">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFu5WDw6aMzlagbH8C4SjJ0NpznQXPSxAiw&usqp=CAU" alt="" />
          </div>
          <div className="hrText">
            <h1>welcome</h1>
            <p>hr.name...</p>
          </div>
      </div>
      <main className="hrtableContainer">
        <table className="hrcontent-table">
          <thead className="thead">
            <tr>
              <th>Status</th>
              <th>Employees</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Employess</td>
              <td>{employees?.length}</td>
            </tr>
            <tr>
              <td>Active Employees</td>
              <td>{ActiveEmployees?.length}</td>
            </tr>
            <tr>
              <td>IN-Active Employees </td>
              <td>{InactiveEmployees?.length}</td>
            </tr>
          </tbody>
        </table>
        <table className="hrcontent-table">
          <thead className="thead">
            <tr>
              <th>Status</th>
              <th>Batches</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Batches</td>
              <td>{batch?.length}</td>
            </tr>
            <tr>
              <td>Assigned Batches</td>
              <td>{AssignedBatches?.length}</td>
            </tr>
            <tr>
              <td>Not-Assigned Batches </td>
              <td>{NotAssignedBatches?.length}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Dashboard;
