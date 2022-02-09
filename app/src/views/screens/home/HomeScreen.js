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
import { TextInput, Text, Button, Snackbar ,Headline,TouchableRipple} from 'react-native-paper';
import COLORS from '../../../consts/colors'
import base_url from '../../../consts/base_url'
import STYLES from '../../../styles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function NewPasswordScreen({ navigation }) {
  const [password, setPassword] = useState('')
  const [compassword, setCompassword] = useState('')
  const [showPass,setShowPass]= useState(false)
  // snackbar

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: '', color: '' });
  const onDismissSnackBar = () => setVisible(false);

  // login api call
const [loading, setloading] = useState(0);
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
        paddingHorizontal: '4%',
        backgroundColor:'white',
       flex:1,
      }} 
      >
      <View style={{ flexDirection: 'column', marginVertical: '10%', justifyContent: "center" }}>
        {/* <Image
          style={{ width: 310, height: 67 }}
          source={require('../../../assets/logo.png')}
        /> */}
<Headline style={{fontWeight:'900',fontSize:30}}>Welcome</Headline>
<Headline style={{fontWeight:'900',fontSize:30}}>JHON DOE</Headline>
      </View>
      <TouchableRipple 
      borderless
      style={STYLES.container} 
      onPress={()=>{
        // console.log('hello')
        navigation.navigate('Analytics')
        }}>
      <View style={{alignItems:'center',flexDirection:'column'}}>
        <Image
          style={{ width: 50, height:50 }}
          source={require('../../../assets/analytics.png')}
        />
        <Headline style={{color:COLORS.light}}>Google Analytics</Headline>
      </View>
      </TouchableRipple>
      <View style={{marginVertical:10,borderBottomColor:COLORS.light,borderBottomWidth:1}}></View>
      
      <TouchableRipple 
      borderless
      style={STYLES.container} onPress={()=>{console.log('hello')}}>
      <View style={{alignItems:'center',flexDirection:'column'}}>
        <Image
          style={{ width: 50, height:50 }}
          source={require('../../../assets/adsense.png')}
        />
        <Headline style={{color:COLORS.light}}>Google Adsense</Headline>
      </View>
      </TouchableRipple>
      <View style={{marginVertical:10,borderBottomColor:COLORS.light,borderBottomWidth:1}}></View>
      
      <TouchableRipple 
      borderless
      style={STYLES.container} onPress={()=>{console.log('hello')}}>
      <View style={{alignItems:'center',flexDirection:'column'}}>
        <Image
          style={{ width: 50, height:50 }}
          source={require('../../../assets/console.png')}
        />
        <Headline style={{color:COLORS.light}}>Google Search Console </Headline>
      </View>
      </TouchableRipple>
      <View style={{alignItems:'center',flexDirection:'row',marginVertical:10,justifyContent:'space-around'}}>
  <TouchableOpacity 
  onPress={()=>{
    navigation.navigate("MyProfile")
  }}
  style={{padding:"6%",width:"45%",fontSize:20,borderRadius:20,borderColor:COLORS.light,borderWidth:1,justifyContent:'center',flexDirection:'row'}}>
    
      <AwesomeIcon name='user' size={40} color={COLORS.light} />
    </TouchableOpacity>
    <TouchableOpacity
    onPress={()=>{
      navigation.navigate("Settings")
    }}
    style={{padding:"6%",width:"45%",fontSize:20,borderRadius:20,borderColor:COLORS.light,borderWidth:1,justifyContent:'center',flexDirection:'row'}}>
    
      <AwesomeIcon name='gear' size={40} color={COLORS.light} />
    </TouchableOpacity>
    
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
        style={{ backgroundColor: snackbarValue.color, marginBottom: height / 4, zIndex: 999 }}
        >
          {snackbarValue.value}
      </Snackbar>

    
      </View>
    
 
)
    }

export default NewPasswordScreen;