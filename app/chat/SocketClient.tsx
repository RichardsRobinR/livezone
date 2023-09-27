'use client';
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

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

        
        const isSenderValue = UserName === recievedUserName;

        setMessages((prevMessages) => {
            // if (prevMessages.includes(displayMessage)) {
            //     return prevMessages; // Message already exists, no need to add again
            // }
            return [...prevMessages,{ name: recievedUserName, text: displayMessage, isSender : isSenderValue }];
        });
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

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-6 overflow-y-auto">
        <div id="chatMessages" className="flex flex-col">
          

        {messages.map((messagea,index) => (
            <div className= {`chat ${messagea.isSender ? 'chat-end' : 'chat-start'}`} key={index}>
            <div className="chat-header" >
                {messagea.name}
            </div>
            <div className="chat-bubble">{messagea.text}</div>
            </div>
      
        ))}


        </div>
      </div>
      <div className="join">
        <input className="input input-bordered join-item w-full " value={inputText} onChange={handleChange} placeholder="Enter your message" type="text"/>
        <button className="btn join-item rounded-r-full" onClick={() => {sendMessage(inputText)
        setInputText("")
        }}>Send</button>
        </div>
</div>

  );
};

export default SocketClient;
