"use client";

import React, { useEffect, useState } from 'react'

const test = () => {
    const [messages, setMessages] = useState<any[]>([]);
const [messageData, setMessagesData] = useState({});

useEffect(() => {
    setMessagesData({ name: "recievedUserName",text: "displayMessage", isSender: false });
    setMessages((prevMessages) => {
        // if (prevMessages.includes(displayMessage)) {
        //     return prevMessages; // Message already exists, no need to add again
        // }
        return [...prevMessages,messageData];
    });

    
}, [])

console.log(messageData);


  return (
    <div>test</div>
  )
}

export default test