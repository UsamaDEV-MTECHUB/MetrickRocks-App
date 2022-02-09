import 'react-native-gesture-handler';
import React, { useState ,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  // Text,
  Image,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { TextInput, Text, Button, Snackbar,Headline ,TouchableRipple,ActivityIndicator} from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../consts/colors'
import base_url from '../../../consts/base_url'
import STYLES from '../../../styles';
import RNRestart from 'react-native-restart';

import { NavigationContainer, useIsFocused } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function MyProfile({ navigation }) {
  const isFocused = useIsFocused();
  const [email, setEmail] = useState('')
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('')
  const [checkEmail, setCheckEmail] = useState(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/)
  const [showPass, setShowPass] = useState(false)
  // snackbar

  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: '', color: '' });
  // login api call
  const [loading, setloading] = useState(false);
  const [load, setload] = useState('flex');
  const [disable, setdisable] = useState(0);


 // update new data of user

 const storeUser_detail = async (value) => {
  try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user_detail', jsonValue)
  } catch (e) {
      // saving error
  }
}

  // check value s
  const checkValue = async () => {

    if ( password.length == 0 || username.length == 0) {
      console.log('fields are empty');
      setsnackbarValue({ value: 'Some fields are Empty', color: 'red' })
      setVisible('true')
    }
    
    else {
      setloading(1)
      setdisable(1)
      insertValue()
    }
  }

  const insertValue = async () => {



    var InsertAPIURL = base_url + '/myProfile/updateProfileData.php'
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    var Data = {
      username: username,
      email: email,
      password: password,
    }
    await fetch(InsertAPIURL,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
      .then((response) => response.json())
      .then((response) => {


        if (response[0].message === 'emailAlreadyExsist') {
          setloading(0)
          setdisable(0)
          setsnackbarValue({ value: 'Email Already Exsist', color: 'red' })
          setVisible('true')

        }
        else {
          setloading(0)
          setdisable(0)
          storeUser_detail(response[0])
          // console.log(getUser_detail())
          setsnackbarValue({ value: "Profile Updated", color: COLORS.success })
          setVisible('true')
        }

      })
      .catch((error) => {
        setloading(0)
        setdisable(0)
        alert('error' + error)
      })

  }
  
  const getUser_detail = async () => {
          
    const value = await AsyncStorage.getItem('user_detail')
    
    var x = JSON.parse(value);
      setEmail(x.email)
      setusername(x.username)
      setPassword(x.password)
      setload('none')

}  

useEffect(() => {

getUser_detail()
}, [isFocused])


  return (
    <ScrollView
    style={{
      // marginHorizontal: '4%',
      flex: 1,
       backgroundColor:COLORS.white
    }}
    >
    <SafeAreaView style={{
      marginHorizontal: '4%',
       backgroundColor:COLORS.white
    }} >
      <View style={{ flexDirection: 'row', justifyContent:'flex-start'}}>
<TouchableRipple onPress={()=>{navigation.navigate('HomeScreen')}} borderless style={{marginVertical:20,padding:15,borderRadius:20}}>

       <AwesomeIcon name='chevron-left' size={20} color={COLORS.light}  />
</TouchableRipple>

      </View>
      <View style={{ flexDirection: 'row', marginVertical: '4%',marginBottom:"12%", justifyContent: "center", }}>
      <Headline >MY PROFILE</Headline>
      </View>
      <Snackbar
      duration={200}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          // label: 'Undo',
          // onPress: () => {
          //   // Do something
          // },
        }}
        style={{ backgroundColor: snackbarValue.color, marginBottom: height / 3, zIndex: 999 }}
        >
          {snackbarValue.value}
      </Snackbar>
      {load== 'flex' ? <ActivityIndicator color={COLORS.primary} size={'large'} style={{display:load,height:height/2}}/> :
      <View>
      <View style={{ flexDirection: 'column', marginHorizontal: '3%', justifyContent: "center" }}>
          <TextInput
            label="Username"
            mode='outlined'
            activeOutlineColor={COLORS.primary}
            value={username}
            left={<TextInput.Icon name="account" color={'grey'} />}
            onChangeText={(e) => {
              setusername(e)
            }}
          />
          <TextInput
            label="Email"
            mode='outlined'
            value={email}
            activeOutlineColor={COLORS.primary}
            style={{ marginTop: 20 }}
            left={<TextInput.Icon name="email" color={'grey'} />}
            onChangeText={(e) => {
              setEmail(e)
            }}
            disabled
          />
          <TextInput
            label="Password"
            mode='outlined'
            value={password}
            activeOutlineColor={COLORS.primary}
            style={{ marginTop: 20 }}
            left={<TextInput.Icon name="lock" color={'grey'} />}
            right={<TextInput.Icon name={
              showPass == false ? "eye" : "eye-off"
            } color={'grey'}
              onPress={() => {
                if (showPass == false) {
                  setShowPass(true)
                }
                else {
                  setShowPass(false)

                }
              }}
            />}
            secureTextEntry={showPass == true ? false : true}
            onChangeText={(e) => {
              setPassword(e)
            }}
          />

        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 20, height: height / 2.3 }}>
          <Button mode="contained" color='#05232D'

            contentStyle={{
              padding: 9,


            }}
            onPress={() => {
              checkValue()
              // removeValue()
              // RNRestart.Restart();
            }}
            loading={loading}
            disabled={disable}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>UPDATE</Text>
          </Button>
          

        </View></View>
      }
      
    </SafeAreaView>
    </ScrollView>
)
    }

export default MyProfile;