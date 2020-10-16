import React, { useEffect } from 'react';
import './Sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';
import { useState } from 'react';
import axios from './axios';
import Pusher from 'pusher-js';

const pusher = new Pusher('bb3c32020852050e9690', {
  cluster: 'ap2',
});

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState();

  const getChannels = () => {
    axios.get('/get/channelList').then((res) => {
      console.log('>>>get channel from axios', res.data);
      setChannels(res.data);
    });
  };

  useEffect(() => {
    const channel = pusher.subscribe('channels');
    channel.bind('newChannel', function (data) {
      getChannels();
    });
    getChannels();
  }, []);
  const handleAddChannel = () => {
    const channelName = prompt('Enter Channel Name');
    if (channelName) {
      // db.collection('channels').add({
      //   channelName: channelName,
      // });
      axios.post('/new/channel', {
        channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h2>Tech React</h2>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channel</h4>
          </div>
          <AddIcon
            onClick={handleAddChannel}
            className="sidebar__addChannel"
          ></AddIcon>
        </div>
        <div className="sidebar__channelsList">
          {/* //!Map through every channel and return sidebarchannel
            //!(({ id, channel })  --destructuring*/}

          {console.log('channellogging', channels)}
          {channels?.map((channel) => (
            <SidebarChannel
              key={channel.id}
              id={channel.id}
              channelName={channel.name}
            />
          ))}
        </div>
      </div>
      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontsize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcon">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={user?.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user?.displayName}</h3>
          <p>#{user?.uid.substring(0, 5)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
