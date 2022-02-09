import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View} from 'react-native'
import COLOR from '../consts/colors'

const STYLES = StyleSheet.create({
   
   container :{
    flexDirection: 'column',borderRadius:10,paddingVertical:"10%", alignItems: "center" 
   },
   hr :{
      width:'90%',borderBottomWidth:1,borderBottomColor:COLOR.greylight,alignSelf:'center'
   }
        
})

export default STYLES; 