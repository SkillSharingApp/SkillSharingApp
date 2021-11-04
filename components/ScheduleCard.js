import React from "react";
import {View, StyleSheet, Text} from 'react-native';

export default ScheduleCard = (props) => {
    const { isTeacher }  = props; 
    console.log(isTeacher);

    return (
        <View style={isTeacher? styles.teacherCard : styles.learnerCard}>
            <View style={styles.cardContent}>
              { props.children }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    teacherCard: {
        alignSelf: "flex-end",
        borderRadius: 6,
        elevation: 3, 
        backgroundColor: 'rgb(0, 0, 0, .9)',
        shadowOffset: { width: 1, height: 1 }, 
        shadowColor: '#f4511e',
        shadowOpacity: 1,
        shadowRadius: 2,
        marginHorizontal: 4, 
        marginVertical: 6,
        width: 200
    },
    learnerCard: {
        alignSelf: "flex-start",
        borderRadius: 6,
        elevation: 3, 
        backgroundColor: 'rgb(0, 0, 0, .9)',
        shadowOffset: { width: 1, height: 1 }, 
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4, 
        marginVertical: 6,
        width: 200
    },
    cardContent: {
        marginHorizontal: 18, 
        marginVertical: 10,

    }
})