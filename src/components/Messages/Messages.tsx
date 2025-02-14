"use client";

import React, { useEffect, Dispatch, SetStateAction } from 'react';

// Components
import MessageIn from './components/MessageIn';
import MessageOut from './components/MessageOut';

// Socket
import { useSocket } from '@/context/SocketProvider';

// Redux
import { useSelector } from 'react-redux';
import { UserState } from '@/state/user';

// Interface 
import { IMessageData } from '@/interface/Message';

// Styles
import "./styles/styles.css";

interface IMessagesPage {
  messageList: IMessageData[],
  setMessageList: Dispatch<SetStateAction<IMessageData[] | []>>;
}

export default function Messages({ messageList, setMessageList }: IMessagesPage) {
  const socket = useSocket();
  const user = useSelector((state: { user: UserState }) => state.user);

  // Handle Recieve Messages
  useEffect(() => {
    socket?.on("receive_message", (data: any) => {
      const inData: IMessageData = JSON.parse(data);

      console.log(inData);
      console.log(messageList);
      if (messageList.length == 0) {

        console.log("Hello")
        setMessageList((list: any) => {
          console.log(list);
          return [...list, inData];
        });
      }
    });
  }, [socket]);

  // Greetings Message
  useEffect(() => {
    // AppToast.welcomeNotify();
  }, []);

  return (
    <div
      className='w-full min-h-[800px] h-auto flex flex-col items-start justify-start gap-3 px-3 py-5 overflow-hidden'>
      {
        messageList.map((message: IMessageData) => {
          if (user.socketId == message.socket_id) {
            return (
              <MessageOut
                key={message.id}
                id={message.id}
                message={message.message}
                time={message.time} />
            );
          } else {
            return (
              <MessageIn
                key={message.id}
                id={message.id}
                message={message.message}
                time={message.time} />
            );
          }
        })}
    </div >
  )
}
