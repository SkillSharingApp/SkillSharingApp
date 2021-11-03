import React from "react";
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default DeleteSkillButton = ({ navigation }) =>{
    const navigation = useNavigation();

    const confirmDeletion = () =>{
        Alert.alert(
            "Are you sure?",
            "Deleting this skill will remove it permanently from your offerings. Unless you re-add it!",
            [
              {
                text: "Delete Skill",
                onPress: () => {
                    //we can put logic for actually deleting from DB here!
                },
                style: "delete"
              },
              { text: "I changed my mind..." }
            ]
          );
    }
    

    return (
        <Button 
            //style={}
            title="Delete Skill"/>
    )
}