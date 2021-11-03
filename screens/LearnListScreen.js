import React, { useState, useEffect } from "react";
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import LearnListCard from "../components/LearnListCard";



export default  LearnListScreen = ({ route, navigation }) => {
    const {id, name} = route.params 

    const dummyClasses =[{
       skillId: 100, 
       skill: 'Kendo',
       teacher: 'Sam',
       rating: 2.8
    },
    {
        skillId: 343, 
        skill: 'French',
        teacher: 'Kelsey',
        rating: 3.7
     },
     {
        skillId: 653, 
        skill: 'Coding in Deno',
        teacher: 'Stephanie',
        rating: 5
     },
     {
        skillId: 633, 
        skill: 'Jokes',
        teacher: 'Sergey',
        rating: 1
     }];

    //initialize classesToRender with dummy data...remove when fetching
    const [classesToRender, setClassesToRender] = useState([]);

    
    //componentDidMountHook (put fetch of skills here)
    useEffect(()=>{
        //fetch skills
        //setClassesToRender using fetched data;
        setClassesToRender(dummyClasses);
    }, [])

    return (
        <View> 
            <Text>What do you wanna learn {name}?</Text>
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

