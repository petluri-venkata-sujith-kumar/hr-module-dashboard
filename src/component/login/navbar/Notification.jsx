import "./Notification.css";
import { RxCross2 } from "react-icons/rx";
import ReactDOM from "react-dom";

const Notification = ({ toggle: { toggle, handleToggle } }) => {
  return ReactDOM.createPortal(
    <div className="notification-container">
      <div className="btn-block">
        <button onClick={handleToggle}>{toggle ? <RxCross2 /> : "  "}</button>
      </div>
      <div className="message-container">
        <div className="messages">Messages</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Notification;
