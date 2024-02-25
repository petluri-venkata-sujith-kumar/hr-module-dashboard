/* eslint-disable react/prop-types */
import { useState } from "react";
import { createPortal } from "react-dom";
import "./logout.css";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [isOpen, setIsOpen] = useState(true);
  let navigate = useNavigate();

  const closePopup = () => {
    setIsOpen(!isOpen);
  };

  // clearing the user data from local storage
  const handleLogout = (confirmed) => {
    setIsOpen(!isOpen);
    if (confirmed) {
      navigate("/");
      window.localStorage.removeItem("userData");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {isOpen &&
        createPortal(
          <div className="popup-overlay">
            <section className="blur-background" onClick={closePopup}>
              <article
                className="logout-container"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="inner-logout-container">
                  <div className="logout-content">
                    Are you sure you want to logout?
                  </div>
                  <div className="button-container">
                    <button onClick={() => handleLogout(true)}>Yes</button>
                    <button onClick={() => handleLogout(false)}>No</button>
                  </div>
                </div>
              </article>
            </section>
          </div>,
          document.getElementById("logout-portal")
        )}
    </>
  );
};

export default Logout;
