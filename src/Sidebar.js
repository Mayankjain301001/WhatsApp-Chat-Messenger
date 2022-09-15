import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import Avatar from '@mui/material/Avatar';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [rooms,setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();
    useEffect(() => {
      db.collection('Rooms').onSnapshot(snapshot =>(
        setRooms(snapshot.docs.map(doc=>(
            {
                id: doc.id,
                data: doc.data()
            }
        )))
      ))
    }, [])

    const logout = ()=>{
        window.location.href = "/";
    }
    
  return (
    <div className='sidebar'>
        <div className='sidebar__header'>
            <Avatar src={user?.photoURL} />
            <div className='sidebar__headerRight'>
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon /> 
                </IconButton>
                {/* <IconButton> */}
                <div className='log'>Log out</div>
                <Button component={Link} to="/"><LogoutIcon onClick={logout} className="dust"/></Button>
                {/* </IconButton> */}
            </div>
        </div>
        <div className='sidebar__search'>
            <div className='sidebar__searchContainer'>
                <SearchIcon />
                <input placeholder='Search or start new chat' type="text" />
            </div>
        </div>
        <div className='sidebar__chats'>
            <SidebarChat addNewChat />
            {rooms.map(room=>(
                <SidebarChat key={room.id} id={room.id} name={room.data.name} />
            ))}
        </div>
    </div>
  )
}

export default Sidebar;