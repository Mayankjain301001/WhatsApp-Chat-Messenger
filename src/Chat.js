import React, { useState } from 'react'
import './Chat.css'
import Avatar from '@mui/material/Avatar'
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';

function Chat() {
  const [seed,setSeed] = useState('');
  const [input,setInput] = useState('');
  const {roomId} = useParams();
  const [RoomName,setRoomName] = useState('');
  const [messages,setMessages] = useState([]); 

  useEffect(()=>{
    if(roomId){
      db.collection("Rooms").doc(roomId).onSnapshot(snapshot=>(
        setRoomName(snapshot.data().name)
      ))
      db.collection("Rooms").doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot=>(
        setMessages(snapshot.docs.map(doc=>doc.data()))
      ))
    }
  },[roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000));
  }, [roomId]);

  const sendMessage = (e)=>{
    e.preventDefault();
    console.log("You have typed a message: ",input);
    setInput('');
  }

  return (
    <div className='chat'>
        <div className='chat__header'>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className='chat_headerInfo'>
            <h3>{RoomName}</h3>
            <p>Last seen at</p>
          </div>
          <div className='chat_headerRight'>
            <IconButton>
                <SearchIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className='chat__body'>
          {messages.map((message)=>(
            <p className={`chat__message ${true && 'chat__receiver'}`}><span className='chat__name'>{message.name}</span>{message.message}
            <span className='chat__timeStamp'>
              {
                new Date(message.timestamp?.toDate()).toLocaleString()
              }
            </span>
            </p>
          ))}
            
        </div>
        <div className='chat__footer'>
            <InsertEmoticonIcon />
            <AttachmentIcon className='attach' />
            <form>
              <input value={input} 
              onChange={e=>{
                setInput(e.target.value);
              }}
              placeholder='Type a message' type="text" />
              <button onClick={sendMessage} type="submit">Send a message</button>
            </form>
            <MicIcon />
        </div>
    </div>
  )
}

export default Chat