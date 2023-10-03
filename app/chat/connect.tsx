'use client';

import React, { useEffect, useState } from 'react'
import SocketClient from './SocketClient';



const Connect = () => {

    
    // const newSocket = new WebSocket("ws://6699-106-193-35-19.ngrok-free.app");
    const [newSocket, setSocket] = useState<WebSocket | null>();
    useEffect(() => {
        // const newSocket = new WebSocket("ws://localhost:8080");

        function setSocketUrl() {
           setSocket(new WebSocket("ws://localhost:8080"))
            //setSocket(new WebSocket("wss://4f6e-106-193-35-19.ngrok-free.app"))
        }

        setSocketUrl();
    
    
    }, [])
    
    if (newSocket != null) {
        return (
            <SocketClient
                socketInstance={newSocket} />  
        )
    }


}

export default Connect