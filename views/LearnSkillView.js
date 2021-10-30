import React from "react";
import { View, Text } from 'react-native';
import LearnListCard from "../components/LearnListCard";


export default function LearnSkillView({ route, navigation }){
    const {skill, teacher, rating} = route.params;
    return (
    <LearnListCard>
        <Text>Welcome to LearnSkillView</Text>
        <Text>{ teacher }</Text>
        <Text>{ rating }</Text>
    </LearnListCard>
    )
}

