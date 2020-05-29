import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert,StatusBar } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';
import Theme from "../styles/Theme";
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';

import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert'

export default class Users extends Component {
    constructor() {
        super()
        this.state = {
            isPrepaid: false,
            spinner: false,
            dataSource:'',
            cus_name:'',
            cus_phone:'',
            cus_adr:'',
            personal_info_id:"",
            Smessage:"",
            Amessage:"",
        };
    }

    async componentDidMount() {
        this.setState({ personal_info_id: await AsyncStorage.getItem('@personal_info_id') ,
        getFrom: await AsyncStorage.getItem('@getFrom'),dial_code: await AsyncStorage.getItem('@dial_code'),
        number_length :await AsyncStorage.getItem('@number_length'),
        });
    
    }

    onPressCustomer = async() => {

       
        const { cus_name, cus_phone } = this.state;
        if(cus_phone.length != this.state.number_length){
        Alert.alert("Invalid Phone number formate.  Number length must be "+this.state.number_length);
        return false
        }
        if (cus_name.length <= 0 || cus_phone.length <= 0) {
          this.setState({ spinner: false });
          Alert.alert("Please fill out the required fields.");
        }else {
             // post method
             this.setState({ spinner: true });
    fetch(Constant.URL+Constant.addCUSTOMER,{
        method: 'POST',
        body: JSON.stringify({ 
              cus_name: this.state.cus_name,
              cus_phone: this.state.cus_phone,
              personal_info_id: this.state.personal_info_id,
              getCountry_id:this.state.getFrom,
              cus_adr: this.state.cus_adr})
          })
          .then((response) => response.json())
          .then((result) => {
     
        this.setState({
                spinner: false,
             dataSource: result, 
          });
      
          console.log(this.state.dataSource.data);
          if(this.state.dataSource.code==200){
     
          this.setState({ spinner: false,Sshow: true ,Smessage:this.state.dataSource.data.message });
          }else{
            this.setState({ spinner: false,show: true ,Amessage:this.state.dataSource.data.message });
          }
          
         }).catch(function (error) {
          this.setState({ spinner: false });
         console.log("-------- error ------- "+error);
         alert("result:"+error)
         });
      
      //end post method
        }
    }

    send = () => {
        this.props.navigation.navigate("LoginScreen");
    }


    render() {
       
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                 <Spinner
                    visible={this.state.spinner}
                    overlayColor={'rgba(0, 0, 0, 0.5)'}
                    />
              <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <ScrollView>
                    <View style={styles.headContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                        </TouchableOpacity>
                        <Text style={styles.headTxt}>Customer</Text>
                    </View>

                    <View style={styles.transferbox}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
        <Text style={styles.paidTxt}>Add New Customer </Text>
                         
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Customer Name"
                                keyboardType="name-phone-pad"
                                onChangeText={(cus_name)=>this.setState({cus_name})}
                                value={this.state.cus_name}
                                
                            />
                          
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            
                            <TextInput
                                value={this.state.dial_code}
                            />
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Phone"
                                keyboardType="phone-pad"
                                maxLength={16}
                                onChangeText={(cus_phone)=>this.setState({cus_phone})}
                                value={this.state.cus_phone}
                            />
                           
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Address"
                                keyboardType="name-phone-pad" 
                                onChangeText={(cus_adr)=>this.setState({cus_adr})}
                                value={this.state.cus_adr}
                            />
                          
                        </View>
                        


                        <TouchableOpacity style={{ marginHorizontal: 20, paddingVertical: 20 }} onPress={this.onPressCustomer}>
                            <View style={styles.signContainer}>
                                <Text style={styles.signinTxt}>Add Customer</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{margin: 20}}>
                       
                    </View>

             <SCLAlert
                        theme="danger"
                        show={this.state.show}
                        title="Error Message"
                        subtitle={this.state.Amessage}
                        onRequestClose={() => {
                            this.setState({ show: false })
                            }}
                        >
                            
                 
          <SCLAlertButton theme="danger" onPress={() => {
                            this.setState({ show: false })
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
        fontWeight: '600',
        marginHorizontal: 20
    },
    transferbox: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical:10,
        borderRadius: 15,
    },
    notifiContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 13,
        elevation: 1,
        shadowColor: 'lightgrey',
        shadowOffset: { width: -0.5, height: 0.5 },
        shadowOpacity: 0.1,
        shadowRadius: 1
    },
    paidTxt: {
        fontSize: 18,
        color: '#000',
        fontWeight: '400',
        paddingVertical: 20,
        paddingHorizontal: 30
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
    container: {
        paddingHorizontal: 20,
    },
    txtStl: {
        flex: 0.9,
        color: 'black',
        paddingLeft: 5,
    },
    headertxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: "600",
        paddingVertical: 20,
    },
    txtSignup: {
        color: 'white',
        textAlign: 'center',
    },
    forgettxt: {
        color: 'white',
        textAlign: 'right',
        marginVertical: 10
    },
    signContainer: {
        backgroundColor: '#020cab',
        padding: 10,
        borderRadius: 50
    },
    signinTxt: {
        textAlign: 'center',
        fontWeight: '600',
        color: '#FFF',
        fontSize: 16
    },
    acTxt: {
        paddingLeft: 15,
        marginVertical: 10
    },
})

