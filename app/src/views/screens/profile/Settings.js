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
import { TextInput, Text, Button, Snackbar, Headline, TouchableRipple } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../consts/colors'
import base_url from '../../../consts/base_url'
import STYLES from '../../../styles';
import RNRestart from 'react-native-restart';


import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Settings({ navigation }) {
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



  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('user_detail')
      console.log('Done.')
    } catch (e) {
      // remove error
    }


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
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableRipple onPress={() => { navigation.navigate('HomeScreen') }} borderless style={{ marginVertical: 20, marginHorizontal: 5, padding: 15, borderRadius: 20 }}>

            <AwesomeIcon name='chevron-left' size={20} color={COLORS.light} />
          </TouchableRipple>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: '4%',marginBottom:60, justifyContent: "center", }}>
          <Headline >SETTINGS</Headline>
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
        <TouchableRipple onPress={() => { console.log('press') }}>
          <View style={{ flexDirection: 'row', paddingVertical: 5, marginHorizontal: '3%', justifyContent: "space-between", alignItems: 'center' }}>
            <Headline style={{ fontSize: 20 }}><AwesomeIcon name='bookmark' size={20} color={'orange'} /> Privacy Policy</Headline>
            <AwesomeIcon name='chevron-right' size={20} color={COLORS.light} />
          </View>
        </TouchableRipple>
        <View style={STYLES.hr}></View>
        <TouchableRipple onPress={() => { console.log('press') }}>
          <View style={{ flexDirection: 'row', paddingVertical: 5, marginHorizontal: '3%', justifyContent: "space-between", alignItems: 'center' }}>
            <Headline style={{ fontSize: 20 }}><AwesomeIcon name='copy' size={20} color={'orange'} /> Term and Conditions</Headline>
            <AwesomeIcon name='chevron-right' size={20} color={COLORS.light} />
          </View>
        </TouchableRipple>
        <View style={STYLES.hr}></View>
        <TouchableRipple onPress={() => { console.log('press') }}>
          <View style={{ flexDirection: 'row', paddingVertical: 5, marginHorizontal: '3%', justifyContent: "space-between", alignItems: 'center' }}>
            <Headline style={{ fontSize: 20 }}><AwesomeIcon name='star' size={20} color={'orange'} /> Rate us</Headline>
            <AwesomeIcon name='chevron-right' size={20} color={COLORS.light} />
          </View>
        </TouchableRipple>
        <View style={STYLES.hr}></View>
        <TouchableRipple onPress={() => { console.log('press') }}>
          <View style={{ flexDirection: 'row', paddingVertical: 5, marginHorizontal: '3%', justifyContent: "space-between", alignItems: 'center' }}>
            <Headline style={{ fontSize: 20 }}><AwesomeIcon name='phone' size={20} color={'orange'} /> Contact Us</Headline>
            <AwesomeIcon name='chevron-right' size={20} color={COLORS.light} />
          </View>
        </TouchableRipple>

        <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 20, height: height / 2.3 }}>
          <Button mode="contained" color='#05232D'

            contentStyle={{
              padding: 9,


            }}
            onPress={() => {
              // checkValue()
              removeValue()
              navigation.replace('SignInScreen');
            }}
            loading={loading}
            disabled={disable}
          >
            <Text style={{ color: 'white', fontSize: 20 }}>logout</Text>
          </Button>


        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default Settings;