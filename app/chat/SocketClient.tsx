import React, { useState, useEffect } from "react";

const SocketClient = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    console.log("omgtop");
    const newSocket = new WebSocket("ws://localhost:8080");
    //const newSocket = new WebSocket("ws://0.tcp.in.ngrok.io:17400");

    newSocket.onopen = () => {
        console.log('WebSocket connection established.');
        // Send initial message if needed: socket.send('Hello, server!');
      };
      
    newSocket.onmessage = (event) => {
        console.log('Received message from server:', event.data);
        setMessages((prevMessages) => {
            if (prevMessages.includes(event.data)) {
                return prevMessages; // Message already exists, no need to add again
            }
            return [...prevMessages,String(event.data)];
        });
      };
      
      newSocket.onclose = () => {
        console.log('WebSocket connection closed.');
      };

      setSocket(newSocket);
      
      return () => {
          if (newSocket.readyState === 1) { // <-- This is important
            newSocket.close();
          }
      //   socket.close();
      };
  }, []);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.send(message);
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
                    <div className="chat chat-start " key={index}>
                    <div className="chat-header" >
                        {}
                    </div>
                    <div className="chat-bubble">{messagea}</div>
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
