import React, { useState } from 'react'
import './SidebarChat.css'
import Avatar from '@mui/material/Avatar';
import { useEffect } from 'react';
import db from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat({id,name,addNewChat}) {
  const [seed,setSeed] = useState('');
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
          <p>Last message....</p>
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