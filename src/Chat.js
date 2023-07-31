import React, {useState, useEffect} from 'react';
import { Avatar, IconButton } from '@mui/material';
import {AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';
import db from './Firebase';
import "./Chat.css";

function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();
    const { roomId } = useParams();

    useEffect(() => {
        if(roomId){
            //Pull data and get their room name
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) =>(setRoomName(snapshot.data().name)));
            //Pull data and get a message
            db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(
            Math.random() * 5000)
        );
    }, [roomId]);

    const sendMessage = (e) =>{
        e.preventDefault();
        //Send a message
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    }

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chat_headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}
                    {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className='chat_headerRight'>
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className='chat_body'>
                {/* Show messages with contents, user name and time */}
                {messages.map((message) => (
                    <p className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
                    <span className='chat_name'>{message.name}</span>
                    {message.message}
                    <span className='chat_timestamp'>
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
                ))}
            </div>
            <div className='chat_footer'>
                <IconButton>
                    <InsertEmoticon/>
                </IconButton>
                <form>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder='Type a message'
                        type='text'
                    />
                    <button type='submit' onClick={sendMessage}>Send message</button>
                </form>
                <IconButton>
                    <Mic/>
                </IconButton>
            </div>
        </div>
  )
};

export default Chat;