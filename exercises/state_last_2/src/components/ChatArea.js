import React from 'react';
import SendArea from './SendArea';

const ChatArea = ({ senderName, messages, handleNewMsg }) => {
  const onNewMsg = (text) => {
    handleNewMsg({ username: senderName, text });
  };

  return (
    <div className='chat-window'>
      <h2>Super Awesome Chat</h2>
      <div className='name sender'>{senderName}</div>
      <ul className='message-list'>
        {messages.map((message, index) => (
          <li
            key={index}
            className={
              message.username === senderName
                ? 'message sender'
                : 'message recipient'
            }
          >
            <p>{`${message.username}: ${message.text}`}</p>
          </li>
        ))}
      </ul>

      <SendArea onNewMsg={onNewMsg} />
    </div>
  );
};

export default ChatArea;
