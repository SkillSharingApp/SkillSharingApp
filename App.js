import * as React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import views from './views/index';

const {
  LoginView,
  HomeView,
  CallView,
  LearnListView,
  LearnSkillView,
  TeachListView,
  TeachSkillView,
  MessageListView,
  MessageView,
  NewMessageView,
  ScheduleClassView,
  ScheduleListView,
  SetScheduleView
} = views;

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen name="Login" component={LoginView} />
         <Stack.Screen name="Home" component={HomeView} />
          <Stack.Screen name="Call" component={CallView} />
          <Stack.Screen name="LearnList" component={LearnListView} />
          <Stack.Screen name="LearnSkill" component={LearnSkillView} />
          <Stack.Screen name="TeachList" component={TeachListView} />
          <Stack.Screen name="TeachSkill" component={TeachSkillView} />
          <Stack.Screen name="MessageList" component={MessageListView} />
          <Stack.Screen name="MessageView" component={MessageView} />
          <Stack.Screen name="NewMessage" component={NewMessageView} />
          <Stack.Screen name="ScheduleList" component={ScheduleListView} />
          <Stack.Screen name="ScheduleClass" component={ScheduleClassView} />
          <Stack.Screen name="SetSchedule" component={SetScheduleView} />
       </Stack.Navigator>
     </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;