import React from "react";
import { View, Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import LearnListCard from "../components/LearnListCard";

const SKILL = gql`
    query singleSkill($id: Int!) {
        singleSkill(id: $id) {
            skillName
            skillDescription
            teacher {
                name
                username
            }
            availability
            duration
            overallRating
        }
    }
`;

export default function LearnSkillView({ route, navigation }){
    const id = route.params;

    const { loading, error, data } = useQuery(SKILL, { 
        variables: { id }
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error {JSON.stringify(error)}</Text>;

    return (
    <LearnListCard>
        <Text>Welcome to LearnSkillView</Text>
        <Text>{data.singleSkill.skillName}</Text>
        <Text>{data.singleSkill.overallRating}</Text>
        <Text>{data.singleSkill.skillDescription}</Text>
        <Text>{data.singleSkill.teacher.username}</Text>
        <Text>{data.singleSkill.teacher.name}</Text>
        <Text>{data.singleSkill.duration} minutes</Text>
        <Text>{data.singleSkill.availability}</Text>
    </LearnListCard>
    );
}

