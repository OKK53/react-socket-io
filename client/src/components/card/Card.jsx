import "./card.css";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import {
  RiHeartLine,
  RiHeartFill,
  RiShareBoxFill,
  RiMessageLine,
} from "react-icons/ri";
import { useState } from "react";
function Card({ post, socket, user }) {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    if (type === 1 && liked === false) {
      setLiked(true);
    } else if (type === 1 && liked === true) {
      setLiked(false);
      return;
    }
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  const handleMessage = (type) => {
    let time = new Date().toLocaleTimeString();
    socket.emit("sendMsg", {
      senderName: user,
      receiverName: post.username,
      type,
      msg: `Hello, I'm ${user} (${time})`,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <RiHeartFill
            className="cardIcon likedIcon"
            onClick={() => handleNotification(1)}
          />
        ) : (
          <RiHeartLine
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}
        <FaRegComment
          className="cardIcon"
          onClick={() => handleNotification(2)}
        />
        <RiShareBoxFill
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        <RiMessageLine className="cardIcon" onClick={() => handleMessage(3)} />
        <IoMdInformationCircleOutline className="cardIcon infoIcon" />
      </div>
    </div>
  );
}

export default Card;
