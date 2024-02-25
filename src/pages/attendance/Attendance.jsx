import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { MdLocationOn } from "react-icons/md";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import "./attendance.css";

const Attendance = () => {
  const [loginTime, setLoginTime] = useState("");
  const [logoutTime, setLogoutTime] = useState("");
  const [workingHours, setWorkingHour] = useState(0);
  const [attendanceId, setAttendanceId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(
    moment().format("YYYY-MM-DD HH:mm:ss")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(moment().format("MMMM Do YYYY, h:mm:ss A"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const { data } = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=0efb6094df9f49e988496398fa7af204`
      );
      setUserAddress(data.results[0].formatted);
    });
  }, []);

  const calculateWorkingHours = (login, logout) => {
    const timeDifferenceInMilliseconds = new Date(logout) - new Date(login);
    return (timeDifferenceInMilliseconds / (1000 * 60 * 60)).toFixed(2);
  };

  const handleLoginLogout = async () => {
    const currentTime = new Date().toISOString();

    if (!isLoggedIn) {
      try {
        const response = await axios.post(
          `http://106.51.76.167:8080/attendance/login/70`,
          {
            loginDateandTime: currentTime,
            batchs: [],
          }
        );
        const { attendanceId } = response.data.body;

        setAttendanceStatus("Logged In");
        toast.success("Successfully logged in");
        setAttendanceId(attendanceId);
        setLoginTime(currentTime);
        setIsLoggedIn(true);
      } catch (error) {
        toast.error("Error logging in");
      }
    } else {
      const workingHours = calculateWorkingHours(loginTime, currentTime);
      setWorkingHour(workingHours);

      let status = "ABSENT";
      if (workingHours >= 9) {
        status = "PRESENT";
      } else if (workingHours > 4 && workingHours < 8) {
        status = "HALF DAY";
      }

      setAttendanceStatus(status);

      const payload = {
        attendanceId,
        loginDateandTime: loginTime,
        logoutDateandTime: currentTime,
        totalWorkingHours: workingHours,
        attendanceStatus: status,
        location: userAddress,
        batchs: [],
      };

      try {
        await axios.put(`http://106.51.76.167:8080/attendance/logout`, payload);
        setLogoutTime(currentTime);
        toast.success("Successfully logged out");
        setIsLoggedIn(false);
      } catch (error) {
        toast.error("Error logging out");
      }
    }
  };

  return (
    <div id="attendance-container">
      <header>
        <span>
          <h2 className="header">My Attendance Details</h2>
        </span>
        <span className="timer">{currentDateTime}</span>
      </header>
      <main>
        <p className="current-location">
          <MdLocationOn />
          {userAddress}
        </p>

        <div id="login-details">
          <div className={`login-data-container ${loginTime ? "" : "disabled"}`}>
            <IoLogInOutline />
            <p className="local-login-time">
              <span>Logged In</span>
              <p>{loginTime && new Date(loginTime).toLocaleTimeString()}</p>
            </p>
          </div>
          <div className={`logout-data-container ${logoutTime ? "" : "disabled"}`}>
            <IoLogOutOutline />
            <p className="local-logout-time">
              <span>Logged Out</span>
              <p>{logoutTime && new Date(logoutTime).toLocaleTimeString()}</p>
            </p>
          </div>
        </div>

        <div className="attendance-status">
          <p>
            <strong>Attendance Status:</strong> {attendanceStatus}
          </p>
          <p>
            <strong>Total working hours:</strong> {workingHours} HR
          </p>
        </div>

        <button
          onClick={handleLoginLogout}
          className={
            isLoggedIn ? "attendance-login-btn" : "attendance-logout-btn"
          }
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </main>
    </div>
  );
};

export default Attendance;
