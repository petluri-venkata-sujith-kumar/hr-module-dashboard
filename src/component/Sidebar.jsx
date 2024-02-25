import React, { useState } from "react";
import { FaTh, FaBars, FaRegChartBar , FaUsers } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";

const Sidebar = () => {
 const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const dashboardtoggle = () => setIsOpen(!isOpen);
  const toggleIcon=()=>setIsOpen(false);
  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    console.log(isConfirmed);
    if (isConfirmed) {
      navigate("/");
    }
  };
  const menuItem = [
    {
      path: "/hrdashboard",
      name: "Dashboard",
      icon: <FaTh title="Dashboard"/>,
    },
    {
      path: "/hrdashboard/batchs",
      name: "Batchs",
      icon: <FaRegChartBar title="Batches" />,
    },
    {
      path: "/hrdashboard/employee",
      name: "Employee",
      icon: <FaUsers title="Employees"/>,
    },
    {
      name: "Logout",
      icon: <TbLogout title="Logout" />,
      onClick:handleLogout
    },


  ];
  return (
    <div className="hr-Dashboard">
      <div className="container-container">
        <div className={`hr-Sidebar ${isOpen ? "open" : ""}`}>
          <div className="top-Section">
            <div className="logo-hrdashboard">
              <img
                src="logo.png"
                alt=""
                style={{ display: isOpen ? "block" : "none" }}
              />
            </div>
            <h5
              className="logo-Text"
              style={{ display: isOpen ? "block" : "none" }}
            >
              ALPHA TEAM
            </h5>
            <div className="Bars-icon">
              <FaBars onClick={dashboardtoggle}/>
            </div>
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="logo-Text"
          ></div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeClassName="active"
              exact
            > 
              <div className="icon-icon" onClick={item.onClick ||toggleIcon} onKeyUp={item.onClick || toggleIcon}>{item.icon}</div>
           
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
                onClick={item.onClick ||toggleIcon}
                onKeyDown={item.onClick || toggleIcon}
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <main className={`${isOpen ? "opened" : "closed"}`} >{<Outlet />}</main>
    </div>
  );
};

export default Sidebar;