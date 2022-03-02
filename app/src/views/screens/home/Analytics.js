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
  Linking
} from 'react-native';
import {
  TextInput,
  Text,
  Button,
  Snackbar,
  Headline,
  TouchableRipple,
  DataTable,
  ActivityIndicator
  
} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import STYLES from '../../../styles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Analytics({navigation}) {
  const isFocused = useIsFocused();
  // loader 

  const [visible, setVisible] = useState('none');
  
  const getDataa = async () => {
    setVisible('flex')
    var InsertAPIURL = base_url + '/analytics/analytics.php';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    // var Data = {
    //   password: password,
    //   email: email,
    // };
    await fetch(InsertAPIURL, {
      method: 'GET',
      headers: headers,
      // body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(response => {
        // setloading(false);
        setVisible('none')
        console.log(response);
      })
      .catch(error => {
       
        alert('error' + error);
      });
  };

useEffect(() => {
  // setlogin(true)
  Linking.addEventListener('url', ({url}) => {
    const route = url.replace(/.*?:\/\//g, '');

    const a = route.split('/')[1];
    const r = route.split('/')[2];
    const q = route.split('/')[3];
    console.log(a);
    console.log(r);
    console.log(q);
    getDataa()
    // alert('web : ' + r + ' user: ' + q);
    // navigation.navigate('Analytics');
    // console.log(navigation)
  });
  getDataa()
}, [isFocused]);

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
          marginHorizontal:5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
           <TouchableRipple   onPress={() => {navigation.goBack()}}>
          <View style={{alignItems:'center',color:COLORS.secondary,padding:10}}>
        <AwesomeIcon name="arrow-left" size={20} color={COLORS.light} style={{paddingBottom:4}}   />
        
        </View>
        </TouchableRipple>
        <Image
          style={{width: 30, height:30, alignSelf: 'center'}}
          source={require('../../../assets/analytics.png')}
        />
        <View>
          <Headline style={{color: COLORS.secondary}}>Google Analytics</Headline>
          <Text style={{color: COLORS.light}}>Users Report</Text>
        </View>
        <TouchableRipple   onPress={() => Linking.openURL('http://mtechub.com/sample/analyticsAppBackend/analytics/index.php')}>
          <View style={{alignItems:'center',color:COLORS.secondary,padding:10}}>
        <AwesomeIcon name="plus" size={20} color={COLORS.primary} style={{paddingBottom:4}}   />
        
        </View>
        </TouchableRipple>
      </View>
      <View
        style={{
          marginVertical: 10,
          borderBottomColor: COLORS.light,
          borderBottomWidth: .5,
        }}></View>
           <ActivityIndicator animating={true} color={COLORS.primary} size={'large'} style={{padding:100,display:visible}}  />
      <DataTable
      style={{
        paddingHorizontal:10,
        display:visible=='flex' ? 'none' :'flex'
      }}
      >
        <DataTable.Header
        
        >
          <DataTable.Title 
          
          >Websites </DataTable.Title>
          <DataTable.Title numeric>Users</DataTable.Title>
        </DataTable.Header>
      
        <DataTable.Row >
          <DataTable.Cell >159</DataTable.Cell>
          <DataTable.Cell numeric>6.0</DataTable.Cell>
        </DataTable.Row>

      </DataTable>

      
      
    </View>
  );
}

export default Analytics;
