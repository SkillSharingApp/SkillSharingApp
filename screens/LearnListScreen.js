import React, { useState, useEffect } from "react";
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import LearnListCard from "../components/LearnListCard";
import { AirbnbRating } from "react-native-ratings";
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
    const {userId, name} = route.params 

    const { loading, error, data } = useQuery(SKILLS);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error </Text>;

    const styles = {
        container: {
            flex: 1, 
            paddingLeft: 20,
            paddingRight: 20
        },
        skillTitle: {
            fontSize: 20,
            textDecorationLine: 'underline'
        }
    }

    return (
        <View style={{flex: 1}}> 
            <Text>What do you wanna learn {name}?</Text>
            <View style={styles.container}>
                <FlatList
                    data={dummyClasses}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={()=> navigation.navigate('LearnSkill', item)}>
                            <LearnListCard>
                                <Text style={styles.skillTitle}>{ item.skill }</Text>
                                <Text>taught by: { item.teacher }</Text>
                                <AirbnbRating 
                                    defaultRating={item.rating}
                                    size={20}
                                    showRating={false}
                                    isDisabled={true}
                                    />  
                            </LearnListCard>
                        </TouchableOpacity>
                    )}
                    />
            </View>
        </View>
    );
};

