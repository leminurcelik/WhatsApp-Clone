import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';
import { useStateValue } from './StateProvider';
import SidebarChat from './SidebarChat';
import db from './Firebase';
import "./Sidebar.css";

function Sidebar() {
    const [rooms,setRooms] = useState([]);
    const [{user}, dispatch] =useStateValue();

    //Retrieve rooms from database
    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar_headerRight'>
                    <IconButton>
                        <DonutLarge/>
                    </IconButton>
                    <IconButton>
                        <Chat/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlined/>
                    <input
                        placeholder='Search or start new chat'
                        type='text'
                    />
                </div>
            </div>
            {/* Show the name of rooms on the left side */}
            <div className='sidebar_chats'>
                <SidebarChat addNewChat/>
                {rooms.map((room) => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
};

export default Sidebar;