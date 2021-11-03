import React from "react";
import { View, Text, Button } from 'react-native';
import RequestButton from "../components/Buttons/Request";


export default LearnSkillScreen =({ route, navigation }) =>{
    const {skillId, skill, teacher, rating} = route.params;

    // query DB for all Skill fields to render Descriptive CARD! And pass to SetScheduleView
    const userId = 10;
    const teacherId = 123;
    const availability = "Every Friday from 2pm to 10pm";
    
    return (
    <View>
        <Text>So you wanna learn { skill }</Text>
        <Text>{ teacher } can teach you!</Text>
        <Text>{ rating }</Text>
        <Text> Description can go here! </Text>
        <Text>{availability}</Text>
        <View>
            {//when a user clicks the message button, we can pass their userId and the teacherID to the messageScreen
            }
            <Button title="messageButton" onPress={()=> navigation.navigate('Message')}>Message</Button>
            <RequestButton screenName = "SetSchedule" teacherId={teacherId} userId={userId} skillId={skillId} availability={availability} teacher={teacher} skill={skill} />
        </View>
    </View>
    )
}

