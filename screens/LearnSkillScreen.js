import React from "react";
import { View, Text, Button } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import LearnListCard from "../components/LearnListCard";
import RequestButton from "../components/Buttons/Request";

const SKILL = gql`
    query singleSkill($id: ID!) {
        singleSkill(id: $id) {
            skillName
            skillDescription
            teacher {
                username
            }
            availability
            duration
            overallRating
        }
    }
`;

export default LearnSkillScreen = ({ route, navigation }) => {
    const {id} = route.params;

    const { loading, error, data } = useQuery(SKILL, { 
        variables: { id }
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error {JSON.stringify(error)}</Text>;

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
    );
};

