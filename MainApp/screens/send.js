import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput,StatusBar,Picker ,Alert} from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import { TextInputMask } from 'react-native-masked-text'
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert'



export default class Send extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cus_name : this.props.navigation.getParam('cus_name', 'Name'),
            cus_phone: this.props.navigation.getParam('cus_phone', 'phone'),
            customer_id: this.props.navigation.getParam('customer_id', '0'),
            cc_type:this.props.navigation.getParam('cc_type', '0'),
            wallet:"0.00",
            amount:"" ,
            charges:"",
            to:"",
            rate:"",
            country_id:0,
            CountryList: [],
            currentLabel: 'Select your currency',
            personal_info_id:"",
            spinner: true,
            bal:"0.00",
            r_bal:0,
            BankList:[],
            bank_id:0,

        
          
        }
       
    }
    async componentDidMount() {
     
        this.setState({ spinner: true });
        this.setState({ 
        personal_info_id: await AsyncStorage.getItem('@personal_info_id') ,
        getCurrency: await AsyncStorage.getItem('@getCurrency'),
        getFrom: await AsyncStorage.getItem('@getFrom'),
     
       
    
    });
   
        try {
   
        const BalApiCall = await fetch(Constant.URL+Constant.getCusBal+"/"+this.state.customer_id);
            const dataSource = await BalApiCall.json();
           console.log("dataSource",dataSource)
            this.setState({bal: dataSource.bal,r_bal:dataSource.r_bal, spinner: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }

        try {
       
            const CountryApiCall = await fetch(Constant.URL+Constant.getCOUNTRY+"/"+this.state.getFrom);
            const getCountry = await CountryApiCall.json();
            console.log("getCountry",getCountry)
            this.setState({CountryList: getCountry, spinner: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }

    
    
    }

    handleClose = () => {
        this.setState({ show: false })
     }


    onPress = async() => {
 
            const getAmount =this.amountV.getRawValue()
            const getCharges = this.chargesV.getRawValue()
        this.setState({ getAmount :getAmount, getCharges : getCharges});
        const { amount ,charges} = this.state;

        if(this.state.cc_type == 2){
            
            if (this.state.bank_id<= 0) {
            Alert.alert("Please Select a Bank");
            return false
            }
        }
        if (amount.length <= 0 || charges.length <=0 || this.state.to<=0)  {
        
          Alert.alert("Please fill out the required field.");
        }else if(getAmount <= getCharges  ){
            Alert.alert("Your Charges Must Be Less  Than The Amount You Are Sending");
        } else if(this.state.r_bal < (getAmount)  ){
          
            Alert.alert("Insufficient Credit ");
        }
        else {
            this.setState({spinner: true});
        //Get rate
       
        fetch(Constant.URL+Constant.getRATE,{
            method: 'POST',
            body: JSON.stringify({ 
                  amount: this.state.amount,
                  rateType: this.state.rateType,
                  to: this.state.to,
                  from: this.state.getFrom})
              })
              .then((response) => response.json())
              .then((result) => {
                  console.log("allrest",result);
            this.setState({
                    spinner: false,
                dataSource: result,
              });
            }).catch(function (error) {
                this.setState({ spinner: false });
               console.log("-------- error ------- "+error);
               alert("result:"+error)
               });
        //Get Rate
        if(this.state.dataSource.code==200){
         

                const getAmount =this.amountV.getRawValue()
                const getCharges = this.chargesV.getRawValue()
                this.setState({ show: false })  
                   this.props.navigation.navigate("Rate",{
                   cus_name: this.state.cus_name,
                   customer_id: this.state.customer_id,
                   amount:getAmount,
                   dollar:this.state.dataSource.data.dollar_rate_1,
                   local:this.state.dataSource.data.local_rate_1,
                   dollar2:this.state.dataSource.data.dollar_rate_2,
                   local2:this.state.dataSource.data.local_rate_2,
                   charges:getCharges,
                   to:this.state.dataSource.data.to_currency,
                   to_id:this.state.to,
                   from:this.state.getCurrency,
                   fromAgent:this.state.personal_info_id,
                   cus_phone:this.state.cus_phone,
                   bank_id:this.state.bank_id,
                            
                } )
            
            }else{
              this.setState({ spinner: false });
              Alert.alert(this.state.dataSource.data.message);
            }
        
              
        }
    }

     
    render() {
        
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                 <Spinner
                visible={this.state.spinner}
                overlayColor={'rgba(0, 0, 0, 0.25)'}
                />
            <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.headContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
        <Text style={styles.headTxt}>Send {this.state.cus_name} </Text>
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
                        
                    </View>
                   
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop:10 }} onPress={() => this.props.navigation.navigate("Receive")} >
                        <Icon style={{ padding: 5 }} family="Entypo" name="wallet" size={30} color="#020cab" />
                        <View>
                        <Text style={{ fontFamily: 'Poppins-Regular' }}>Wallet Balance :</Text>
                            <Text style={{ fontSize: 20, color: '#000', fontFamily: 'Poppins-ExtraLight' }}> {this.state.getCurrency} : {this.state.bal}</Text>
                        </View>
                    </TouchableOpacity>


                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                        
                        <Text >Amount</Text>
                        <TextInputMask style={{ paddingLeft: 10, fontSize: 16 }}
                            type={'money'}
                            placeholder="Enter Amount"
                            options={{
                                precision: 2,
                                separator: '.',
                                delimiter: ',',
                                unit: '',
                                suffixUnit: ''
                            }}
                            value={this.state.amount}
                            onChangeText={text => {
                            this.setState({
                                amount: text
                            })
                            }}
                            ref={(ref) => this.amountV = ref}
                        />
                       
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    <Text >Charges</Text>
                        <TextInputMask style={{ paddingLeft: 10, fontSize: 16 }}
                            type={'money'}
                            placeholder="Enter Charges"
                            options={{
                                precision: 2,
                                separator: '.',
                                delimiter: ',',
                                unit: '',
                                suffixUnit: ''
                            }}
                            value={this.state.charges}
                            onChangeText={text => {
                            this.setState({
                                charges: text
                            })
                            }}
                            ref={(ref) => this.chargesV = ref}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                            <Text  style={{ flex: 0.1, paddingLeft: 1 }} ></Text> 
                            <Picker  style={{ flex: 0.9, paddingLeft: 150 }}  
                            selectedValue={this.state.to}  
                            onValueChange={(itemValue, itemPosition) => this.setState({to: itemValue, toIndex: itemPosition})}   >  
                             <Picker.Item label="RECEIVING CURRENCY" value="0" /> 
                             {
                                this.state.CountryList.map( (v)=>{
                                return <Picker.Item label={v.country +" - "+ v.currency }  value={v.country_id} />
                                })
                                } 
                            </Picker> 
                        </View>

                    
                    
                    <SCLAlert
                        theme="info"
                        show={this.state.show}
                        title="Calculated Amount"
                        onRequestClose={() => {
                            this.setState({ show: false })
                            }}
                        >
                          
                          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                    <Text >Rate</Text>
                        <TextInputMask style={{ paddingLeft: 10, fontSize: 16 }}
                            type={'money'}
                            placeholder="Enter Rate"
                            options={{
                                precision: 4,
                                separator: '.',
                                delimiter: ',',
                                unit: '',
                                suffixUnit: ''
                            }}
                            value={this.state.rate}
                            onChangeText={text => {
                            this.setState({
                                rate: text
                            })
                            }}
                            ref={(ref) => this.rateV = ref}
                        />
                    </View>
                        <View>
                        
                            <Text style={{ fontSize: 20, color: '#000', fontFamily: 'Poppins-ExtraLight' ,textAlign: "center"}}> {this.state.getCurrency} : 
                            <Text style={{  color: 'red',textAlign: "center" }}>{(this.state.getAmount - this.state.getCharges)*(this.state.getRate)}</Text>
                            </Text>
                        </View>
                  
                        
                         <SCLAlertButton theme="info" onPress={this.onPressB} >Add Beneficiary</SCLAlertButton>
                    </SCLAlert>

                  
                    
                    
      
                    <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.onPress}> 
                    <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 ,  fontFamily: 'Poppins-Bold',}}>Proccess</Text>
                    </TouchableOpacity>
                    <View style={{margin: 20}}></View>
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