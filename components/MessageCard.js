import React from "react";
import {View, StyleSheet, Text} from 'react-native';

export default MessageCard = (props) => {
    const { id, senderId, recipientId, content, timestamp } = props;
    //for each message in MessageListScreen we want to display: 
        //Username of person we're messaging
        //Skill it concerns (mine or theirs)
        //Preview of last sent message?
    //we'll also need to fetch the id of the person we're in the message with
    //this will allow us to render the cards conditionally if we're teaching/learning
    //const { senderId , recipientId, content } = props;

    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
            { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3, 
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 }, 
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4, 
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 18, 
        marginVertical: 10,

    }
})