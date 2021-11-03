import React, { useState, useEffect }from "react";
import {View, Text} from 'react-native';


export default TeachListScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [classArray, setClassArray] = useState([]);

    //on load of screen
    useEffect(()=>{
        //fetch all classes taught by user with matching id
        
        //setClassArray(fetchedClasses);
    }, [])


    return (
        <Text>Welcome to TeachListView</Text>
    ) 
}

