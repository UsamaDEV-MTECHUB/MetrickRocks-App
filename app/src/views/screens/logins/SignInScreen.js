import 'react-native-gesture-handler';
import React, {useState,useEffect} from 'react';
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
  TouchableOpacity,
} from 'react-native';
import {TextInput, Text, Button, Snackbar} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import STYLES from '../../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function SignInScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [displayEmail, setdisplayEmail] = useState('none');
  const [password, setPassword] = useState('');
  const [checkEmail, setCheckEmail] = useState(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
  );
  const [showPass, setShowPass] = useState(false);
  // snackbar

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  // login api call
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  
  // check logins 
  const [login, setlogin] = useState(1);

  // check logins end
  /// store user deatil
  const storeUser_detail = async value => {
    
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user_detail', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  // user deatil soter end

  // reading user data
  const getUser_detail = async () => {
    setlogin(1)
    try {
      const value = await AsyncStorage.getItem('user_detail');
      // setTimeout(() => {
      //   console.log('storage val:');
      //   console.log(JSON.parse(value));
      // }, 1000);

      if(value==null) {
        console.log('no user is login')
        setlogin(0)
      }
      else {
      console.log('storage vall:')
      
      navigation.navigate('HomeScreen')
      console.log(JSON.parse(value))
      
      }
    } catch (e) {
      // error reading value
    }
  };
  // reading user data end
  const checkValue = async () => {
    if (email.length == 0 || password.length == 0) {
      console.log('fields are empty');
      setsnackbarValue({value: 'Some fields are Empty', color: 'red'});
      setVisible('true');
    } else if (checkEmail.test(email) === false) {
      setsnackbarValue({value: 'Email is Not Correct', color: 'red'});
      setVisible('true');
    } else {
      setloading(1);
      setdisable(1);
      insertValue();
    }
  };
  const insertValue = async () => {
    // setloading(true);
    var InsertAPIURL = base_url + '/user/login.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      email: email,
      password: password,
    };
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(response => {
        if (response[0].message === 'emailAlreadyExsist') {
          setloading(0);
          setdisable(0);
          setsnackbarValue({value: 'Email Already Exsist', color: 'red'});
          setVisible('true');
        } 
        
        else if (response[0].message === 'emailorpasswordisincorrect') {
          setloading(0);
          setdisable(0);
          setsnackbarValue({value: 'Email or Password is Incorrect', color: 'red'});
          setVisible('true');
        } 
        
        else {
          setloading(0);
          setdisable(0);
          storeUser_detail(response[0]);
          getUser_detail();

          // setsnackbarValue({ value: "Signin Sucessful", color: COLORS.success })
          // setVisible('true')
          navigation.navigate('HomeScreen');
        }
      })
      .catch(error => {
        setloading(0);
        setdisable(0);
        alert('error' + error);
      });
  };
  useEffect(() => {
    
    getUser_detail();
  },[]);
  return (
    <ScrollView
      style={{
        // marginHorizontal: '4%',
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
        {login ==1  ? 
        <View style={{
          height:height,
          alignContent:'center',
          justifyContent:'center',
          flexDirection:'row',
          alignItems:'center',
        }}>
<Image
            style={{width: 310, height: 67}}
            source={require('../../../assets/logo.png')}
          /> 
        </View>
        : <View>
            <SafeAreaView
        style={{
          marginHorizontal: '4%',
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: '30%',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 310, height: 67}}
            source={require('../../../assets/logo.png')}
          />
        </View>
        <Snackbar
          duration={200}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={
            {
              // label: 'Undo',
              // onPress: () => {
              //   // Do something
              // },
            }
          }
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom: height / 4,
            zIndex: 999,
          }}>
          {snackbarValue.value}
        </Snackbar>
        <View
          style={{
            flexDirection: 'column',
            marginHorizontal: '3%',
            justifyContent: 'center',
          }}>
          <TextInput
            label="Email"
            mode="outlined"
            activeOutlineColor={COLORS.primary}
            left={<TextInput.Icon name="email" color={'grey'} />}
            onChangeText={e => {
              setEmail(e);
            }}
          />
          <TextInput
            label="Password"
            mode="outlined"
            activeOutlineColor={COLORS.primary}
            style={{marginTop: 20}}
            left={<TextInput.Icon name="lock" color={'grey'} />}
            right={
              <TextInput.Icon
                name={showPass == false ? 'eye' : 'eye-off'}
                color={'grey'}
                onPress={() => {
                  if (showPass == false) {
                    setShowPass(true);
                  } else {
                    setShowPass(false);
                  }
                }}
              />
            }
            secureTextEntry={showPass == true ? false : true}
            onChangeText={e => {
              setPassword(e);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgetPasswordScreen');
            }}>
            <Text style={{marginVertical: '5%', alignSelf: 'flex-end'}}>
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-end',
            marginBottom: 20,
            height: height / 3,
          }}>
          <Button
            mode="contained"
            color="#05232D"
            contentStyle={{
              padding: 9,
            }}
            onPress={() => {
              checkValue();
            }}
            loading={loading}
            disabled={disable}>
            <Text style={{color: 'white', fontSize: 20}}>Sign In</Text>
          </Button>
          <View
            style={{
              marginVertical: '5%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignupScreen');
              }}>
              <Text style={{alignSelf: 'center'}}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
            </View>}
         
      
    </ScrollView>
  );
}

export default SignInScreen;
