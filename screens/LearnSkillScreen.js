import React from "react";
import { View, Text, Button } from 'react-native';
import LearnListCard from "../components/LearnListCard";


export default LearnSkillScreen =({ route, navigation }) =>{
    const {skill, teacher, rating} = route.params;

    // we can pass info from this view to the message view to create the message in DB. We can pass it to the 'navigate' method like this:
    // const messageInfo ={
    //     userId: , 
    //     teacherId: ,
    // }
    
    return (
    <LearnListCard>
        <Text>Welcome to LearnSkillView</Text>
        <Text>{ teacher }</Text>
        <Text>{ rating }</Text>
        <View>
            <Button title="messageButton" onPress={()=> navigation.navigate('Message')}>Message</Button>
            <Button title="bookButton">Book</Button>
        </View>
    </LearnListCard>
    )
}

