import React, { useState, useEffect } from "react";
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import LearnListCard from "../components/LearnListCard";
import { AirbnbRating } from "react-native-ratings";



export default  LearnListScreen = ({ route, navigation }) => {
    const {userId, name} = route.params 

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

