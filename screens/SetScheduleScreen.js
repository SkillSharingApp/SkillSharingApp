import React, {useState} from "react";
import {View, Text, Button, Platform, Alert} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useMutation, gql } from '@apollo/client';
 

const CLASS = gql`
    mutation addClass($skillId: ID!, $learnerId: ID!, $time: String!) {
        addClass(skillId: $skillId, learnerId: $learnerId, time: $time) {
            id
            confirmed
        }
    }
`;

export default SetScheduleScreen = ({ teacherId, skillId, userId, route, navigation }) => {
    //when routed to this screen we will be sent these three params from the
    //Request button
    
    const [date, setDate] = useState(new Date())


    
    const style={
        container:{
            flex: 1,
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: "space-around", 
        }
    }

    // const sendRequest = () => {
        //send PUT request to DB to set the new Class entry w/date from state!
        
        const [sendRequest, { loading }] = useMutation(CLASS, {
            variables: { skillId: skillId, learnerId: userId, time: JSON.stringify(date) },
          });
    
        // if (loading) return <Text>Loading...</Text>;
        // if (error) return <Text>Error {JSON.stringify(error)}</Text>;
        // if (data) Alert.alert ("Request Sent!", "Please wait until the teacher of the skill confirms your booking!",[
        //     {
        //         text: 'Sounds good!'
        //     }
        // ])

    //     console.log('sending request to DB');
    //     return (
    //         <Text>Mutated!</Text>
    //     )
    // }

    return (
    <View style={style.container}> 
        <Text>YOU MADE IT TO SCHEDULE SCREEN</Text>

        <DatePicker 
            date={date} 
            onDateChange={setDate}
            minimumDate={new Date()}
            minuteInterval={15} />

        <Text> Current date is {JSON.stringify(date)} </Text>
        <Button title="Send Booking Request" onPress={sendRequest} disabled={loading}/>
    </View>
    )
}



