import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';

//this one button can handle both requests for bookings, and rescheduling
export default RequestButton = ({ availability, skillId, teacherId, userId, reschedule = false , skill, teacher, screenName }) =>{
    const navigation = useNavigation();

    const paramObj = {
        teacherId,
        userId,
        skillId,
        availability,
        skill,
        teacher
    }

    const goToSetSchedule = () =>{
        navigation.navigate(screenName, paramObj);
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