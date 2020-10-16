import React, { useEffect } from 'react';
import ChatHeader from './ChatHeader';
import './Chat.css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { selectUser } from './features/userSlice';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import firebase from 'firebase';
import db from './firebase';
import axios from './axios';
import Pusher from 'pusher-js';

const pusher = new Pusher('bb3c32020852050e9690', {
  cluster: 'ap2',
});

function Chat() {
  const user = useSelector(selectUser);
  const channelID = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const getConversation = (channelID) => {
    if (channelID) {
      axios.get(`/get/conversation?id=${channelID}`).then((res) => {
        console.log('inside axios get \u231A', res);
        setMessages(res.data[0].conversation);
      });
    }
  };

  useEffect(() => {
    // db.collection('channels')
    //   .doc(channelID)
    //   .collection('messages')
    //   .orderBy('timestamp', 'desc')
    //   .onSnapshot((snapshot) =>
    //     setMessages(snapshot.docs.map((doc) => doc.data()))
    //   );

    getConversation(channelID);
    const channel = pusher.subscribe('conversation');
    channel.bind('newMessage', function (data) {
      getConversation(channelID);
    });
  }, [channelID]);

  const sendMessage = (e) => {
    console.log('inside send messahe channelid', channelID, input);
    e.preventDefault();
    // db.collection('channels').doc(channelID).collection('messages').add({
    //   message: input,
    //   user: user,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });

    axios.post(`/new/message?id=${channelID}`, {
      message: input,
      user: user,
      timestamp: Date.now(),
    });

    setInput('');
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            timestamp={message.timestamp}
            user={message.user}
            message={message.message}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            disabled={!channelID}
            placeholder={`Message #${
              channelName ? channelName : 'Discord App'
            }`}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            className="chat__inputButton"
            type="submit"
            disabled={!channelID}
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
