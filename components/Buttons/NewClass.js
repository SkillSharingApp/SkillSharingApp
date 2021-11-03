import React from "react";
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default NewClassButton = ({ screenName }) =>{
 
    const navigation = useNavigation();

    const goToTeachSkillScreen = () =>{
        navigation.navigate(screenName)
    }


    return (
        <Button 
            //style={}
            title="Add New Class"/>
    )
}