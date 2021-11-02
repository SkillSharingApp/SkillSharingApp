import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import { useQuery, gql } from "@apollo/client";

import LearnListCard from "../components/LearnListCard";

const SKILLS = gql`
    query {
        skills {
            id
            skillName
            overallRating
        }
    }
    `;
// query should be this once skills -> teacher resolver is rewritten
    // query {
    //     skills {
    //         id
    //         skillName
    //         teacher {
    //             username
    //         }
    //         overallRating
    //     }
    // }

const LearnListView = ({ navigation }) => {

    const { loading, error, data } = useQuery(SKILLS);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error </Text>;

    return (
        <View> 
            <Text>Welcome to LearnListView</Text>
            <FlatList
                data={data.skills}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=> navigation.navigate('LearnSkill', item.id)}>
                        <LearnListCard>
                            <Text>{ item.skillName }</Text>
                            {/* <Text>taught by: { item.teacher.username }</Text> */}
                            <Text>rating: { item.overallRating }</Text>
                        </LearnListCard>
                    </TouchableOpacity>
                )}
                />
        </View>
    );
};

export default LearnListView;