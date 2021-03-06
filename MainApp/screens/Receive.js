import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput,StatusBar ,Alert,} from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert'




export default class Receive extends Component {
    constructor(props) {
   
        super(props)
        this.state = {
            cus_name : this.props.navigation.getParam('cus_name', 'Name'),
            cus_phone: this.props.navigation.getParam('cus_phone', 'phone'),
            customer_id: this.props.navigation.getParam('customer_id', '0'),
            amount:'',
            msg:"",
            personal_info_id:"",
            spinner: false,
            bal:"0.00",
            show: false,
            pin:"",
            
  
 
        }
    }
    async componentDidMount() {
        this.setState({ spinner: true });
        this.setState({ 
        personal_info_id: await AsyncStorage.getItem('@personal_info_id') ,
        getCurrency: await AsyncStorage.getItem('@getCurrency'), });
        try {
   
        const BalApiCall = await fetch(Constant.URL+Constant.getCusBal+"/"+this.state.customer_id);
            const dataSource = await BalApiCall.json();
           console.log("dataSource",dataSource)
            this.setState({bal: dataSource.bal, spinner: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    
    }

    handleOpen = () => {
        const { amount } = this.state;
        if (amount.length <= 0) {
          this.setState({ spinner: false });
          Alert.alert("Please fill out the required field.");
        }else {
        this.setState({ show: true })
        }
      }
    
      handleClose = () => {
        this.setState({ show: false })
      }

    onPressCredit = async() => {

        this.setState({ spinner: true });
        const { amount } = this.state;
        if (amount.length <= 0) {
          this.setState({ spinner: false });
          Alert.alert("Please fill out the required field.");
        }else {
             // post method
    fetch(Constant.URL+Constant.addCREDIT,{
        method: 'POST',
        body: JSON.stringify({ 
            customer_id: this.state.customer_id,
            personal_info_id: this.state.personal_info_id,
            msg: this.state.msg,
            pin: this.state.pin,
            amount: this.state.amount})
          })
          .then((response) => response.json())
          .then((result) => {
     
        this.setState({
                spinner: false,
             dataSource: result, 
          });
      
          console.log(this.state.dataSource.data);
          if(this.state.dataSource.code==200){
           
          this.setState({spinner: false });
          Alert.alert(this.state.dataSource.data.message);
        this.setState({
            amount:'',
            pin:"",
           show: false 
        });
          
          }else{
            this.setState({ spinner: false });
            Alert.alert(this.state.dataSource.data.message);
          }
          
         }).catch(function (error) {
          this.setState({ spinner: false });
         console.log("-------- error ------- "+error);
         alert("result:"+error)
         });
      
      //end post method
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
                    <Text style={styles.headTxt}>Credit  {this.state.cus_name}</Text>
                </View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray', alignItems: 'center' }}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.userimg} source={require('../assets/img/boy.png')} />
                        </View>
                        <View style={styles.userdetails}>
                            <Text style={{ fontSize: 18, color: '#000', fontFamily: 'Poppins-Light' }}>{this.state.cus_name}</Text>
                            <Text style={{ fontSize: 12, color: '#000', fontFamily: 'Poppins-Thin' }}>{this.state.cus_phone}</Text>
                        </View>
                        <Text style={{ fontSize: 10, color: '#020cab', paddingRight: 20, fontFamily: 'Poppins-MediumItalic' }} onPress={() => this.props.navigation.navigate("ReceiveHistory",
                          {
                            cus_name: this.state.cus_name,
                            customer_id: this.state.customer_id,
                          
                          }
                         )}>View History</Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 , paddingTop:10}}  >
                        <Icon style={{ padding: 5 }} family="Entypo" name="wallet" size={30} color="#020cab" />
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Regular' }}>Wallet Balance :</Text>
                            <Text style={{ fontSize: 20, color: '#000', fontFamily: 'Poppins-ExtraLight' }}> {this.state.getCurrency} {this.state.bal}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                        <Icon family="FontAwesome" name="money" size={25} />
                        <TextInput style={{ paddingLeft: 10, fontSize: 16 }}
                            keyboardType='number-pad'
                            placeholder="Enter Amount"
                            onChangeText={(amount)=>this.setState({amount})}
                            value={this.state.amount}
                        />
                    </View>
                   

                    
                       
                        
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                        <TextInput style={{ flex: 1, paddingLeft: 10, fontSize: 16, fontFamily:'Poppins-ExtraLightItalic' }}
                            keyboardType='email-address'
                            placeholder="Add a message (Optioncal)"
                            onChangeText={(msg)=>this.setState({msg})}
                            value={this.state.msg}
                        />
                    </View>
                    <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.handleOpen}  >
                        <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 ,  fontFamily: 'Poppins-Bold',}}>CREDIT</Text>
                    </TouchableOpacity>
                    <View style={{margin: 20}}></View>

                    <SCLAlert
                        theme="info"
                        show={this.state.show}
                        title="Enter Your Pin"
                        onRequestClose
                        subtitle="Enter Pin To Complete Transaction"
                        onRequestClose={() => {
                            this.setState({ show: false })
                            }}
                        >
                            
                        <TextInput style={{ paddingLeft: 10, fontSize: 16 }}
                            keyboardType='number-pad'
                            placeholder="Enter Pin"
                            onChangeText={(pin)=>this.setState({pin})}
                            value={this.state.pin}
                            secureTextEntry={true}
                            maxLength={4}
                        />
          <SCLAlertButton theme="info" onPress={this.onPressCredit} >CREDIT</SCLAlertButton>
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