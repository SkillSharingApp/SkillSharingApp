import React from "react";
import {View, Text} from 'react-native';
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
    const {id} = route.params;
    //to render list of messages, can we query DB for messages between currentUser and others, but only grab the most recent timestamp? ie: display a preview of the most recent message ONLY on this screen?

    const { loading, error, data } = useQuery(MESSAGES, { 
        variables: { id }
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error {JSON.stringify(error)}</Text>;

    return (
    <Text>Welcome to MessageListView</Text>
    )
}

