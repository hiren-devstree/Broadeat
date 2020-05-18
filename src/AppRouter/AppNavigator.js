import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import { withTheme } from 'styled-components/native';
import InitScreen from '../screens/InitScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EmailVerifyScreen from '../screens/EmailVerifyScreen';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FilterScreen from '../screens/FilterScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import ProfileScreen from '../screens/ProfileScreen';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TabNavigator= withTheme(({theme, ...props})=> {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search';
            }else if (route.name === 'Filter') {
              iconName = 'filter';
            }else if (route.name === 'Bookmark') {
              iconName = 'bookmark-o';
            }else if (route.name === 'Profile') {
              iconName = 'user-circle';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={32} color={color} />;
          },
        })}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: theme.selectedIconColor,
          inactiveTintColor: theme.iconColor,
          style: {
            backgroundColor: theme.tabBackground // TabBar background
          }
        }} 
      >
        <Tab.Screen name="Home" component={HomeScreen}  />
        <Tab.Screen name="Search" component={SearchScreen}  />
        <Tab.Screen name="Filter" component={FilterScreen}  />
        <Tab.Screen name="Bookmark" component={BookmarkScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
      
  )
})

const AppNavigator= ({theme, ...props})=> {
  return (
    <NavigationContainer>
      
      <Stack.Navigator headerMode={null}>
        <Stack.Screen name="Init" component={InitScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="EmailVerify" component={EmailVerifyScreen} />
        <Stack.Screen name="Dashboard" component={TabNavigator}  />
      </Stack.Navigator>

    </NavigationContainer>
  );
}   
export default withTheme(AppNavigator)
// const TabNavigator = styled.Tab.Navigator`
//     color: ${props => props.theme.background};
// `