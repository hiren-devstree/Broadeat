import * as React from 'react';
import {
  Image, View, TouchableWithoutFeedback, Text
} from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppImages from '../assets/images';
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
import PhotoRecipeDetails from '../screens/PhotoRecipeDetails';
import EditAccount from '../screens/EditAccount';

import HeaderSearchBar from '../components/common/HeaderSearchBar';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import StyleConfig from '../assets/styles/StyleConfig';
import Icon from 'react-native-vector-icons/Feather';
import SearchResult from '../screens/SearchResult';
import AddContent from '../screens/AddContent';
import UserAccount from '../screens/UserAccount';
import ChangePassword from '../screens/ChangePassword';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = createStackNavigator();

const HomeStackNavigator = withTheme(({ theme, ...props }) => {
  return (
    <HomeNavigator.Navigator mode="modal">
      <HomeNavigator.Screen
        options={{
          headerStyle: {
            height: StyleConfig.headerHeight,
            backgroundColor: theme.background
          },
          headerTitleStyle: { color: theme.text },
          headerTitle: ({ tintColor }) => (
            <TouchableWithoutFeedback
              onPress={() => props.navigation.navigate('SearchScreenModal')}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: theme.text,
                  height: StyleConfig.convertHeightPerVal(38),
                  width: StyleConfig.width * 0.4,
                  backgroundColor: theme.background
                }}
              >
                <Icon
                  style={{ position: "absolute", alignSelf: "center", left: 10 }}
                  name={"search"}
                />
                <Text style={{}} > {"Search"} </Text>
              </View>
            </TouchableWithoutFeedback>
          ),
          headerRight: () => (
            <Feather
              style={{ paddingHorizontal: 20 }}
              name={"menu"}
              color={theme.text}
              size={StyleConfig.iconSize}
            />
          ),
        }}
        name={"Home"} component={HomeScreen} />
      <HomeNavigator.Screen
        options={{
          headerStyle: {
            height: StyleConfig.headerHeight,
            backgroundColor: theme.background
          },
          headerTitleStyle: { color: theme.text },
          header: ({ tintColor }) => (
            <HeaderSearchBar  {...props} />
          )
        }}
        name={'SearchScreenModal'} component={SearchScreen}
      />
      <SearchNavigator.Screen
        options={{ headerShown: false }}
        name={'PhotoRecipeDetails'} component={PhotoRecipeDetails}
      />
    </HomeNavigator.Navigator >
  )
})

const SearchNavigator = createStackNavigator();

const SearchStackNavigator = withTheme(({ theme, ...props }) => {
  return (
    <SearchNavigator.Navigator>
      <SearchNavigator.Screen
        options={{
          headerStyle: {
            height: StyleConfig.headerHeight,
            backgroundColor: theme.background
          },
          headerTitleStyle: { color: theme.text },
          header: ({ tintColor }) => (
            <HeaderSearchBar  {...props} />
          )
        }}
        name={'SearchScreen'} component={SearchScreen}
      />
      <SearchNavigator.Screen
        options={({ route, navigation }) => ({
          header: () => (<HeaderSearchBar back showFilterMenu  {...{ navigation, route }} />)
        })}
        name="SearchResult" component={SearchResult}
      />
      <SearchNavigator.Screen
        options={{ headerShown: false }}
        name={'PhotoRecipeDetails'} component={PhotoRecipeDetails}
      />
    </SearchNavigator.Navigator >
  )
})

const BookmarkNavigator = createStackNavigator();

const BookmarkStackNavigator = withTheme(({ theme, ...props }) => {
  return (
    <BookmarkNavigator.Navigator>
      <BookmarkNavigator.Screen
        options={{ headerShown: false }}
        name={'Bookmark'} component={BookmarkScreen}
      />
      <BookmarkNavigator.Screen
        options={{ headerShown: false }}
        name={'PhotoRecipeDetails'} component={PhotoRecipeDetails}
      />

    </BookmarkNavigator.Navigator >
  )
})

const TabNavigator = withTheme(({ theme, ...props }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = AppImages.ic_home;
          } else if (route.name === 'Search') {
            iconName = AppImages.ic_search;
          } else if (route.name === 'Filter') {
            iconName = AppImages.ic_filter;
          } else if (route.name === 'Bookmark') {
            iconName = AppImages.ic_bookmark;
          } else if (route.name === 'Profile') {
            iconName = AppImages.ic_profile;
          }

          // You can return any component that you like here!
          return <Image source={iconName} resizeMode={'contain'} style={{
            height: 28, width: 28, tintColor: color
          }} />;

          // <Icon name={iconName} size={32} color={color} />;
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
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen listeners={{
        tabPress: e => {
          SearchScreen.reloadScreen()
        }
      }} name="Search" component={SearchStackNavigator} />
      <Tab.Screen name="Filter" component={FilterScreen} />
      <Tab.Screen name="Bookmark" component={BookmarkStackNavigator} />
      <Tab.Screen listeners={{
        tabPress: e => {
          ProfileScreen.reloadScreen()
        }
      }} name="Profile" component={ProfileScreen} />
    </Tab.Navigator>

  )
})

const AppNavigator = ({ theme, ...props }) => {
  return (
    <NavigationContainer>

      <Stack.Navigator
        headerMode={'screen'}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background
          },
          headerTitleStyle: { color: theme.text },
          headerTintColor: theme.text,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen options={{ headerShown: false }} name="Init" component={InitScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="EmailVerify" component={EmailVerifyScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={TabNavigator} />
        <Stack.Screen options={{ headerShown: false }} name="EditAccount" component={EditAccount} />
        <Stack.Screen options={{ headerShown: false }} name="Filter" component={FilterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="AddContent" component={AddContent} />
        <Stack.Screen options={{ headerShown: false }} name="ChangePassword" component={ChangePassword} />
        <Stack.Screen options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: theme.background,
            elevation: 0,
            shadowOpacity: 0
          },
        }} name="UserAccount" component={UserAccount} />
      </Stack.Navigator>

    </NavigationContainer >
  );
}
export default withTheme(AppNavigator)
// const TabNavigator = styled.Tab.Navigator`
//     color: ${props => props.theme.background};
// `