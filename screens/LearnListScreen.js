import React, { useState, useEffect } from "react";
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import { useQuery, gql } from "@apollo/client";

import LearnListCard from "../components/LearnListCard";

const SKILLS = gql`
    query {
        skills {
            id
            skillName
            teacher {
                username
            }
            overallRating
        }
    }
    `;

export default  LearnListScreen = ({ route, navigation }) => {
    const {id, name} = route.params 

    const { loading, error, data } = useQuery(SKILLS);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error </Text>;

    return (
        <View> 
            <Text>What do you wanna learn {name}?</Text>
            <FlatList
                data={data.skills}
                renderItem={({ item }) => {
                const params ={
                    skillId: item.id,
                    userId: id
                }
                return (
                    <TouchableOpacity onPress={()=> navigation.navigate('LearnSkill', params)}>
                        <LearnListCard>
                            <Text>{ item.skillName }</Text>
                            <Text>taught by: { item.teacher.username }</Text>
                            <Text>rating: { item.overallRating }</Text>
                        </LearnListCard>
                    </TouchableOpacity>
                )}}
                />
        </View>
    );
};

