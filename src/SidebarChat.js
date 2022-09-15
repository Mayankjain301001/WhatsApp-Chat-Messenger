import React, { useState } from 'react'
import './SidebarChat.css'
import Avatar from '@mui/material/Avatar';
import { useEffect } from 'react';
import db from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat({id,name,addNewChat}) {
  const [seed,setSeed] = useState('');
  const [message,setMessage] = useState("");
  useEffect(()=>{
    if(id){
      db.collection("Rooms").doc(id).collection("messages").orderBy('timestamp','desc').onSnapshot(snapshot=>
         setMessage(
        snapshot.docs.map((doc)=>doc.data())
      ))
    }
  },[id])

  useEffect(() => {
    setSeed(Math.floor(Math.random()*5000));
  }, [])
  
  const createChat = ()=>{
    const roomName = prompt("Enter name for chat");
    if(roomName){
      //do some stuff in DB
      db.collection("Rooms").add({
        name: roomName
      })
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='sidebarChat__info'>
          <h2>{name}</h2>
          <p>{message[0]?.message.substring(0,42)}{message[0]?.message.length>42?"...":""}</p>
        </div>
      </div>
    </Link>
  ):(
    <div onClick={createChat} className='sidebarChat'>
      <h2>Add new Chat</h2>
    </div>
  )
}

export default SidebarChat