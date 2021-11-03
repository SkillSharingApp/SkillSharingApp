import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import views from './screens/index';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const {
  LoginScreen,
  CallScreen,
  HomeScreen,
  LearnListScreen,
  LearnSkillScreen,
  MessageListScreen,
  MessageScreen,
  ScheduleClassScreen,
  ScheduleListScreen,
  SetScheduleScreen,
  TeachListScreen,
  TeachSkillScreen,
  ProfileScreen 
} = views;

const styles = {
  avatarIcon: {
    resizeMode: "cover",
    height: 40,
    width: 40
  }
}


const headerStyle = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleAlign: 'center',
  headerRight: () => {
    const navigation = useNavigation();
  return (
  <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
      <Image style={styles.avatarIcon} source={require('./staticImages/avataricon.png')} />
  </TouchableOpacity>
  )}
}



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="Login" component={LoginScreen} options={{title: "skillXchange"}}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Call" component={CallScreen} />
        <Stack.Screen name="LearnList" component={LearnListScreen} />
        <Stack.Screen name="LearnSkill" component={LearnSkillScreen} options={({route})=>({title: route.params.skill})}/>
        <Stack.Screen name="TeachList" component={TeachListScreen} />
        <Stack.Screen name="TeachSkill" component={TeachSkillScreen} />
        <Stack.Screen name="MessageList" component={MessageListScreen} />
        <Stack.Screen name="Message" component={MessageScreen} />
        <Stack.Screen name="ScheduleList" component={ScheduleListScreen} />
        <Stack.Screen name="ScheduleClass" component={ScheduleClassScreen} />
        <Stack.Screen name="SetSchedule" component={SetScheduleScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;