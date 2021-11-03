import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';

//this one button can handle both requests for bookings, and rescheduling
export default RequestButton = ({ skillId, teacherId, userId, reschedule = false , screenName }) =>{
    const navigation = useNavigation();

    const idObj = {
        teacherId,
        userId,
        skillId
    }

    const goToSetSchedule = () =>{
        navigation.navigate(screenName, idObj);
    }

    return (
        <View>
            <Button 
                //style={}
                title={reschedule? "Reschedule" :"Request to Book"}
                onPress = {goToSetSchedule}/>
        </View>
    )
}