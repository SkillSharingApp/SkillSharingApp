import React, { useState, useEffect }from "react";
import {View, Text} from 'react-native';
import { useQuery, gql } from "@apollo/client";

const USER_SKILLS = gql`
    query singleUser($id: ID!) {
        singleUser(id: $id) {
            skills {
                id
                skillName
                overallRating
            }
        }
    }
    `;

export default TeachListScreen = ({ route, navigation }) => {
    const { id } = route.params;

    const { loading, error, data } = useQuery(USER_SKILLS, { 
        variables: { id }
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error {JSON.stringify(error)}</Text>;


    return (
        <Text>Welcome to TeachListView</Text>

    ) 
}

