import React from 'react';
import {Button} from 'react-native';

const HomeView = ({ navigation }) => {
    return ( 
      <Button
        title="GO TO LOGIN"
        onPress={() =>
          navigation.navigate('Login')
        }
      />
    );
  };


export default HomeView;