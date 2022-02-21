import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
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
import {
  TextInput,
  Text,
  Button,
  Snackbar,
  Headline,
  TouchableRipple,
  DataTable,
} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import STYLES from '../../../styles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {WebView} from 'react-native-webview';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Analytics({navigation}) {
  const [password, setPassword] = useState('');
  const [compassword, setCompassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  // snackbar

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  // login api call
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  const checkValue = async () => {
    if (compassword.length == 0 || password.length == 0) {
      console.log('fields are empty');
      setsnackbarValue({value: 'Some fields are Empty', color: 'red'});
      setVisible('true');
    } else if (compassword !== password) {
      console.log('Password Not matched');
      setsnackbarValue({value: 'Password Not matched', color: 'red'});
      setVisible('true');
    } else {
      setloading(1);
      setdisable(1);
      insertValue();
    }
  };
  const insertValue = async () => {
    var InsertAPIURL = base_url + '/user/updatePassword.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      password: password,
      email: email,
    };
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(response => {
        // setloading(false);
        setloading(0);
        setdisable(0);
        setPassword('');
        setCompassword('');
        setsnackbarValue({
          value: 'Updated , Redirecting to Login...',
          color: 'green',
        });
        setVisible('true');
        setTimeout(() => {
          navigation.navigate('SignInScreen');
        }, 1000);
      })
      .catch(error => {
        setloading(0);
        setdisable(0);
        alert('error' + error);
      });
  };

  return (
    <View
      style={{
        paddingHorizontal: '4%',
        backgroundColor: 'white',
        flex: 1,
      }}>
      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
          marginHorizontal:10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Image
          style={{width: 30, height:30, alignSelf: 'center'}}
          source={require('../../../assets/analytics.png')}
        />
        <View>
          <Headline style={{color: COLORS.primary}}>Google Analytics</Headline>
          <Text style={{color: COLORS.light}}>Users Report</Text>
        </View>
        <TouchableRipple onPress={()=>{navigation.navigate('WebB')}}>
          <View style={{alignItems:'center',color:COLORS.secondary,padding:5}}>
        <AwesomeIcon name="plus" size={20} color={COLORS.primary} style={{paddingBottom:4}}   />
        <Text  style={{color:COLORS.light}}>Add Account</Text>
        </View>
        </TouchableRipple>
      </View>
      <View
        style={{
          marginVertical: 10,
          borderBottomColor: COLORS.light,
          borderBottomWidth: 1,
        }}></View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Dessert</DataTable.Title>
          <DataTable.Title numeric>Calories</DataTable.Title>
          <DataTable.Title numeric>Fat</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Frozen yogurt</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>6.0</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
          <DataTable.Cell numeric>237</DataTable.Cell>
          <DataTable.Cell numeric>8.0</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
          <DataTable.Cell numeric>237</DataTable.Cell>
          <DataTable.Cell numeric>8.0</DataTable.Cell>
        </DataTable.Row>
      </DataTable>

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
      
    </View>
  );
}

export default Analytics;
