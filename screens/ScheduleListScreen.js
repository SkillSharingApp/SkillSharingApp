import React, { useEffect, useState }  from "react";
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native';
//import { useQuery, gql } from "@apollo/client";
import ScheduleCard from '../components/ScheduleCard';


// const CLASSES = gql`
//   query singleUser($id: ID!) {
//     singleUser(id: $id) {
//         classes {
//             confirmed
//         }
//     }
//   }
// `;

export default ScheduleListScreen = ({ route, navigation }) => {


    // const { loading, error, data } = useQuery(CLASSES, { 
    //     variables: { id: skillId }
    // });

    // if (loading) return <Text>Loading...</Text>;
    // if (error) return <Text>Error {JSON.stringify(error)}</Text>;


    const dummyData = [{
        id: 1 ,
        skillId: 23,
        skill: 'Jazz Trumpet',
        teacher: 123,
        confirmed: true ,
        time: Date.now(),
        learner: 3,
        attended: false
    },{
        id: 2 ,
        skillId: 344, 
        skill: 'Driving',
        teacher: 3,
        confirmed: true ,
        time: Date.now(),
        learner: 123,
        attended: false
    },{
        id: 3 ,
        skillId: 100, 
        skill: 'Frolicking',
        teacher: 123,
        confirmed: false ,
        time: Date.now(),
        learner: 3,
        attended: false
    }];

    const [displayArray, setDisplayArray] = useState(dummyData)


    const styles ={
        container: {
            backgroundColor: 'blue'
        }
    }
    
    const confirmClass = (classId) =>{
        //update db with class confirmed
        const newData = [...displayArray]
        newData[classId - 1].confirmed = true;
        setDisplayArray(newData);
        console.log(displayArray[classId - 1].confirmed)
    }


    return (
    <View style={{flex: 1}}> 
        <Text>Welcome to ScheduleListView</Text>
        <Text>Here are your scheduled sessions:</Text>
        <View style={styles.container}>
            <FlatList
                data={displayArray}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=> navigation.navigate('Call', item)}>
                        <LearnListCard>
                            <Text style={styles.skillTitle}>{ item.skill }</Text>
                            <Text>taught by: { item.teacher }</Text>
                            <Text>{item.time}</Text>
                            {!item.confirmed && <Button title='Confirm' onPress={() => confirmClass(item.id)}></Button>}
                        </LearnListCard>
                    </TouchableOpacity>
                )}
            />
        </View>
    </View>
    );
}

