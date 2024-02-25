/* eslint-disable react/prop-types */
import { FaJava } from "react-icons/fa"; //java
import { CiDatabase } from "react-icons/ci"; //database
import { LiaNodeJs } from "react-icons/lia"; //nodejs
import { TbBrandJavascript } from "react-icons/tb"; //js
import { FaReact } from "react-icons/fa"; //react
import { FaPython } from "react-icons/fa";
import { BiLogoSpringBoot } from "react-icons/bi";
import { SiHibernate } from "react-icons/si";

const Batch = ({ batch }) => {
  let {
    batchId,
    batchCode,
    subjectName,
    batchStatus,
    batchStartDate,
    batchEndDate,
    batchMode,
    instituteName,
    location,
  } = batch;
  let batchStartobj = new Date(batchStartDate);
  let batchEndobj = new Date(batchEndDate);
  const timeDifference = batchEndobj - batchStartobj;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  };

  let SetIcon = () => {
    switch (true) {
      case subjectName.toLowerCase().includes("javascript"):
        return <TbBrandJavascript></TbBrandJavascript>;
      case subjectName.toLowerCase().includes("java"):
        return <FaJava></FaJava>;
      case subjectName.toLowerCase().includes("j2ee"):
        return <FaJava></FaJava>;
      case subjectName.toLowerCase().includes("react"):
        return <FaReact></FaReact>;
      case subjectName.toLowerCase().includes("mongodb"):
        return <CiDatabase></CiDatabase>;
      case subjectName.toLowerCase().includes("nodejs"):
        return <LiaNodeJs></LiaNodeJs>;
      case subjectName.toLowerCase().includes("sql"):
        return <CiDatabase></CiDatabase>;
      case subjectName.toLowerCase().includes("python"):
        return <FaPython></FaPython>;
      case subjectName.toLowerCase().includes("spring"):
        return <BiLogoSpringBoot></BiLogoSpringBoot>;
      case subjectName.toLowerCase().includes("hibernate"):
        return <SiHibernate></SiHibernate>;
      default:
        return null;
    }
  };

  return (
    <section
      className={`batch ${batchEndDate < getCurrentDate() ? "completed" : ""} ${
        batchStartDate <= getCurrentDate() && batchEndDate >= getCurrentDate()
          ? "current"
          : ""
      } ${batchStartDate > getCurrentDate() ? "upcoming" : ""}`}
    >
      <article className="batch-card">
        <div>
          <h1>
            {subjectName}
            <span className="batch-status">{` (${
              batchEndDate < getCurrentDate() ? "Completed" : ""
            } ${
              batchStartDate <= getCurrentDate() &&
              batchEndDate >= getCurrentDate()
                ? "Ongoing"
                : ""
            } ${batchStartDate > getCurrentDate() ? "Upcoming" : ""})`}</span>
          </h1>
          <div className="batch-date">
            <p>
              <span className="label">Start :</span> {batchStartDate}
            </p>
            <p>
              <span className="label">End :</span> {batchEndDate}
            </p>
          </div>
        </div>
        <p>
          <span className="label">Batch ID:</span> {batchId}
        </p>
        <p>
          <span className="label">Batch Code:</span> {batchCode}
        </p>
        <p>
          <span className="label">Batch Status:</span> {batchStatus}
        </p>

        <p>
          <span className="label">Total Days:</span> {daysDifference}
        </p>
        <p>
          <span className="label">Batch Mode:</span> {batchMode}
        </p>
        <p>
          <span className="label">Institute Name:</span> {instituteName}
        </p>
        <p>
          <span className="label">Location:</span> {location}
        </p>
      </article>
      <span className="icon-item">
        <SetIcon></SetIcon>
      </span>
    </section>
  );
};

export default Batch;
