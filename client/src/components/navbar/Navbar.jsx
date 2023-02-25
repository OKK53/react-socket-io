import "./navbar.css";
import { MdNotifications, MdLocalPostOffice } from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";
import { useEffect, useState } from "react";

function Navbar({ socket }) {
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [openNofitications, setOpenNofitications] = useState(false);
  const [openMessages, setOpenMessages] = useState(false);

  useEffect(() => {
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
    socket.on("getMsg", (data) => {
      setMessages((prev) => [...prev, data]);
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

  const displayMessage = ({ senderName, msg }, idx) => {
    return (
      <span key={idx} className="notification">{`${senderName}: ${msg} `}</span>
    );
  };

  // console.log(notifications);
  const handleNotification = () => {
    if (notifications.length > 0) {
      setOpenNofitications(!openNofitications);
      setOpenMessages(false);
    }
  };
  const handleMessages = () => {
    if (messages.length > 0) {
      setOpenMessages(!openMessages);
      setOpenNofitications(false);
    }
  };

  const handleReadNotifications = () => {
    setNotifications([]);
    setOpenNofitications(false);
  };

  const handleReadMessages = () => {
    setMessages([]);
    setOpenMessages(false);
  };

  return (
    <div className="navbar">
      <span className="logo">OKK App</span>
      <div className="icons">
        <div className="icon" onClick={handleNotification}>
          <MdNotifications className="iconImg" />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon" onClick={handleMessages}>
          <MdLocalPostOffice className="iconImg" />
          {messages.length > 0 && (
            <div className="counter">{messages.length}</div>
          )}
        </div>
        <div className="icon">
          <RiSettings3Fill className="iconImg" />
        </div>
      </div>
      {openNofitications && (
        <div className="notifications">
          {notifications.map((n, idx) => displayNotification(n, idx))}
          {notifications.length > 0 && (
            <button className="nButton" onClick={handleReadNotifications}>
              Mark as read
            </button>
          )}
        </div>
      )}
      {openMessages && (
        <div className="notifications">
          {messages.map((n, idx) => displayMessage(n, idx))}
          {messages.length > 0 && (
            <button className="nButton" onClick={handleReadMessages}>
              Mark as read
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
