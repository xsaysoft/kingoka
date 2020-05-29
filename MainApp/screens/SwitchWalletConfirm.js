import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput,StatusBar ,Alert,Picker} from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';

import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';

import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert'
import {connect} from "react-redux";





 class  SwitchWalletConfirm extends Component {
    constructor(props) {
   
        super(props)
        this.state = {
            currency : this.props.navigation.getParam('currency', 'Name'),
            country: this.props.navigation.getParam('country', 'phone'),
            country_id: this.props.navigation.getParam('country_id', '0'),
            spinner: false,
            bal:"0.00",
            show: false,
            pin:"",
            Amessage:"",
            Smessage:"",
  
 
        }
    }
    async componentDidMount() {
        //this.setState({ spinner: true });
        this.setState({ 
            personal_info_id: await AsyncStorage.getItem('@personal_info_id')  });
    
    }

    async bal() {

        this.setState({ spinner: true });
        try {

            const BalApiCall = await fetch(Constant.URL + Constant.getAgBal + "/" + this.state.personal_info_id+"/"+this.state.country_id);
            const dataSource = await BalApiCall.json();
            await AsyncStorage.setItem('@wallet', dataSource.bal)
            
            this.props.getCustomerWallet(dataSource.c_bal)
            this.props.getAgentWallet(dataSource.bal)
            this.props.getAgentCurrency(this.state.currency)
            this.setState({ wallet: dataSource.bal, c_wallet: dataSource.c_bal, spinner: false });
        } catch (err) {
            console.log("Error fetching data-----------", err);
            this.setState({ spinner: false });
        }
    }
  

  
    handleOpen = async() => {
        this.setState({ show: true })
        if(Constant.removeAsyncValue('getFrom') &&  Constant.removeAsyncValue('getCurrency')){
       
        await AsyncStorage.setItem('@getFrom', this.state.country_id)
       await AsyncStorage.setItem('@getCurrency', this.state.currency)
        this.bal()
         this.setState({ spinner: false,Sshow: true ,Smessage:"Wallet Currecy has been changed successfully" });
        }else{
            this.setState({ spinner: false,Ashow: true ,show: false,Amessage:"Unable to make changes, please try again" });
        }
        
        

      }
    
      

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }} >
                 <Spinner
                visible={this.state.spinner}
                overlayColor={'rgba(0, 0, 0, 0.25)'}
                />

            <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.headContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headTxt}>Confirm Switch Wallet To  {this.state.currency} </Text>
                </View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray', alignItems: 'center' }}>
                        <View style={styles.imgContainer}>
                        <Icon family="FontAwesome" name="money"  size={22} />
                        </View>
                        <View style={styles.userdetails}>
                            <Text style={{ fontSize: 18, color: '#000', fontFamily: 'Poppins-Light' }}>{this.state.currency}</Text>
                            <Text style={{ fontSize: 12, color: '#000', fontFamily: 'Poppins-Thin' }}>{this.state.country}</Text>
                        </View>
                       
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 , paddingTop:10}}  >
                        
                    </TouchableOpacity>
                   
                    <View style={{  alignItems: 'center', margin: 15, paddingHorizontal: 15}}>
                        <Text style={{marginTop:1,color:"red", fontSize: 18}}>
                        I UNDERSTAND THAT SWITCHING MY WALLET WILL CHANGE MY DEFAULT WALLET CURRENCY , COUNTRY AND CUSTOMER UNDER MY ACCOUNT. AUTO ADD ADD WILL BE ACTIVATED ON THIS WALLET 
                        </Text>
                        <Text style={{marginTop:15,color:"#000"}}>
                       YOU CAN SWITCH BACK TO YOUR DEFAULT ACCOUNT AT ANY TIME 
                        </Text>

                    </View>

                 
                    <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.handleOpen}  >
                        <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 ,  fontFamily: 'Poppins-Bold',}}>CONFIRM WALLET SWITCH</Text>
                    </TouchableOpacity>
                    <View style={{margin: 20}}></View>

                    

        <SCLAlert
                        theme="danger"
                        show={this.state.Ashow}
                        title="Error Message"
                        subtitle={this.state.Amessage}
                        onRequestClose={() => {
                            this.setState({ Ashow: false })
                            }}
                        >         
                 
                    <SCLAlertButton theme="danger" onPress={() => {
                            this.setState({ Ashow: false })
                            }} >Close</SCLAlertButton>
                 </SCLAlert>

        <SCLAlert
                        theme="success"
                        show={this.state.Sshow}
                        title="Successful Message"
                        subtitle={this.state.Smessage}
                        onRequestClose={() => {
                            this.setState({ Sshow: false })
                            }}
                        >
                            
                 
          <SCLAlertButton theme="success" onPress={() => {
                            this.props.navigation.navigate("TabNav")
                            }} >Close</SCLAlertButton>
        </SCLAlert>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#020cab'
    },
    headTxt: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'Poppins-Bold',
        marginHorizontal: 20
    },
    imgContainer: {
        backgroundColor: "#fff",
        marginHorizontal: 10,
        marginVertical: 10,
        width: 55,
        height: 55,
        borderRadius: 55 / 2,
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        elevation: 2,
        shadowColor: 'lightgrey',
        shadowOffset: { width: -0.5, height: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    userimg: {
        width: 40,
        height: 40,
        resizeMode: "contain"
    },
    userdetails: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    acTxt: {
        backgroundColor: '#FFF',
        paddingVertical: 5,
        paddingLeft: 15,
        marginVertical: 10
    },
    txtbox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 50,
        margin: 10,
    },
});

function  mapStateProps(state){
    return{
        userW:state.userW,
        agentW:state.agentW,
        agentC:state.agentC
    }
 }

 function mapDispatchProps(dispatch){
    
    return{
     getCustomerWallet: (response) => dispatch({
        type: 'CUSTOMER_WALLET',
        payload: response
     }),
     getAgentWallet: (response) => dispatch({
         type: 'AGENT_WALLET',
         payload: response
        }),
        getAgentCurrency: (response) => dispatch({
            type: 'AGENT_CURRENCY',
            payload: response
           }),
    }
 }


export default connect(mapStateProps,mapDispatchProps)(SwitchWalletConfirm)

