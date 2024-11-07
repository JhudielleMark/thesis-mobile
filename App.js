import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen'
import HomeScreen from './screens/HomeScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import FrontScreen from './screens/FrontScreen';
import CameraScreen from './screens/CameraScreen';
import AccountProfile from './screens/AccountProfile';
import InventoryScreen from './screens/InventoryScreen';
import NotificationScreen from './screens/NotificationScreen';
import Database from './screens/db';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FrontScreen">
        <Stack.Screen name='FrontScreen' component={FrontScreen} options={{title: 'FrontScreen', headerShown: false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'SignUp' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{title: 'ResetPassword'}} />
        <Stack.Screen name="Scan" component={CameraScreen} options={{title: 'Scan'}} />
        <Stack.Screen name="AccountProfile" component={AccountProfile} options={{title: 'AccountProfile'}} />
        <Stack.Screen name="Inventory" component={InventoryScreen} options={{title: 'Inventory'}} />
        <Stack.Screen name="Notification" component={NotificationScreen} options={{title: 'Notification'}} />
        <Stack.Screen name="Database" component={Database} options={{title: 'Database'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
