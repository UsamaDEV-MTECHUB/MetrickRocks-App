import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  FlatList,
  Image,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  TextInput,
  Text,
  Button,
  Snackbar,
  Headline,
  TouchableRipple,
  DataTable,
  ActivityIndicator,
} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import STYLES from '../../../styles';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Analytics({navigation}) {
  const isFocused = useIsFocused();
  const [table, setTable] = useState([
    {
      id: "1",
      title: "First Item",
    },
    {
      id: "2",
      title: "Second Item",
    },
    {
      id: "3",
      title: "Third Item",
    },
  ]);
  const [data, setData] = useState(null);
  // const DATA = [
  //   {
  //     id: "1",
  //     title: "First Item",
  //   },
  //   {
  //     id: "2",
  //     title: "Second Item",
  //   },
  //   {
  //     id: "3",
  //     title: "Third Item",
  //   },
  // ];
  // loader

  const [visible, setVisible] = useState('none');
// render item 
const renderItem = ({ item }) => {
  

  return (
    <DataTable.Row>
    <DataTable.Cell>{item.website_name}</DataTable.Cell>
    <DataTable.Cell numeric>{item.users}</DataTable.Cell>
  </DataTable.Row>
  );
};
// render item end 
  const getDataa = async () => {
    setVisible('flex');
    // var InsertAPIURL = base_url + '/analytics/analytics.php';
    // var headers = {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    // };

    // await fetch(InsertAPIURL, {
    //   method: 'GET',
    //   headers: headers,
    // })
    //   .then(response => response.json())
    //   .then(response => {
    //     setVisible('none');
    //     // var res='';
    //     // console.log(JSON.stringify(response));
    //     // table=JSON.stringify(response);
    //     // setTable(JSON.stringify(response));

    //     // console.log(table);
    //   })
    //   .catch(error => {
    //     alert('error' + error);
    //   });
    const resp = await fetch(base_url + '/analytics/analytics.php');
    const data = await resp.json();
    setData(data);
    console.log(data)
    setVisible('none');
  };

  useEffect(() => {
    // setlogin(true)
    Linking.addEventListener('url', ({url}) => {
      const route = url.replace(/.*?:\/\//g, '');

      // const a = route.split('/')[1];
      // const r = route.split('/')[2];
      // const q = route.split('/')[3];
      // console.log(a);
      // console.log(r);
      // console.log(q);
      getDataa();

    });
    getDataa();
  }, [table]);

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
          marginHorizontal: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableRipple
          onPress={() => {
            navigation.goBack();
          }}>
          <View
            style={{
              alignItems: 'center',
              color: COLORS.secondary,
              padding: 10,
            }}>
            <AwesomeIcon
              name="arrow-left"
              size={20}
              color={COLORS.light}
              style={{paddingBottom: 4}}
            />
          </View>
        </TouchableRipple>
        <Image
          style={{width: 30, height: 30, alignSelf: 'center'}}
          source={require('../../../assets/analytics.png')}
        />
        <View>
          <Headline style={{color: COLORS.secondary}}>
            Google Analytics
          </Headline>
          <Text style={{color: COLORS.light}}>Users Report</Text>
        </View>
        <TouchableRipple
          onPress={() =>
            Linking.openURL(
              'http://mtechub.com/sample/analyticsAppBackend/analytics/index.php',
            )
          }>
          <View
            style={{
              alignItems: 'center',
              color: COLORS.secondary,
              padding: 10,
            }}>
            <AwesomeIcon
              name="plus"
              size={20}
              color={COLORS.primary}
              style={{paddingBottom: 4}}
            />
          </View>
        </TouchableRipple>
      </View>
      <View
        style={{
          marginVertical: 10,
          borderBottomColor: COLORS.light,
          borderBottomWidth: 0.5,
        }}></View>

      <DataTable
        style={{
          paddingHorizontal: 10,
        }}>
        <DataTable.Header>
          <DataTable.Title>Websites </DataTable.Title>
          <DataTable.Title numeric>Users</DataTable.Title>
        </DataTable.Header>
        <ActivityIndicator
          animating={true}
          color={COLORS.primary}
          size={'large'}
          style={{padding: 100, display: visible}}
        />
        {visible == 'flex' ? (
          <View></View>
        ) : (
          
          <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        
      />
        )}
      </DataTable>
    </View>
  );
}

export default Analytics;
