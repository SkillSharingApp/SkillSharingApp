import React, { useState }from "react";
import {View, Text, Button, TextInput } from 'react-native';
import DeleteSkill from "../components/Buttons/DeleteSkill";


export default TeachSkillScreen = ({ route, navigation }) => {
    let id, skillName, skillDescription, availability, duration = undefined;
    if(route.params) {
       id = route.params.id;
       skillName = route.params.skillName;
       skillDescription = route.params.skillDescription;
       availability = route.params.availability;
       duration = route.params.druation;
    }

    const [newSkillName, setNewSkillName] = useState((skillName || ""));
    const [newSkillDescription, setNewSkillDescription] = useState((skillDescription || ""));
    const [newAvailability, setNewAvailability] = useState((availability || ""));
    const [newDuration, setNewDuration] = useState((duration || ""));


    const styles = {
        container: {
            flex: 1,
            flexDirection: 'column',
        },
        inputCase:{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignSelf: 'stretch',
            width: 350, 
            marginLeft: 20,
        },
        buttonCase: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 'auto',
            marginBottom: 50
        },
        saveButton: {
            color: 'green',
        },
        input: {
            textAlignVertical: 'top',
            fontSize: 18,
            borderColor: '#f4511e',
            borderWidth: 1,
        }
    }

    return(
    <View style={styles.container}>
        <View style={styles.inputCase}>
            <View>
                <Text>Skill:</Text>
                <TextInput
                    style={styles.input} 
                    onChangeText={newSkillName => setNewSkillName(newSkillName)}
                    defaultValue={newSkillName}/>
            </View>
            <View>
                <Text>Description:</Text>
                <TextInput 
                    style={styles.input}
                    multiline
                    numberOfLines={5} 
                    onChangeText={newSkillDescription => setNewSkillDescription(newSkillDescription)}
                    defaultValue={newSkillDescription}/>
            </View>
            <View>
                <Text>Availability:</Text>
                <TextInput 
                    style={styles.input}
                    multiline
                    onChangeText={newAvailability => setNewAvailability(newAvailability)}
                    defaultValue={newAvailability}/>
            </View>
            <View>
                <Text>Class Duration:</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={newDuration => setNewDuration(Number(newDuration))}
                    defaultValue={newDuration.toString()}
                    keyboardType="numeric"/>
            </View>
        </View>
        <View style={styles.buttonCase}>
            <Button style={styles.saveButton} title='Save Changes'></Button>
            <DeleteSkill skillId={id}></DeleteSkill>
        </View>
    </View>
    )
}

