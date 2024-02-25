import { GoDotFill } from "react-icons/go";
import {
    MdOutlineModeEdit,
    MdOutlineEmail,
    MdOutlinePermIdentity,
  } from "react-icons/md";
  import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import "./EmpCardDetails.css"
const EmpCard = ({employee}) => {
  let {userId}=useParams();
  return (
    employee.userRole === "TRAINER" && (
        <div className="wrapper-wrapperclass">
          <div className="empDetails-Details">
            <div className="empimg-Image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFu5WDw6aMzlagbH8C4SjJ0NpznQXPSxAiw&usqp=CAU"
                alt="employee-img"
              />
              <div className="nameEMP">{employee.name}</div>
              <div className="roleEMP">{employee.userRole}</div>
              <div className="statusEMP">
                {employee.userStatus === "IN_ACTIVE" ? (
                  <GoDotFill color="red" />
                ) : (
                  <GoDotFill color="green" />
                )}
              </div>
              <span className="edit_icon">
                <MdOutlineModeEdit />
                <span className="tooltip">edit</span>
              </span>
              <span className="viewMoreData">
                <Link to={`/hrdashboard/employee/${employee.userId}`}><BsThreeDotsVertical /></Link>
                <span className="tooltip">view more</span>
              </span>
            </div>
            <div className="info-DATA">
              <div>
                <span className="info_icons">
                  <MdOutlineEmail />
                </span>
                {employee.email.length > 20
                  ? employee.email.slice(0, 20) + "..."
                  : employee.email}
              </div>
              <div>
                <span className="info_icons">
                  <MdOutlinePermIdentity
                    style={{ fontSize: "1.2em", fontWeight: "100" }}
                  />
                </span>
                {employee.empId}
              </div>
            </div>
          </div>
        </div>
      )
  )
}

export default EmpCard