import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ThemeStyle from '../styles/Theme';
import { NavigationActions, StackActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import Constant from "../components/Constant";
import NetInfo from "@react-native-community/netinfo";

// Subscribe

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isLoggedIn : 0,
            dataSource:'',
        };
    
    }
   
    async componentWillMount() {
   
        const isLoggedIn = await AsyncStorage.getItem('@isLoggedIn');
        const personal_info_id= await AsyncStorage.getItem('@personal_info_id');
        if (isLoggedIn) {
          this.setState({
            isLoggedIn,
            personal_info_id,
          });
        }
        
      }

    componentDidMount() {
      
           

        var timer = setTimeout(() => {
            this.setState({
                visible: !this.state.visible
            });

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'SliderScreen' })],
            });
         
              //Check Network
              NetInfo.fetch().then(state => {
          
                console.log("Connection type", state.type);
                console.log("Is connected??", state.isConnected);
                if(!state.isConnected)
                { 
                console.log("Is connected??", false);
                this.props.navigation.navigate("NoNetworkScreen");
                }else{
          
          //Check Network --
            console.log("isLoggedIn",this.state.isLoggedIn)
            if(this.state.isLoggedIn=='1'){
            //LOAD DATA FROM D
          
            (async () => {
               
                console.log("ersonal_info_id",this.state.personal_info_id)
                try {

                    const UsersApiCall = await fetch(Constant.URL+Constant.getUSER+"/"+this.state.personal_info_id,);
                    const getUser= await UsersApiCall.json();
                 
                    this.setState({dataSource: getUser});
                } catch(err) {
                    console.log("Error fetching data-----------", err);
                }
               
                if(this.state.dataSource.code==200){
                    await AsyncStorage.setItem('@isLoggedIn', '1'),
                    await AsyncStorage.setItem('@email', this.state.dataSource.data.email),
                    await AsyncStorage.setItem('@first_name', this.state.dataSource.data.first_name),
                    await AsyncStorage.setItem('@last_name', this.state.dataSource.data.last_name),
                    await AsyncStorage.setItem('@phone', this.state.dataSource.data.phone),
                    await AsyncStorage.setItem('@country', this.state.dataSource.data.country),
                    await AsyncStorage.setItem('@personal_info_id', this.state.dataSource.data.personal_info_id),
                    await AsyncStorage.setItem('@store_vid', this.state.dataSource.data.store_vid),
                    await AsyncStorage.setItem('@getCurrency', this.state.dataSource.data.currency)
                    await AsyncStorage.setItem('@wallet', this.state.dataSource.data.bal)    
                    //Local Store
                  
                this.props.navigation.navigate("TabNav", {
                    first_name: await AsyncStorage.getItem('@first_name'),
                    last_name: await AsyncStorage.getItem('@last_name'),
                    email: await AsyncStorage.getItem('@email'),
                    getCurrency: await AsyncStorage.getItem('@getCurrency'),
                    phone: await AsyncStorage.getItem('@phone'),
                    wallet: await AsyncStorage.getItem('@wallet'),
                });
            }else{
                this.props.navigation.navigate("LoginScreen") 
            }

            })();

            }else{
                
            this.props.navigation.dispatch(resetAction);
            }
//Check Network ""
            }
     });
        }, 2000);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient colors={['#fc0f84', '#020cab']}
                    start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={{ flex: 1 }}>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Image style={styles.logo} source={require("./../assets/img/logo.png")} />
                        <Text style={{color:'#FFF',fontSize:20,fontFamily:'Poppins-Bold'}}>Kingoka Group</Text>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        resizeMode: "contain",
    },
})