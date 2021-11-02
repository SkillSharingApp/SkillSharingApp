import React from "react";
import {View, Text} from 'react-native';
import MessageCard from "../components/MessageCard";


export default MessageListScreen = ({ route, navigation }) => {
    const {id} = route.params;
    //to render list of messages, can we query DB for messages between currentUser and others, but only grab the most recent timestamp? ie: display a preview of the most recent message ONLY on this screen?

    const dummyData = [{
        id: 1 ,
        senderId: 23,
        recipientId: 123,
        content: 'Hello there!',
        //timestamp: 
    },{
        id: 3 ,
        senderId: 45,
        recipientId: 123,
        content: 'Hello there!',
        //timestamp: 
    },{
        id: 12 ,
        senderId: 123,
        recipientId: 10,
        content: 'Hello there!',
        //timestamp: 
    }];

    return (
    <Text>Welcome to MessageListView</Text>
    )
}

