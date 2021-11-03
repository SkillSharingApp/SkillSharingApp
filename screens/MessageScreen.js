import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { Button, View, Keyboard, Text } from 'react-native';

export default MessageScreen =({ route, navigation }) => {
  // const {id} = route.params;
  const [messages, setMessages] = useState([]);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  //keyboard listener to handle conditional button rendering
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
          _id: 3,
          name: 'TestUser',
          avatar: 'https://cdn.shopify.com/s/files/1/0052/6198/3830/products/The-General-Poster_1100x.jpg?v=1587118245',
        },
      },
      {
        _id: 3,
        text: 'Here\'s a message that was sent before',
        createdAt: new Date(),
        user: {
          _id: 2,
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
    <View style={{ flex: 1 }}> 
      
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        //we can render this component, passing in the current user ID here to ensure self-messages render in blue
        _id: 3,
      }}
    />

    {/*conditional render of the buttons, dependent on Keyboard State*/}

    {!keyboardStatus? 
      <View>
        <Button title="Catz"/>
        <Button title="LIME GUY!"/>
      </View> :null}
    </View>
  )
}