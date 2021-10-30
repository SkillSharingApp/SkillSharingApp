import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export default MessageScreen =() => {
  const [messages, setMessages] = useState([]);

  //upon page load we can fetch any messages between user/teacher and prepopulate them here.
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'first message',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'TestUser',
          avatar: 'https://cdn.shopify.com/s/files/1/0052/6198/3830/products/The-General-Poster_1100x.jpg?v=1587118245',
        },
      },
      {
        _id: 2,
        text: 'message #2',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'TestUser',
          avatar: 'https://cdn.shopify.com/s/files/1/0052/6198/3830/products/The-General-Poster_1100x.jpg?v=1587118245',
        },
      },
      {
        _id: 3,
        text: 'Here\'s a message that was sent before',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'TestUser',
          avatar: 'https://cdn.shopify.com/s/files/1/0052/6198/3830/products/The-General-Poster_1100x.jpg?v=1587118245',
        },
      },
    ])
  }, [])

  //we can put logic to send new message to DB here inside onSend
  const onSend = useCallback((messages = []) => {

    //use Hook to set messages, including newly sent ones
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}