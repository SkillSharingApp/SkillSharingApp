import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import { useQuery, gql } from "@apollo/client";

import LearnListCard from "../components/LearnListCard";

const SKILLS = gql`
    query {
        skills {
            id
            name
            teacher {
                username
            }
            overallRating
        }
    }
    `;

const LearnListView = ({ navigation }) => {

    // const dummyClasses =[{
    //    skill: 'Kendo',
    //    teacher: 'Sam',
    //    rating: 2.8
    // },
    // {
    //     skill: 'French',
    //     teacher: 'Kelsey',
    //     rating: 3.7
    //  },
    //  {
    //     skill: 'Coding in Deno',
    //     teacher: 'Stephanie',
    //     rating: 5
    //  },
    //  {
    //     skill: 'Jokes',
    //     teacher: 'Sergey',
    //     rating: 1
    //  }];

    //initialize classesToRender with dummy data...remove when fetching
    //const [classesToRender, setClassesToRender] = useState(dummyClasses);

    const { loading, error, data } = useQuery(SKILLS);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error </Text>;


    // //componentDidMountHook (put fetch of skills here)
    // useEffect(()=>{
    //     //fetch skils
    //     //setClassesToRender using fetched data;
    // }, [])

    return (
        <View> 
            <Text>Welcome to LearnListView</Text>
            <FlatList
                data={data.skills}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=> navigation.navigate('LearnSkill', item.id)}>
                        <LearnListCard>
                            <Text>{ item.name }</Text>
                            <Text>taught by: { item.teacher.username }</Text>
                            <Text>rating: { item.overallRating }</Text>
                        </LearnListCard>
                    </TouchableOpacity>
                )}
                />
        </View>
    );
};

export default LearnListView;