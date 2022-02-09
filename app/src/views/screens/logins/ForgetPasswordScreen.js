import 'react-native-gesture-handler';
import React, { useState,useRef,useEffect } from 'react';
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
    Animated
} from 'react-native';
import { TextInput, Text, Button, Snackbar,Headline } from 'react-native-paper';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import RBSheet from "react-native-raw-bottom-sheet";
import COLORS from '../../../consts/colors'
import base_url from '../../../consts/base_url'
import STYLES from '../../../styles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// vierify code 

const styles = StyleSheet.create({
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { flex: 1, paddingHorizontal: '12%' },
    cell: {
        width: 50,
        height: 50,
        lineHeight: 38,
        fontSize: 24,
        marginLeft: 10,
        paddingTop: 4,
        borderWidth: 1,
        borderRadius: 5,
        color: COLORS.light,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: COLORS.primary,
    },
});

const CELL_COUNT = 4;

function ForgetPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [displayEmail, setdisplayEmail] = useState('none');
    const [password, setPassword] = useState('')
    const [checkEmail, setCheckEmail] = useState(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/)
    const [showPass, setShowPass] = useState(false)
    // snackbar

    const [visible, setVisible] = useState(false);
    const [snackbarValue, setsnackbarValue] = useState({ value: '', color: '' });
    const onDismissSnackBar = () => setVisible(false);
// veirficfaion 
const [value, setValue] = useState('');
const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
});
// veirficfaion  ENd
///veirfy counter
const refRBSheet = useRef();
const [verify_code, setverify_code] = useState('');
const [verify_code_status, setverify_code_status] = useState('none');
const [isPlaying, setIsPlaying] = useState(false)
const [key, setKey] = useState(0);
const [resend_grey, setresendgrey] = useState('flex');
const [resend_primary, setresendprimary] = useState('none');

// end veirfy counter


    // login api call
    const [loading, setloading] = useState(0);
    const [disable, setdisable] = useState(0);


    const checkValue = async () => {

        if (email.length == 0) {
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
   //send verififcation code 
   const insertValue = async () => {


    
        // setloading(true);
        console.log(email)
        var InsertAPIURL = base_url + '/user/forgetPassword.php'
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        var Data = {

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
                if (response[0].message === 'emailnotexsist') {
                    // setloading(false);
                    setError('Email Not Exsist')
                    setVisible(true)

                    console.log(response[0])
                }
                else {
                    setloading(0)
                    setdisable(0)
                    setTimeout(() => {
                        setverify_code(response[0].code)
                        
                    }, 500);
                    refRBSheet.current.open()
                    console.log(response[0])
                }
            })
            .catch((error) => {
                // setloading(false);
                alert('error' + error)

            })
    
}
//  send verififcation code end

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

                <View style={{ flexDirection: 'column', marginVertical: '30%', justifyContent: "center",alignItems:'center' }}>
                    <Image
                        style={{ width: 310, height: 67 }}
                        source={require('../../../assets/logo.png')}
                    />
                    <Headline>Forgot Password?</Headline>
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
                <View style={{ flexDirection: 'column', marginHorizontal: '3%', justifyContent: "center" }}>
                <Text style={{alignSelf:'center',marginBottom:20}}>Enter Email for Verification Code</Text>
                    <TextInput
                        label="Email"
                        mode='outlined'
                        activeOutlineColor={COLORS.primary}

                        left={<TextInput.Icon name="email" color={'grey'} />}

                        onChangeText={(e) => {
                            setEmail(e)
                        }}
                    />

                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 20, height: height / 2.4 }}>
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
                        <Text style={{ color: 'white', fontSize: 20 }}>Send Code</Text>
                    </Button>
                    
                </View>
                {/* RB SHEET */}
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "rgba(0,0,0,.5)",

                        },
                        draggableIcon: {
                            backgroundColor: COLORS.light
                        },
                        container: {
                            paddingHorizontal: '4%'
                        }
                    }}
                    height={height / 1.8}
                >


                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',

                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Headline style={{ color: COLORS.primary }}>
                                Verification
                            </Headline>
                            <TouchableOpacity

                                onPress={() => {
                                    refRBSheet.current.close()
                                }}
                            >
                                <Icon name="times" size={25} color={COLORS.light} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignSelf: 'center', marginVertical: 20 }}>
                            <Text style={{ textAlign: 'center' }}>
                                We have sent 4 digit code to your Email
                            </Text>
                            <Text style={{ textAlign: 'center' }}>
                                Check your Mail box
                            </Text>

                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                            <CodeField
                                ref={ref}
                                {...props}
                                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                                value={value}
                                onChangeText={setValue}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                renderCell={({ index, symbol, isFocused }) => (
                                    <Text
                                        key={index}
                                        style={[styles.cell, isFocused && styles.focusCell]}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                            
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignSelf: 'center'}}>
                            <Text style={{ textAlign: 'center',color:COLORS.red,display:verify_code_status }}>
                                Code Not Matched
                            </Text>
</View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: '5%' }}>
                            <CountdownCircleTimer
                                key={key}
                                size={40}
                                strokeWidth={0}
                                isPlaying={isPlaying}
                                duration={110}
                                onComplete={() => {
                                    // do your stuff here
                                    setresendgrey('none')
                                    setresendprimary('flex')
                                    return [setIsPlaying(true), 100] // repeat animation in 1.5 seconds
                                }}
                                colors={[
                                    [COLORS.primary, 1],
                                ]}

                            >
                                {({ remainingTime, animatedColor }) => (
                                    <Animated.Text style={{ color: COLORS.light, fontSize: 15, fontWeight: '700' }}>
                                        {remainingTime}s
                                    </Animated.Text>
                                )}
                            </CountdownCircleTimer>
                            <View style={{ flexDirection: "row", flex: 1, justifyContent: 'flex-end' }}>
                                <TouchableOpacity style={{ width: "40%", marginTop: 10, display: resend_grey }}

                                >
                                    <View >
                                        <Text style={{ color: COLORS.light, fontWeight: "bold", fontSize: 15 }}>Resend Code</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: "40%", marginTop: 10, display: resend_primary }}
                                    onPress={() => {
                                        setKey(prevKey => prevKey + 1)
                                        insertValue()
                                        setresendgrey('flex')
                                        setresendprimary('none')
                                    }}
                                >
                                    <View >
                                        <Text style={{ color: COLORS.primary, fontWeight: "bold", fontSize: 15 }}>Resend Code</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '20%' }}>
                            <Button
                                compact={1}
                                mode="contained"

                                style={{
                                    width: '90%',
                                    backgroundColor: COLORS.secondary,

                                }}
                                contentStyle={{
                                    padding: 9,

                                }}
                                onPress={() => {
                                    if(verify_code==value) {
                                        console.log('code match')
                                        refRBSheet.current.close()
                                        navigation.navigate('NewPasswordScreen',{ email:email  })
                                        
                                    }
                                    else {
                                        // console.log('')
                                        setverify_code_status('flex')
                                        setTimeout(() => {
                                            setverify_code_status('none')
                                        }, 1000);
                                    }
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}
                                >Verify</Text>
                            </Button>
                        </View>

                    </View>


                </RBSheet>
            </SafeAreaView>
        </ScrollView>
    )
}

export default ForgetPasswordScreen;