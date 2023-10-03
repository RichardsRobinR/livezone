'use client';
import CustomNavbar from "@/components/customNavbar";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    socketInstance: WebSocket;
  }

  
interface Message {
    name: string;
    text: string;
    isSender: boolean;
  }

const SocketClient = (props: Props) => {
  const [newSocket, setSocket] = useState<WebSocket>(props.socketInstance);
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [UserName, setUserName] = useState(searchParams.get("name"));
  const notify = () => toast.info("New User Connected");

  useEffect(() => {
    console.log("omgtop");
    // setSocket(person.name);
    // const newSocket = new WebSocket("ws://localhost:8080");
    //const newSocket = new WebSocket("ws://0.tcp.in.ngrok.io:17400");

    newSocket.onopen = (event) => {
        console.log('WebSocket connection established.');
        // Send initial message if needed: socket.send('Hello, server!');
      };
      
    newSocket.onmessage = (event) => {
        console.log('Received message from server:', event.data);
        

        const message = String(event.data);
        const messageList = message.split("<->");


        const userNameMessage = messageList[messageList.length -1];
        const displayMessage = userNameMessage.split("|")[1]; //display message
        console.log(userNameMessage);
        console.log(displayMessage);
        const recievedUserName = userNameMessage.split("|")[0];
        

        if (displayMessage != undefined) {
            const isSenderValue = UserName === recievedUserName;
            setMessages((prevMessages) => {
                // if (prevMessages.includes(displayMessage)) {
                //     return prevMessages; // Message already exists, no need to add again
                // }
                return [...prevMessages,{ name: recievedUserName, text: displayMessage, isSender : isSenderValue }];
            });
        } else {
           notify();
        }
        

       
        console.log(messages);

      };
      
      newSocket.onclose = () => {
        console.log('WebSocket connection closed.');
      };

    //   setSocket(newSocket);
      
      return () => {
          if (newSocket.readyState === 1) { // <-- This is important
            newSocket.close();
          }
      //   socket.close();
      };
  }, []);


  const sendMessage = (message: string) => {
    if (newSocket) {
        newSocket.send(UserName +"|" +  message);
    }
  };

  const handleChange = (e : any) => {   
    setInputText(e.target.value);
  };


  const onKeyDown = (e : any) => {
    if (e.keyCode === 13) {
        messageHandle();
      }
  }

  const messageHandle = () => {
    sendMessage(inputText) 
    setInputText("")
  }

  return (
    <div className="flex flex-col h-screen">

    <CustomNavbar/>


      <div className="flex-1 p-6 overflow-y-auto  bg-primary-content ">
        <ToastContainer />
        <div id="chatMessages" className="flex flex-col ">
          

        {messages.map((messagea,index) => (
            <div className= {`chat ${messagea.isSender ? 'chat-end' : 'chat-start'}`} key={index}>
            <div className="chat-header" >
                {messagea.name}
            </div>
            <div className="chat-bubble chat-bubble-secondary">{messagea.text}</div>
            </div>
      
        ))}


        </div>
      </div>
      <div className="join">
        <input className="input input-bordered join-item w-full " onKeyDown={onKeyDown} value={inputText} onChange={handleChange}  placeholder="Enter your message" type="text"/>
        <button className="btn join-item   "  onClick={messageHandle}>
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(45)">

            <g id="SVGRepo_bgCarrier" stroke-width="0"/>

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

            <g id="SVGRepo_iconCarrier"> <path d="M20 4L13 21L10 14M20 4L12 7.29412M20 4L10 14M10 14L3 11L7 9.35294" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </g>

            </svg>
        </button>
        </div>
</div>

  );
};

export default SocketClient;
