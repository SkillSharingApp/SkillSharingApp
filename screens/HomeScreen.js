import React from 'react';
import {Button, View} from 'react-native';

export default HomeScreen = ({ navigation }) => {
  //store userToken/id here to pass on to views
  const passedParams={
    id: 123,
    name: 'Sam'
  } 

    return ( 
      <View style={{ 
        flex: 1 , 
        flexDirection: 'column', 
        justifyContent: "space-around", 
        paddingVertical: 200,
        paddingHorizontal: 100
        }}>
      <Button
        title="LEARN"
        onPress={() =>
          navigation.navigate('LearnList', passedParams)
        }
      />
      <Button
        title="TEACH"
        onPress={() =>
          navigation.navigate('TeachList', passedParams)
        }
      />
      <Button
        title="SESSION SCHEDULE"
        onPress={() =>
          navigation.navigate('ScheduleList', passedParams)
        }
      />
      <Button
        title="MESSAGES"
        onPress={() =>
          navigation.navigate('MessageList', passedParams)
        }
      />
      </View>
    );
  };

