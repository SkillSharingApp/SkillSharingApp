import React, { useState, useEffect } from "react";
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import LearnListCard from "../components/LearnListCard";



export default  LearnListScreen = ({ navigation }) => {

    const dummyClasses =[{
       skill: 'Kendo',
       teacher: 'Sam',
       rating: 2.8
    },
    {
        skill: 'French',
        teacher: 'Kelsey',
        rating: 3.7
     },
     {
        skill: 'Coding in Deno',
        teacher: 'Stephanie',
        rating: 5
     },
     {
        skill: 'Jokes',
        teacher: 'Sergey',
        rating: 1
     }];

    //initialize classesToRender with dummy data...remove when fetching
    const [classesToRender, setClassesToRender] = useState(dummyClasses);

    
    //componentDidMountHook (put fetch of skills here)
    useEffect(()=>{
        //fetch skils
        //setClassesToRender using fetched data;
    }, [])

    return (
        <View> 
            <Text>Welcome to LearnListView</Text>
            <FlatList
                data={dummyClasses}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=> navigation.navigate('LearnSkill', item)}>
                        <LearnListCard>
                            <Text>{ item.skill }</Text>
                            <Text>taught by: { item.teacher }</Text>
                            <Text>rating: { item.rating }</Text>
                        </LearnListCard>
                    </TouchableOpacity>
                )}
                />
        </View>
    );
};

