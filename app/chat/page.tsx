'use client';
import React from 'react'
import MyComponent from './connect';
import SocketClient from './SocketClient';

const chatPage = () => {
  return (
    // <button className="btn" onClick={SocketClient}>Button</button>
    <div>
        <SocketClient/>
        {/* <MyComponent/> */}
    </div>

  )
}

export default chatPage