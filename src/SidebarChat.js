import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import db from './Firebase';
import "./SidebarChat.css";

function SidebarChat({id, name, addNewChat}) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() => {
        setSeed(Math.floor(
            Math.random() * 5000)
        );
    }, []);

    useEffect(()=>{
        if(id){
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    }, [id]);

    const createChat = () =>{
        const roomName = prompt("Please enter name for chat");
        //Add new chat
        if(roomName){
            db.collection("rooms").add({
                name: roomName,
            });
        } 
    };
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>       
        {/* Click link to spesific chat */} 
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='sidebarChat_info'>
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    )
    : (
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add New Chat</h2>
        </div>
    );
};

export default SidebarChat;