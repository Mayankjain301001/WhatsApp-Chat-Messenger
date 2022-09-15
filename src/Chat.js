import React, { useState } from 'react'
import './Chat.css'
import Avatar from '@mui/material/Avatar'
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase/compat/app';
import { useStateValue } from './StateProvider';
import { doc, deleteDoc } from "firebase/firestore";
import Picker from 'emoji-picker-react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Chat() {
  const [seed,setSeed] = useState('');
  const [input,setInput] = useState('');
  const {roomId} = useParams();
  const [RoomName,setRoomName] = useState('');
  const [messages,setMessages] = useState([]); 
  const [{user},dispatch] = useStateValue();
  const [show,setShow] = useState(false);
  
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
    if(input.length===0) return;
    e.preventDefault();
    console.log("You have typed a message: ",input);
    db.collection('Rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      email: user.email,
    })
    setInput('');
  }
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setInput(input+emojiObject.emoji);
    setShow(false);
  };

  const delete123 = ()=>{
    deleteDoc(doc(db, "Rooms", roomId));
  }

  const update = ()=>{
    const newName = prompt("Edit the chat-room name");
    if(newName.length==0) return;
    if(newName[0]===' '){
      alert("First character of room name should not be an empty space"); return;
    }
    db.collection("Rooms").doc(roomId).update({name: newName});
  }

  return (
    <div className='chat'>
        <div className='chat__header'>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className='chat_headerInfo'>
            <h3>{RoomName}</h3>
            <p>
              {
                new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleString() === "Invalid Date" ? "No activity" : `last seen at ${new Date(messages[messages.length-1]?.timestamp?.toDate()).toLocaleString()}`
              }
            </p>
          </div>
          <div className='chat_headerRight'>
            <IconButton>
              <EditIcon onClick={update} />
            </IconButton>
              <Button className="dust" component={Link} to="/rooms"><DeleteIcon className="dust" onClick={ delete123} /></Button>
          </div>
        </div>
        <div className='chat__body'>
          {messages.map((message)=>(
            <p className={`chat__message ${message.email === user.email && 'chat__receiver'}`}><span className='chat__name'>{message.name}</span>{message.message}
            <span className='chat__timeStamp'>
              {
                new Date(message.timestamp?.toDate()).toLocaleString()
              }
            </span>
            </p>
          ))}
            
        </div>
        <div className='chat__footer'>
            <InsertEmoticonIcon className="emoji" onClick={()=> setShow(val=>!val)} />
            {show && <Picker pickerStyle={{width: '100%'}} onEmojiClick={onEmojiClick} />}
            <AttachmentIcon className='attach' />
            <form>
              <input value={input} 
              onChange={e=>{
                setInput(e.target.value);
              }}
              placeholder='Type a message' type="text" />
              <button onClick={sendMessage} type="submit">Send a message</button>
            </form>
            <SendIcon className="emoji" onClick={sendMessage} />
        </div>
    </div>
  )
}

export default Chat;