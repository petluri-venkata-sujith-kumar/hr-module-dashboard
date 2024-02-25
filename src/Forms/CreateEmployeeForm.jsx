import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./createEmployee.css";
import { AxiosInstance } from '../Instance/AxiosInstance';

const CreateEmployeeForm = ({ prop }) => {
  let { toggle, handleToggle } = prop;
  const [employeeData, setEmployeeData] = useState({
    empId: "",
    name: "",
    email: "",
    phone: "",
    userRole: "",
    userStatus: "",
  });

  let { empId, name, email, phone, userRole, userStatus } = employeeData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  let payload = {
    userId: 0,
    empId: empId,
    email: email,
    name: name,
    password: "string",
    phone: phone,
    userRole: userRole,
    userStatus: userStatus,
    userCategory: "TRAINER",
    timeSheets: [],
    batchs: [],
  };
  const hadleButton = async () => {
    try {
      await AxiosInstance.post("user", payload);
      toast.success("Data Created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Data Not Created");
    } finally {
      handleToggle();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [isFocused, setIsFocused] = useState({
    empId: false,
    name: false,
    email: false,
    phone: false,
    userRole: false,
    userStatus: false,
  });

  const handleFocus = (name) => {
    setIsFocused({ ...isFocused, [name]: true });
  };

  const handleBlur = (name) => {
    setIsFocused({ ...isFocused, [name]: false });
  };

  const handleInputChange = (e) => {
    handleChange(e);
    if (e.target.value.length !== 0) {
      handleFocus(e.target.name);
    } else {
      handleBlur(e.target.name);
    }
  };

  return (
    <div id="form_Container">
      {toggle && (
        <>
          <Toaster />
          <div className="main-form">
            <div className="employee-Container">
              <div>
                <h2 className="create-Employee">
                  Create Employee
                  <button id="close-Btn" onClick={handleToggle}>
                    X
                  </button>
                </h2>
              </div>
              <form className="employee-Form" onSubmit={handleSubmit}>
                <div className="Fd">
                  <div className="Wrap">
                    <input
                      type="text"
                      id="employeeId"
                      name="empId"
                      value={empId}
                      onChange={handleInputChange}
                      className={isFocused.empId ? "focus" : ""}
                      required
                    />
                    <label htmlFor="employeeId" className="label">
                      Employee ID
                    </label>
                  </div>

                  <div className="Wrap">
                    <input
                      type="text"
                      id="employeeName"
                      name="name"
                      value={name}
                      required
                      className={isFocused.name ? "focus" : ""}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="employeeName" className="label">
                      Name
                    </label>
                  </div>
                </div>

                <div className="Fd">
                  <div className="Wrap">
                    <input
                      type="email"
                      id="employeeEmail"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      className={isFocused.email ? "focus" : ""}
                      required
                    />
                    <label htmlFor="employeeEmail" className="label">
                      Email
                    </label>
                  </div>

                  <div className="Wrap">
                    <input
                      type="tel"
                      id="employeePhone"
                      name="phone"
                      value={phone}
                      onChange={handleInputChange}
                      className={isFocused.phone ? "focus" : ""}
                      required
                    />
                    <label htmlFor="employeePhone" className="label">
                      Phone Number
                    </label>
                  </div>
                </div>

                <div className="Fd">
                  <div className="Wrap">
                    <select
                      id="userRole"
                      name="userRole"
                      value={userRole.toUpperCase()}
                      onChange={handleInputChange}
                      className={isFocused.userStatus ? "focus" : ""}
                      required
                    >
                      <option value=""></option>
                      <option value="TRAINER">TRAINER</option>
                      <option value="LATERAL">LATERAL</option>
                    </select>
                    <label htmlFor="userRole" className="label">
                      User Role
                    </label>
                  </div>

                  <div className="Wrap">
                    <select
                      id="userStatus"
                      name="userStatus"
                      value={userStatus.toUpperCase()}
                      onChange={handleInputChange}
                      className={isFocused.userStatus ? "focus" : ""}
                      required
                    >
                      <option value=""></option>
                      <option value="ACTIVE">Active</option>
                      <option value="IN_ACTIVE">In Active</option>
                    </select>
                    <label htmlFor="userRole" className="label">
                      User Status
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={hadleButton}
                  id="create-Employeebtn"
                >
                  Create Employee
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateEmployeeForm;
