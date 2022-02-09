import 'react-native-gesture-handler';
import React, { useState } from 'react';
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

function SignupScreen({ navigation }) {
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
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  // check value s
  const checkValue = async () => {

    if (email.length == 0 || password.length == 0 || username.length == 0) {
      console.log('fields are empty');
      setsnackbarValue({ value: 'Some fields are Empty', color: 'red' })
      setVisible('true')
    }
    else if (checkEmail.test(email) === false) {

      setsnackbarValue({ value: 'Email is Not Correct', color: 'red' })
      setVisible('true')
    }
    else {
      setloading(1)
      setdisable(1)
      insertValue()
    }
  }

  const insertValue = async () => {



    var InsertAPIURL = base_url + '/user/register.php'
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


          setsnackbarValue({ value: "Signup Sucessful", color: COLORS.success })
          setVisible('true')
        }

      })
      .catch((error) => {
        setloading(0)
        setdisable(0)
        alert('error' + error)
      })

  }

  return (
    <ScrollView
      style={{
        // marginHorizontal: '4%',
        flex: 1,
        backgroundColor: COLORS.white
      }}
    >
      <SafeAreaView style={{
        marginHorizontal: '4%',
        backgroundColor: COLORS.white
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
          style={{ backgroundColor: snackbarValue.color, marginBottom: height / 4, zIndex: 999 }}
        >
          {snackbarValue.value}

        </Snackbar>
        <View style={{ flexDirection: 'column', marginHorizontal: '3%', justifyContent: "center" }}>
          <TextInput
            label="Username"
            mode='outlined'
            activeOutlineColor={COLORS.primary}

            left={<TextInput.Icon name="account" color={'grey'} />}
            onChangeText={(e) => {
              setusername(e)
            }}
          />
          <TextInput
            label="Email"
            mode='outlined'
            activeOutlineColor={COLORS.primary}
            style={{ marginTop: 20 }}
            left={<TextInput.Icon name="email" color={'grey'} />}
            onChangeText={(e) => {
              setEmail(e)
            }}
          />
          <TextInput
            label="Password"
            mode='outlined'
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
        <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 20, height: height / 3.2 }}>
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
            <Text style={{ color: 'white', fontSize: 20 }}>Sign Up</Text>
          </Button>
          <View style={{ marginVertical: "5%", flexDirection: 'row', justifyContent: 'center' }}>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignInScreen')
              }}
            >
              <Text style={{ alignSelf: 'center' }}>Already have an account? Sign In</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default SignupScreen;