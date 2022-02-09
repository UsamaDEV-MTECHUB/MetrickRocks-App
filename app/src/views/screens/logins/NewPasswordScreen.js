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
import { TextInput, Text, Button, Snackbar } from 'react-native-paper';
import COLORS from '../../../consts/colors'
import base_url from '../../../consts/base_url'
import STYLES from '../../../styles';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function NewPasswordScreen({ navigation,route }) {
  const [email, setEmail] = useState(route.params.email) 
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
  useEffect(()=>{
    if(email.length==0) {
        navigation.navigate('SignInScreen')
        // console.log('hello')
    }
})

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
      
      <View style={{ flexDirection: 'row', marginVertical: '30%', justifyContent: "center" }}>
        <Image
          style={{ width: 310, height: 67 }}
          source={require('../../../assets/logo.png')}
        />
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
      <View style={{flexDirection:'column',marginHorizontal:'3%', justifyContent: "center" }}>
        
        <TextInput
          label="Password"
          mode='outlined'
          activeOutlineColor={COLORS.primary}
          
          left={<TextInput.Icon name="lock" color={'grey'} />}
          right={<TextInput.Icon name={
            showPass== false ? "eye" : "eye-off"
          } color={'grey'} 
          onPress={()=>{
            if(showPass==false) {
            setShowPass(true)
            }
            else {
              setShowPass(false)

            }
          }}
          
          />}
          secureTextEntry={ showPass== true ? false : true}
          onChangeText={(e)=>{
            setPassword(e)
          }}
        />
        <TextInput
          label="Confirm Password"
          mode='outlined'
          activeOutlineColor={COLORS.primary}
          style={{marginTop:20}}
          left={<TextInput.Icon name="lock" color={'grey'} />}
          right={<TextInput.Icon name={
            showPass== false ? "eye" : "eye-off"
          } color={'grey'} 
          onPress={()=>{
            if(showPass==false) {
            setShowPass(true)
            }
            else {
              setShowPass(false)

            }
          }}
          
          />}
          secureTextEntry={ showPass== true ? false : true}
          onChangeText={(e)=>{
            setCompassword(e)
          }}
        />
        
      </View>
      <View style={{ flexDirection: 'column',justifyContent:'flex-end', height:height/2.2}}>
      <Button mode="contained" color='#05232D' 
    
      contentStyle={{
        padding: 9,
        

      }}
      onPress={() => {
        checkValue()
       
      }}
      loading={loading}
      disabled={disable}
      >
    <Text style={{color:'white',fontSize:20}}>UPDATE PASSWORD</Text>
  </Button>
    <View style={{marginVertical:"5%",flexDirection:'row',justifyContent:'center'}}>

  
    </View>
      </View>
    </SafeAreaView>
    </ScrollView>
)
    }

export default NewPasswordScreen;