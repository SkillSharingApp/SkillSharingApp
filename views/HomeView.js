import React from 'react';
import {Button, View} from 'react-native';

const HomeView = ({ navigation }) => {
    return ( 
      <View>
      <Button
        title="LEARN"
        onPress={() =>
          navigation.navigate('LearnList')
        }
      />
      <Button
        title="TEACH"
        onPress={() =>
          navigation.navigate('TeachList')
        }
      />
      <Button
        title="SESSION SCHEDULE"
        onPress={() =>
          navigation.navigate('ScheduleList')
        }
      />
      <Button
        title="MESSAGES"
        onPress={() =>
          navigation.navigate('MessageList')
        }
      />
      </View>
    );
  };

  export default HomeView;