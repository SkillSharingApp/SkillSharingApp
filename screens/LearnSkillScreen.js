import React from "react";
import { View, Text, Button } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import LearnListCard from "../components/LearnListCard";

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
    
    return (
    <LearnListCard>
        <Text>Welcome to LearnSkillView</Text>
        <Text>{ data.singleSkill.teacher.username }</Text>
        <Text>{ data.singleSkill.overallRating }</Text>
        <Text>{ data.singleSkill.skillDescription }</Text>
        <Text>{ data.singleSkill.duration } minutes</Text>
        <Text>{ data.singleSkill.availability }</Text>

        <View>
            <Button title="messageButton" onPress={()=> navigation.navigate('Message')}>Message</Button>
            <Button title="bookButton">Book</Button>
        </View>
    </LearnListCard>
    );
};

