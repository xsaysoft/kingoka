import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ThemeStyle from '../styles/Theme';
import { NavigationActions, StackActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';

import NetInfo from "@react-native-community/netinfo";

// Subscribe

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isLoggedIn : 0,
            dataSource:[],
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
                     Constant.SetAsyncValue('@isLoggedIn', '1'),
                     Constant.SetAsyncValue('@email', this.state.dataSource.data.email),
                     Constant.SetAsyncValue('@first_name', this.state.dataSource.data.first_name),
                     Constant.SetAsyncValue('@last_name', this.state.dataSource.data.last_name),
                     Constant.SetAsyncValue('@phone', this.state.dataSource.data.phone),
                     Constant.SetAsyncValue('@country', this.state.dataSource.data.country),
                     Constant.SetAsyncValue('@personal_info_id', this.state.dataSource.data.personal_info_id),
                     Constant.SetAsyncValue('@store_vid', this.state.dataSource.data.store_vid),
                     Constant.SetAsyncValue('@getCurrency', this.state.dataSource.data.currency),
                     Constant.SetAsyncValue('@getFrom', this.state.dataSource.data.country_id),
                     Constant.SetAsyncValue('@profit_rate', this.state.dataSource.data.profit_rate)
                   
                    //Local Store
                  
                this.props.navigation.navigate("TabNav", {
                    first_name: this.state.dataSource.data.first_name,
                    last_name: this.state.dataSource.data.last_name,
                    email: this.state.dataSource.data.email,
                    getCurrency: this.state.dataSource.data.currency,
                    phone: this.state.dataSource.data.phone,
                    userInfo: this.state.dataSource.data,
                    personal_info_id: this.state.dataSource.data.personal_info_id,
                    getFrom: this.state.dataSource.data.country_id,
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