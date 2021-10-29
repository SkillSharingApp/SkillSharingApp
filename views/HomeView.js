import React from 'react';
import {Button, View} from 'react-native';

const HomeView = ({ navigation }) => {
<<<<<<< HEAD
    return ( 
      <View>
=======
  return (
>>>>>>> e62fb3e6eb207f72441aa03b422f0d5f04ebd994
      <Button
        title="LEARN"
        onPress={() =>
          navigation.navigate('LearnList')
        }
      />
<<<<<<< HEAD
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
=======
  );
};

export default HomeView;
>>>>>>> e62fb3e6eb207f72441aa03b422f0d5f04ebd994
