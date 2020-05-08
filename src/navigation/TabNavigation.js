
import App from '../../App';
import * as React from 'react';
import ExpandExample from '../ExpandExample';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
const Tab = createBottomTabNavigator();

export default function AppNaviagation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={App} />
        <Tab.Screen name="Graph" component={ExpandExample} />
      </Tab.Navigator>
    </NavigationContainer>
  );
  }