import React from 'react';
import {Button, Image, View} from 'react-native';

export default HomeScreen = ({ navigation }) => {
  //store userToken/id here to pass on to views
  const passedParams={
    userId: 123,
    name: 'Sam'
  } 
  
  const color = "#f4511e"

  const style ={
    container: { 
      flex: 1 , 
      flexDirection: 'column',
      justifyContent: "space-around", 
      paddingVertical: 200,
      paddingHorizontal: 100,
      }
    }
  

    return ( 
      <View style={style.container}>
        
      <Button
        title="LEARN"
        color={color}
        onPress={() =>
          navigation.navigate('LearnList', passedParams)
        }
      />
      <Button
        title="TEACH"
        color={color}        
        onPress={() =>
          navigation.navigate('TeachList', passedParams)
        }
      />
      <Button
        title="SESSION SCHEDULE"
        color={color}        
        onPress={() =>
          navigation.navigate('ScheduleList', passedParams)
        }
      />
      <Button
        title="MESSAGES"
        color={color}        
        onPress={() =>
          navigation.navigate('MessageList', passedParams)
        }
      />
      </View>
    );
  };

