import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import COLORS from './app/src/consts/colors'
import STYLES from './app/src/styles/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
//screens
import SignInScreen from './app/src/views/screens/logins/SignInScreen';
import SignupScreen from './app/src/views/screens/logins/SignupScreen';
import ForgetPasswordScreen from './app/src/views/screens/logins/ForgetPasswordScreen';
import NewPasswordScreen from './app/src/views/screens/logins/NewPasswordScreen';
import HomeScreen from './app/src/views/screens/home/HomeScreen';
import Analytics from './app/src/views/screens/home/Analytics';
import MyProfile from './app/src/views/screens/profile/MyProfile';
import Settings from './app/src/views/screens/profile/Settings';




const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const loginStack = createNativeStackNavigator();
const afterLoginStack = createNativeStackNavigator();

function AfterLoginStack({ navigation, route }) {
  return (
    <NavigationContainer independent={true}>
      <afterLoginStack.Navigator screenOptions={{ header: () => null }}>
        <afterLoginStack.Screen name="HomeScreen" component={HomeScreen} />
        <afterLoginStack.Screen name="Analytics" component={Analytics} />
        <afterLoginStack.Screen name="MyProfile" component={MyProfile} />
        <afterLoginStack.Screen name="Settings" component={Settings} />

      </afterLoginStack.Navigator>
    </NavigationContainer>
  );
}
const App = ({ navigation, route }) => {
  const [y, sety] = useState('none')
  const getUser_detail = async () => {

    const value = await AsyncStorage.getItem('user_detail')

    var x = JSON.parse(value);
    if (value === null) {
      sety('none')
      console.log('no user is login')

    }
    else {
      sety('flex')
      console.log(JSON.parse(value))


    }
    console.log(y)

  }

  useEffect(() => {
    // setlogin(true)
    getUser_detail()
  })
  return (

    <NavigationContainer
      independent={true}
    >
      <loginStack.Navigator
        screenOptions={{ header: () => null }}
        initialRouteName={y == 'none' ? "SignInScreen" : "AfterLoginStack"}
      >
        <loginStack.Screen name="SignInScreen" component={SignInScreen} />
        <loginStack.Screen name="SignupScreen" component={SignupScreen} />
        <loginStack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
        <loginStack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        <loginStack.Screen
          name="AfterLoginStack"
          component={AfterLoginStack}
          options={{ headerShown: false }} />
      </loginStack.Navigator>
    </NavigationContainer>


  );
};


export default App;
