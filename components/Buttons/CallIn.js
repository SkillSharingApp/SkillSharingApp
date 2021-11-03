import React from "react";
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default CallInButton = ({ screenName }) =>{
    const navigation = useNavigation();

    const goToCallInScreen = () =>{
        navigation.navigate(screenName);
    }

    return (
        <Button 
            //style={}
            title="Call In"/>
    )
}