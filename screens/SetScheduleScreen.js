import React, {useState} from "react";
import {View, Text, Button, Platform} from 'react-native';
import DatePicker from 'react-native-date-picker'



export default SetScheduleScreen = ({ route, navigation }) => {
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

    const sendRequest = () =>{
        //send PUT request to DB to set the new Class entry w/date from state!
        console.log('sending request to DB');
    }

    return (
    <View style={style.container}> 
        <Text>YOU MADE IT TO SCHEDULE SCREEN</Text>

        <DatePicker 
            date={date} 
            onDateChange={setDate}
            minimumDate={new Date()}
            minuteInterval={15} />

        <Text> Current date is {JSON.stringify(date)} </Text>
        <Button title="Send Booking Request" onPress={sendRequest}/>
    </View>
    )
}



