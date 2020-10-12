import { Avatar } from '@material-ui/core';
import React from 'react';
import './Message.css';
function Message({ message, user, timestamp }) {
  return (
    <div className="message">
      <Avatar className="message__avatar" src={user?.photo} />
      <div className="messsage__info">
        <h5>
          <span className="message__displayName">{user.displayName}</span>
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h5>
        <p font-style="Arial Verdana">{message}</p>
      </div>
    </div>
  );
}

export default Message;
