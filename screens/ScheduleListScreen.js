import React from "react";
import {View, Text} from 'react-native';


export default ScheduleListScreen = ({ route, navigation }) => {
    const dummyData = [{
        id: 1 ,
        skillId: 23, 
        confirmed: true ,
        time: Date.now(),
        learner: 3,
        attended: false
    },{
        id: 2 ,
        skillId: 344, 
        confirmed: true ,
        time: Date.now(),
        learner: 3,
        attended: false
    },{
        id: 3 ,
        skillId: 100, 
        confirmed: false ,
        time: Date.now(),
        learner: 3,
        attended: false
    }];
    return <Text>Welcome to ScheduleListView</Text>;
}

