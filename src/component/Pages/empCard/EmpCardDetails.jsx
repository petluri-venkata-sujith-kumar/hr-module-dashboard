import { Fragment, useContext, useEffect, useState } from "react";
import "./EmpCardDetails.css";
import Spinner from "../../spinner/Spinner";
import { IoSearchSharp } from "react-icons/io5";
import ContextProvider, { ContextApi } from "../../../context/ModelContext";
import EmpCard from "./EmpCard";
import { AxiosInstance } from "../../../Instance/AxiosInstance";
import CreateEmployeeForm from './../../../Forms/CreateEmployeeForm';

const EmpCardDetails = () => {
  let { toggle, handleToggle } = useContext(ContextApi);
  const [state, setState] = useState(null);
  let [selectedFilter, setSelectedFilter] = useState("All");

  const [val, setVal] = useState("");

  let handleChange = (e) => {
    const value = e.target.value;
    setVal(value);
  };
  let handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  let fun = async () => {
    let {
      data: { body },
    } = await AxiosInstance.get("user/all");
    setState(body);
  };
  let FilteredData = state
    ?.filter((employee) => {
      if (val === "") {
        return employee;
      } else if (
        employee?.name.toUpperCase().includes(val.toUpperCase()) ||
        employee.userRole.toUpperCase().includes(val.toUpperCase()) ||
        employee.email.includes(val)
      ) {
        return employee;
      }
    })
    ?.reverse()
    ?.map((employee) => {
      return (
        <Fragment key={employee.userId}>
          <EmpCard employee={employee} key={employee.userId} />
        </Fragment>
      );
    });

  let FilteredEmployeeStatus = state
    ?.filter((employee) => {
      switch (selectedFilter) {
        case "ALL":
          return employee;
        case "ACTIVE":
          return employee?.userStatus?.startsWith(selectedFilter);
        case "IN_ACTIVE":
          return employee?.userStatus?.includes(selectedFilter);
      }
    })
    ?.reverse()?.map((employee) => (
      <Fragment key={employee.userId}>
        <EmpCard employee={employee} key={employee.userId}/>
      </Fragment>
    ));

  useEffect(() => {
    fun();
  }, []);

  return (
    <section className="empContainer-Data" id={`${toggle && "toggleopened"}`}>
      <div className="filters-Data">
        <div className="empSearchBarContainer">
        <div className="filter-Container">
            <select
              id="filter"
              onChange={handleFilterChange}
              value={selectedFilter}
            >
              <option selected value="ALL">
                ALL
              </option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="IN_ACTIVE">IN_ACTIVE</option>
            </select>
          </div>
        <div className="search-Bar">
          <input
            type="text"
            placeholder="search by username , email , userRole"
            onChange={handleChange}
            value={val}
          />
          <span>
            <IoSearchSharp />
          </span>
        </div>
        <ContextProvider>
          <div className="createEmp">
            <span onClick={handleToggle}>create employee</span>
            {toggle && <CreateEmployeeForm prop={{ toggle, handleToggle }} />}
          </div>
        </ContextProvider>
        </div>
        
      </div>
      <div className="empcard-Data">
        {state === null ? <Spinner /> : selectedFilter ==="All" ? FilteredData : FilteredEmployeeStatus}
      </div>
    </section>
  );
};

export default EmpCardDetails;
