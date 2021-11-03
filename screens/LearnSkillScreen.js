import React from "react";
import { View, Text, Button } from 'react-native';
import RequestButton from "../components/Buttons/Request";


export default LearnSkillScreen =({ route, navigation }) =>{
    const {skillId, skill, teacher, rating} = route.params;

    // we can pass info from this view to the message view to create the message in DB. We can pass it to the 'navigate' method like this:
    // const messageInfo ={
    //     userId: , 
    //     teacherId: ,
    // }
    const userId = 10;
    const teacherId = 123;
    
    return (
    <View>
        <Text>So you wanna learn { skill }</Text>
        <Text>{ teacher } can teach you!</Text>
        <Text>{ rating }</Text>
        <Text> Description can go here! </Text>
        <View>
            {//when a user clicks the message button, we can pass their userId and the teacherID to the messageScreen
            }
            <Button title="messageButton" onPress={()=> navigation.navigate('Message')}>Message</Button>
            <RequestButton screenName = "SetSchedule" teacherId={teacherId} userId={userId} skillId={skillId} />
        </View>
    </View>
    )
}

