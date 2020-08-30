import React, { useState } from "react";
import { Message, ChatFeed } from "react-chat-ui";
import { Tooltip, Input } from "antd";
import { Scrollbars } from "react-custom-scrollbars";

const Chat = (props) => {
  const [messages, setMessages] = useState(
    [
      new Message({
        id: "x",
        message: (
          <Tooltip title="im time">
            "I'm the recipient! (The person you're talking to)"
          </Tooltip>
        ),
        senderName: "ali",
      }), // Gray bubble

      new Message({
        id: "x",
        message: <Tooltip title="im time">"Im 3rd"</Tooltip>,
        senderName: "subhan",
      }),
      new Message({
        id: "jk",
        message: <Tooltip title="im time">"Im 3rd"</Tooltip>,
        senderName: "subhan",
      }),
      new Message({
        id: 0,
        message: (
          <Tooltip title="im time">"I'm you -- the blue bubble!"</Tooltip>
        ),
        senderName: "mk",
      }), // Blue bubble
      new Message({
        id: "x",
        message: (
          <Tooltip title="im time">
            "I'm the recipient! (The person you're talking to)"
          </Tooltip>
        ),
        senderName: "ali",
      }), // Gray bubble

      new Message({
        id: "x",
        message: <Tooltip title="im time">"Im 3rd"</Tooltip>,
        senderName: "subhan",
      }),
      new Message({
        id: "jk",
        message: <Tooltip title="im time">"Im 3rd"</Tooltip>,
        senderName: "subhan",
      }),
      new Message({
        id: 0,
        message: (
          <Tooltip title="im time">"I'm you -- the blue bubble!"</Tooltip>
        ),
        senderName: "mk",
      }), // Blue bubble
      new Message({
        id: "x",
        message: (
          <Tooltip title="im time">
            "I'm the recipient! (The person you're talking to)"
          </Tooltip>
        ),
        senderName: "ali",
      }), // Gray bubble

      new Message({
        id: "x",
        message: <Tooltip title="im time">"Im 3rd"</Tooltip>,
        senderName: "subhan",
      }),
      new Message({
        id: "jk",
        message: <Tooltip title="im time">"Im 3rd"</Tooltip>,
        senderName: "subhan",
      }),
      new Message({
        id: 0,
        message: (
          <Tooltip title="im time">"I'm you -- the blue bubble!"</Tooltip>
        ),
        senderName: "mk",
      }), // Blue bubble
    ]
    //...
  );

  return (
    <>
      <Scrollbars style={{ height: 470 }}>
        <ChatFeed
          messages={messages}
          showSenderName={true}
          bubblesCentered={false}
          bubbleStyles={{
            text: {
              fontSize: 12,
            },
            chatbubble: {
              borderRadius: 30,
              padding: 10,
            },
          }}
        />
      </Scrollbars>

      <Input
        placeholder="type message..."
        style={{
          backgroundColor: "#f2f2f0",
          position: "absolute",
          bottom: "10px",
          right: "10px",
          width: "333px",
          borderRadius: "10px",
          borderColor: "#f2f2f0",
        }}
      />
    </>
  );
};

export default Chat;
