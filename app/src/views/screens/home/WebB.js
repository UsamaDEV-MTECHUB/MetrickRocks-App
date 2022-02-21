import 'react-native-gesture-handler';
import React, { useState,useEffect } from 'react';
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
import { TextInput, Text, Button, Snackbar ,Headline,TouchableRipple,DataTable,Appbar ,ActivityIndicator} from 'react-native-paper';
import COLORS from '../../../consts/colors'
import base_url from '../../../consts/base_url'
import STYLES from '../../../styles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


function WebB({ navigation }) {
  const [password, setPassword] = useState('')
  const [compassword, setCompassword] = useState('')
  const [showPass,setShowPass]= useState(false)
  // snackbar

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: '', color: '' });
  const onDismissSnackBar = () => setVisible(false);

  // login api call
const [loading, setloading] = useState('flex');
const [dis, setDis] = useState('none');
const [disable, setdisable] = useState(0);


  const checkValue = async () => {

    if (compassword.length == 0 || password.length== 0) {
      console.log('fields are empty');
      setsnackbarValue({ value: 'Some fields are Empty', color: 'red' })
      setVisible('true')
    }
    else if (compassword !== password) {
      console.log('Password Not matched');
      setsnackbarValue({ value: 'Password Not matched', color: 'red' })
      setVisible('true')
    }
    
    else {
     setloading(1)
     setdisable(1)
     insertValue()
    }
  }
  const insertValue = async () => {


    var InsertAPIURL = base_url + '/user/updatePassword.php'
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    var Data = {

        password: password,
        email: email,

    }
    await fetch(InsertAPIURL,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
        .then((response) => response.json())
        .then((response) => {
          // setloading(false);
          setloading(0)
          setdisable(0)
          setPassword('')
          setCompassword('')
          setsnackbarValue({ value: 'Updated , Redirecting to Login...', color: 'green' })
          setVisible('true')
              setTimeout(() => {
                navigation.navigate('SignInScreen')
            }, 1000);

        })
        .catch((error) => {
          setloading(0)
setdisable(0)
            alert('error' + error)
           
        })
      

   
  }


  return (
   
  
      <View
      style={{
        // paddingHorizontal: '4%',
        backgroundColor:'white',
       flex:1,
      }} 
      >
        
      <Appbar.Header style={{backgroundColor:COLORS.secondary}}>
        <Appbar.Action icon="arrow-left" onPress={() => {navigation.navigate('Analytics')}} />
       <Appbar.Content title="Add New Acocunt" />
        {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
    </Appbar.Header>
 <View style={{display:loading,flex:1,justifyContent:'center'}}>

<ActivityIndicator  color={COLORS.primary} size={'large'} />
</View>

<WebView onLoad={()=>{
  setloading('none')
  setDis('flex')
  }} style={{display:dis}} source={{ uri: 'https://www.npmjs.com/package/react-native-webview' }}  />


    
      
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
        style={{ backgroundColor: snackbarValue.color, marginBottom: height / 4, zIndex: 999 }}
        >
          {snackbarValue.value}
      </Snackbar>

    
      </View>
    
 
)
    }

export default WebB;