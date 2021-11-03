import React, { useState, useEffect }from "react";
import {View, Text, Button, TouchableOpacity, FlatList} from 'react-native';
import TeachingCard from "../components/TeachingCard";


export default TeachListScreen = ({ route, navigation }) => {
    const { userId } = route.params;
    const [skillsArray, setSkillsArray] = useState([]);

    const dummySkills = [{
        id: 13,
        skillName: 'Judo',
        skillDescription: 'Destroy your enemies',
        teacherId: 12,
        availability: "Any weeknight from 8 pm to 10 pm",
        duration: 60,
        overallRating: 3.4,
        numberOfRatings: 10
    }, {
        id: 33,
        skillName: 'Jazz Dance',
        skillDescription: 'Destroy your enemies',
        teacherId: 12,
        availability: "Any weeknight from 8 pm to 10 pm",
        duration: 60,
        overallRating: 3.4,
        numberOfRatings: 10
    }, {
        id: 72,
        skillName: 'Sewing',
        skillDescription: 'Destroy your enemies',
        teacherId: 12,
        availability: "Any weeknight from 8 pm to 10 pm",
        duration: 60,
        overallRating: 3.4,
        numberOfRatings: 10
    }, ]
    //on load of screen
    useEffect(()=>{
        //fetch all skills taught by user with matching id
        setSkillsArray(dummySkills);
        //setSkillsArray(fetchedClasses);
    }, [])


    return (
        <View> 
        <Button title="Add a new Skill"></Button>
        <Text>Current Skills</Text>
        <FlatList
            data={skillsArray}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={()=> navigation.navigate('TeachSkill', item)}>
                    <TeachingCard>
                        <Text>{ item.skillName }</Text>
                        <Text>{ item.availability }</Text>
                        <Text>Duration: {item.duration} mins</Text>
                        <Text>{ item.overallRating }</Text>
                    </TeachingCard>
                </TouchableOpacity>
            )}
            />
    </View>
    ) 
}

