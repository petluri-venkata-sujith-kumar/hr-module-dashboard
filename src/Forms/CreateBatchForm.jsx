import React, { useState } from "react";
import toast from "react-hot-toast";
import "./createBatch.css";
import { AxiosInstance } from "../Instance/AxiosInstance";

const CreateBatchForm = ({prop}) => {
  let { toggle, handleToggle } = prop;
  console.log(toggle);
  const [batchData, setBatchData] = useState({
    batchcode: "",
    subjectName: "",
    batchStatus: "NOT_YET_ASSIGNED",
    batchStartDate: "",
    batchEndDate: "",
    instituteName: "",
    batchMode: "",
    location: "",
  });

  let {
    batchcode,
    subjectName,
    batchStatus,
    batchStartDate,
    batchEndDate,
    instituteName,
    batchMode,
    location,
  } = batchData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatchData({
      ...batchData,
      [name]: value,
    });
  };

  let postdata = async () => {
    let payload = {
      batchcode,
      subjectName,
      batchStatus,
      batchStartDate,
      batchEndDate,
      batchMode,
      instituteName,
      location,
    };
    try {
      await AxiosInstance.post("batch", payload);
      toast.success("Data Created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Data Not Created");
    }
    console.log(payload);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postdata();
  };

  const [isFocused, setIsFocused] = useState({
    batchcode: false,
    subjectName: false,
    batchStatus: false,
    batchStartDate: false,
    batchEndDate: false,
    instituteName: false,
    batchMode: false,
    location: false,
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
    <div>
      {toggle && (
        <div className="form-Conatiner">
          <div className="batch-Container">
            <div>
              <h2 className="create-Batch">
                Create Batch
                <button id="close-Btn" onClick={handleToggle}>
                  X
                </button>
              </h2>
            </div>
            <form className="batch-Form" onSubmit={handleSubmit}>
              <div className="input-Container">
                <div className="wrap-Container">
                  <input
                    type="text"
                    id="batchcode"
                    name="batchcode"
                    value={batchcode}
                    onChange={handleInputChange}
                    className={isFocused.batchcode ? "focus" : ""}
                    required
                  />
                  <label htmlFor="batchcode">batchcode:</label>
                </div>

                <div className="wrap-Container">
                  <input
                    type="text"
                    id="subjectName"
                    name="subjectName"
                    value={subjectName}
                    required
                    className={isFocused.subjectName ? "focus" : ""}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="subjectName">subjectName:</label>
                </div>
              </div>

              <div className="input-Container">
                <div className="wrap-Container">
                  <input
                    type="date"
                    id="batchStartDate"
                    name="batchStartDate"
                    value={batchStartDate}
                    onChange={handleChange}
                    className="focus"
                    required
                  />
                  <label htmlFor="batchStartDate">batchStartDate:</label>{" "}
                </div>

                <div className="wrap-Container">
                  <input
                    type="date"
                    id="batchEndDate"
                    name="batchEndDate"
                    value={batchEndDate}
                    onChange={handleChange}
                    className="focus"
                    required
                  />
                  <label htmlFor="batchEndDate"> batchEndDate:</label>
                </div>
              </div>

              <div className="input-Container">
                <div className="wrap-Container">
                  <input
                    id="batchStatus"
                    name="batchStatus"
                    value={batchStatus.toUpperCase()}
                    onChange={handleChange}
                    className="focus"
                    required
                  />

                  <label htmlFor="batchStatus">batchStatus:</label>
                </div>

                <div className="wrap-Container">
                  <input
                    type="text"
                    id="instituteName"
                    name="instituteName"
                    value={instituteName}
                    onChange={handleInputChange}
                    className={isFocused.instituteName ? "focus" : ""}
                    required
                  />
                  <label htmlFor="instituteName"> instituteName:</label>
                </div>
              </div>
              <div className="input-Container">
                <div className="wrap-Container">
                  <select
                    id="batchMode"
                    name="batchMode"
                    value={batchMode.toUpperCase()}
                    onChange={handleInputChange}
                    className="focus"
                    required
                  >
                    <option value="">SELECT</option>
                    <option value="ONLINE">ONLINE</option>
                    <option value="OFFLINE">OFFLINE</option>
                  </select>
                  <label htmlFor="batchMode"> batchMode:</label>
                </div>

                <div className="wrap-Container">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={location}
                    onChange={handleInputChange}
                    className={isFocused.location ? "focus" : ""}
                    required
                  />
                  <label htmlFor="location"> location:</label>
                </div>
              </div>

              <button type="submit" id="create-Batchbtn" onClick={handleToggle}>
                Create Batch
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBatchForm;
