import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeView}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Login" component={LoginView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;