import React, {useState, useEffect} from 'react';
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
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import {TextInput, Text, Button} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import COLORS from './app/src/consts/colors';
import STYLES from './app/src/styles/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
//screens
import SignInScreen from './app/src/views/screens/logins/SignInScreen';
import SignupScreen from './app/src/views/screens/logins/SignupScreen';
import ForgetPasswordScreen from './app/src/views/screens/logins/ForgetPasswordScreen';
import NewPasswordScreen from './app/src/views/screens/logins/NewPasswordScreen';
import HomeScreen from './app/src/views/screens/home/HomeScreen';
import Analytics from './app/src/views/screens/home/Analytics';
import WebB from './app/src/views/screens/home/WebB';
import MyProfile from './app/src/views/screens/profile/MyProfile';
import Settings from './app/src/views/screens/profile/Settings';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const loginStack = createNativeStackNavigator();
const afterLoginStack = createNativeStackNavigator();

// function AfterLoginStack({navigation, route}) {
//   return (
//     <NavigationContainer independent={true}>
//       <afterLoginStack.Navigator screenOptions={{header: () => null}}>
        
//       </afterLoginStack.Navigator>
//     </NavigationContainer>
//   );
// }
const App = ({navigation, route}) => {
  const [y, sety] = useState('none');
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('analytics', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('analytics')
      const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
      if(value !== null) {
      
        console.log(result)
      }
    } catch(e) {
      // error reading value
    }
  }
  const getUser_detail = async () => {
    const value = await AsyncStorage.getItem('user_detail');

    var x = JSON.parse(value);
    if (value === null) {
      sety('none');
      console.log('no user is login');
    } else {
      sety('flex');
      console.log(JSON.parse(value));
    }
    console.log(y);
  };

  // useEffect(() => {
  //   // setlogin(true)
  //   Linking.addEventListener('url', ({url}) => {
  //     const route = url.replace(/.*?:\/\//g, '');

  //     const a = route.split('/')[1];
  //     const r = route.split('/')[2];
  //     const q = route.split('/')[3];
  //     console.log(a);
  //     console.log(r);
  //     console.log(q);
  //     storeData({
  //       user:'new',
  //      data:'new1'
  //    })
      
  //      getData()
  //     // alert('web : ' + r + ' user: ' + q);
  //     // navigation.navigate('Analytics');
  //     // console.log(navigation)
  //   });
  //   getUser_detail();
  // });
  return (
    <NavigationContainer independent={true}>
      <loginStack.Navigator
        screenOptions={{header: () => null}}
        initialRouteName={y == 'none' ? 'Analytics' : 'Analytics'}>
        <loginStack.Screen name="SignInScreen" component={SignInScreen} />
        <loginStack.Screen name="SignupScreen" component={SignupScreen} />
        <loginStack.Screen
          name="ForgetPasswordScreen"
          component={ForgetPasswordScreen}
        />
        <loginStack.Screen
          name="NewPasswordScreen"
          component={NewPasswordScreen}
        />
        <loginStack.Screen name="HomeScreen" component={HomeScreen} />
        <loginStack.Screen name="Analytics" component={Analytics} />
        <loginStack.Screen name="WebB" component={WebB} />
        <loginStack.Screen name="MyProfile" component={MyProfile} />
        <loginStack.Screen name="Settings" component={Settings} />
      </loginStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
