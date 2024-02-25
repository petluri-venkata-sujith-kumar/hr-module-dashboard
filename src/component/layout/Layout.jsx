import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { VscFolderActive } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaRegClipboard } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
// import Navbar from "../navbar/Navbar";
// import "/src/components/navbar/navbar.css";
import "../login/navbar/navbar.css"
import "./layout.css";
import Login from "../login/Login";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";
import Navbar from '../login/navbar/Navbar'

const Layout = () => {
  const { userData } = useUser();
  const isAuthenticated = !!userData;

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleProfileImageChange = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        `http://106.51.76.167:8080/user/userProfile?userId=${userData.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navbar />
          <div className="dashoard-container">
            <div className="dashboard">
              <div className="sidebar">
                <div className="profile">
                  <div className="profile-img-box">
                    {/* <img src="/public/profile.jpg" alt="" /> */}
                    <img
                      src={userData?.userProfile?.profilePath}
                      alt={userData.name}
                    />
                  </div>
                  <div className="edit-profile">
                    <label htmlFor="fileInput" className="edit-image-icon">
                      <IoSettingsOutline onClick={handleProfileImageChange} />
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                  <h3 className="name">{userData.name}</h3>
                  <p className="role">{userData.userRole}</p>
                </div>
                <div className="sidebar-items">
                  {[
                    {
                      to: "/dashboard",
                      icon: <MdOutlineDashboard />,
                      text: "Dashboard",
                    },
                    { to: "/batches", icon: <FiUsers />, text: "Batches" },
                    {
                      to: "/attendance",
                      icon: <FaRegClipboard />,
                      text: "Attendance",
                    },
                    {
                      to: "/timesheet",
                      icon: <VscFolderActive />,
                      text: "Timesheet",
                    },
                    {
                      to: "/logout",
                      icon: <RiLogoutBoxRLine />,
                      text: "Logout",
                    },
                  ].map(({ to, icon, text }) => (
                    <NavLink
                      key={to}
                      to={{ pathname: to, state: { userData: userData } }}
                      id="sidebar-item"
                      activeClassName="active"
                      activeStyle={{
                        borderColor: "#223169",
                        color: "#223169",
                      }}
                      className="sidebar-item"
                    >
                      {icon}
                      {text}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="outlet">
            <Outlet />
          </div>
          <div id="logout-portal"></div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Layout;
