import "./navbar.css";
import { MdNotifications, MdLocalPostOffice } from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";
import { useEffect, useState } from "react";

function Navbar({ socket }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type }, idx) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span
        key={idx}
        className="notification"
      >{`${senderName} ${action} your post.`}</span>
    );
  };

  // console.log(notifications);

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };
  return (
    <div className="navbar">
      <span className="logo">OKK App</span>
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <MdNotifications className="iconImg" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon">
          <MdLocalPostOffice className="iconImg" />
        </div>
        <div className="icon">
          <RiSettings3Fill className="iconImg" />
        </div>
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n, idx) => displayNotification(n, idx))}
          {notifications.length > 0 && (
            <button className="nButton" onClick={handleRead}>
              Mark as read
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
