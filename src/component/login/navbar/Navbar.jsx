import { IoNotificationsOff, IoNotificationsSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import Notification from "./Notification";
import "./navbar.css";

const Navbar = () => {
  let [toggle, setToggle] = useState(false);

  let handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <section className="navbar-container">
        <article>
          <div className="icon">
            <img
              src="/public/alpha-logo-1.png"
              alt="Logo"
              className="alpha_icon"
            />
          </div>
          <div className="search">
            <div className="search-container">
              <span>
                <FiSearch />
              </span>
              <input type="text" placeholder="Search..."></input>
            </div>
          </div>
          <div className="notification">
            <div onClick={handleToggle} className="notify_toggle">
              {toggle ? (
                <IoNotificationsSharp className="notify" />
              ) : (
                <IoNotificationsOff className="notify" />
              )}
            </div>
            {toggle ? <Notification toggle={{ toggle, handleToggle }} /> : ""}
          </div>
        </article>
      </section>
    </>
  );
};

export default Navbar;
