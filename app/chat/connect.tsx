import React from 'react';

const Chat = () => {
  const sendMessage = () => {
    // Add your message sending logic here
    console.log('Message sent!');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-6 overflow-y-auto">
        <div id="chatMessages" className="flex flex-col">
          {/* Chat messages will be displayed here */}
        </div>
      </div>
      <div className="flex p-4">
        <input
          type="text"
          id="messageInput"
          className="flex-1 px-4 py-2 rounded-l-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-6 py-2 bg-blue-500 text-white rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
