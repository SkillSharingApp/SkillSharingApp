import React from "react";
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import { useQuery, gql } from '@apollo/client';
import MessageCard from "../components/MessageCard";

const MESSAGES = gql`
    query singleUser($id: ID!) {
        singleUser(id: $id) {
            conversationsList {
                id
                username
                mostRecentMessageInConversationWith(partnerId: $id) {
                    content
                }
            }
        }
    }
`;

export default MessageListScreen = ({ route, navigation }) => {
    const {userId} = route.params;
    //to render list of messages, can we query DB for messages between currentUser and others, but only grab the most recent timestamp? ie: display a preview of the most recent message ONLY on this screen?

    const dummyData = [{
        id: 1 ,
        senderId: 23,
        recipientId: 123,
        content: 'Hello there!',
        timestamp: "1 PM"
    },{
        id: 3 ,
        senderId: 45,
        recipientId: 123,
        content: 'Hello there!',
        timestamp: "10 PM"
    },{
        id: 12 ,
        senderId: 123,
        recipientId: 10,
        content: 'Hello there!',
        timestamp: "6 PM"
    }];
    const { loading, error, data } = useQuery(MESSAGES, { 
        variables: { id }
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error {JSON.stringify(error)}</Text>;

    return (
    <View> 
        <Text>Messages</Text>
        <FlatList
            data={dummyData}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={()=> navigation.navigate('Message', item)}>
                    <MessageCard>
                        <Text>{ item.senderId }</Text>
                        <Text>{ item.content }</Text>
                        <Text>{ item.timestamp }</Text>
                    </MessageCard>
                </TouchableOpacity>
            )}
            />
    </View>
    )
}

