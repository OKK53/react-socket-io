import "./card.css";
import {
  IoMdHeartEmpty,
  IoMdHeart,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { RiShareBoxFill } from "react-icons/ri";
import { useState } from "react";
function Card({ post, socket, user }) {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    type === 1 && setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
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
          <IoMdHeart
            className="cardIcon likedIcon"
            onClick={() => handleNotification(1)}
          />
        ) : (
          <IoMdHeartEmpty
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
        <IoMdInformationCircleOutline className="cardIcon infoIcon" />
      </div>
    </div>
  );
}

export default Card;
