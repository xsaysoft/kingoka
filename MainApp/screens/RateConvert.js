import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput,StatusBar,Picker ,Alert} from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';
import { TextInputMask } from 'react-native-masked-text'




export default class RateConvert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cus_name : this.props.navigation.getParam('cus_name', 'Name'),
            cus_phone: this.props.navigation.getParam('cus_phone', 'phone'),
            customer_id: this.props.navigation.getParam('customer_id', '0'),
            amount: this.props.navigation.getParam('amount', '0'),
            rate: this.props.navigation.getParam('rate', '0'),
            rate_type : this.props.navigation.getParam('rate_type', '0'),
            charges: this.props.navigation.getParam('charges', '0'),
            to: this.props.navigation.getParam('to', '0'),
            to_id: this.props.navigation.getParam('to_id', '0'),
            from: this.props.navigation.getParam('from', '0'),
            fromAgent: this.props.navigation.getParam('fromAgent', '0'),
            bank_id:this.props.navigation.getParam('bank_id', '0'),
            ch_type: this.props.navigation.getParam('ch_type','0'),
            due_amount: this.props.navigation.getParam('due_amount','0'),
            getCountry_id:this.props.navigation.getParam('getCountry_id','0'),
            bal:this.props.navigation.getParam('bal','0.00'),
            CountryList: [],rate_confirm_id:"",to_id_new:0,rate_new:0,rate_v:0,rate_type_new:0,getCountryN:[],
            personal_info_id:"",new_due:0,new_to:"",
            spinner: true,
            show: false,
       

         
         
        }
    
    }


    async componentDidMount() {

        this.setState({ wallet: await AsyncStorage.getItem('@wallet') ,
        personal_info_id: await AsyncStorage.getItem('@personal_info_id') ,
        getCurrency: await AsyncStorage.getItem('@getCurrency'),
        
    
     });
        
        try {
       
            const BenApiCall = await fetch(Constant.URL+Constant.getBEN+"/"+this.state.customer_id);
            const getBen = await BenApiCall.json();
        
            this.setState({BenList: getBen, spinner: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
            //Get Country Details
            try {

                const CountryApi = await fetch(Constant.URL + Constant.getCountryMain + "/" + this.state.to_id);
                const getCountryN = await CountryApi.json();
                console.log("CountryData", getCountryN.data.dial_code)
                this.setState({ spinner: false ,dial_code:getCountryN.data.dial_code,number_length:getCountryN.data.number_length});
            } catch (err) {
                console.log("Error fetching data-----------", err);
            }

            //Get Country List
            try {

                const CountryApiCall = await fetch(Constant.URL + Constant.getCOUNTRY + "/" + this.state.to_id);
                const getCountry = await CountryApiCall.json();
                console.log("getCountry", getCountry)
                this.setState({ CountryList: getCountry, spinner: false });
            } catch (err) {
                console.log("Error fetching data-----------", err);
            }
    
      
    
    }

    async GetCurrency (text){
        
        try {

            const CountryApiCall = await fetch(Constant.URL + Constant.getCountryMain + "/"+text);
            const getCountryN = await CountryApiCall.json();
            console.log("getCountryK", getCountryN)
            this.setState({ new_to: getCountryN.data.currency, spinner: false });
        } catch (err) {
           
        }
        }


    onTextChange(text) {
        var cleaned = ('' + text).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            var intlCode = (match[1] ? '+1 ' : ''),
                number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    
            this.setState({
                phoneNum: number
            });
    
            return;
        }
    
        this.setState({
            phoneNum: text
        });
    }

    handleClose = () => {

        this.setState({ show: false })
     }

    onPressShow = async () => {
        if(this.state.rate_confirm_id==0){
            Alert.alert("Please Select Payout Type.");
            return false
        }
        if(this.state.rate_confirm_id==1){
         this.props.navigation.navigate("SendB",{
            cus_name: this.state.cus_name,
            cus_phone:this.state.cus_phone,
            customer_id: this.state.customer_id,
            amount:this.state.amount,
            rate:this.state.rate,
            charges:this.state.charges,
            to:this.state.to,
            to_id:this.state.to_id,
            from:this.state.from,
            fromAgent:this.state.fromAgent,
            rate_type:this.state.rate_type,
            bank_id:this.state.bank_id,
            ch_type: this.state.ch_type,
            due_amount: this.state.due_amount,
            getCountry_id:this.state.getCountry_id,
            
         })
        }

        if(this.state.rate_confirm_id==2){
            if(this.state.to_id_new==0){
                Alert.alert("Please Select Converting Currency.");
                return false
            }
            if(this.state.rate_type_new==0){
                Alert.alert("Please Select Rate Type.");
                return false
            }

            this.props.navigation.navigate("SendB",{
               cus_name: this.state.cus_name,
               cus_phone:this.state.cus_phone,
               customer_id: this.state.customer_id,
               amount:this.state.amount,
               rate:this.state.rate,
               charges:this.state.charges,
               to:this.state.new_to,
               to_id:this.state.to_id_new,
               from:this.state.from,
               fromAgent:this.state.fromAgent,
               rate_type:this.state.rate_type,
               bank_id:this.state.bank_id,
               ch_type: this.state.ch_type,
               due_amount: this.state.new_due,
               getCountry_id:this.state.getCountry_id,
               
            })
           }
        
    }
    

    render() {
       
      
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                 <Spinner
                visible={this.state.spinner}
                overlayColor={'rgba(0, 0, 0, 0.50)'}
                />
            <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.headContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
        <Text style={styles.headTxt}>  Payout Confirmation </Text>
                </View>
                <ScrollView>
                {this.state.to_id_new != 0 ? ( 
        <View style={styles.AmountCon}>

                <Text style={styles.valTxt}>Converted Amount </Text>
        <View style={styles.rowcenter}>
        
            <Text style={{color: "#FFF",fontSize: 40,paddingLeft: 5}}>
                {Constant.numberFormate(this.state.bal.toFixed(2))}
                <Icon family="Feather" name="plus" size={20} color="#FFF" />
                
            </Text>
        </View>
        <Text style={styles.updateSty}>{this.state.to} </Text>



        <Text style={{textAlign: 'right',fontSize: 12,color: "#fff"}}>Recipient Gets</Text>
        <Text style={{textAlign: 'right',fontSize: 30,color: "#fff"}}>

            {Constant.numberFormate(this.state.new_due.toFixed(2))}
        </Text>
        <Text style={{textAlign: 'right',fontSize: 20,color: "#fff"}}> {this.state.new_to}</Text>

        </View>
         ): null}
                        
      


                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                    <Picker  style={{ flex: 0.9, paddingLeft: 150 }}  
                            selectedValue={this.state.rate_confirm_id}  
                            onValueChange={(itemValue, itemPosition) => this.setState({rate_confirm_id: itemValue, ben_idIndex: itemPosition})}   > 
                            
                             <Picker.Item label="SELECT PAYOUT TYPE" value="0"/> 
                             <Picker.Item label="Pay Direct" value="1" />
                             <Picker.Item label="Convert payout wallet" value="2" /> 
                             
                            </Picker> 
                          
                    </View>
                    {this.state.rate_confirm_id=="2" ? (  <View >

                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                        <Text style={{ flex: 0.1, paddingLeft: 1 }} ></Text>
                        <Picker style={{ flex: 0.9, paddingLeft: 150 }}
                            selectedValue={this.state.to_id_new}
                            onValueChange={(itemValue, itemPosition) => {this.setState({ to_id_new: itemValue, toIndex: itemPosition })
                            this.GetCurrency(itemValue)

                            }}   >
                            <Picker.Item label="CONVERTING CURRENCY" value="0" />
                            {
                                this.state.CountryList.map((v) => {
                                    return <Picker.Item label={v.country + " - " + v.currency} value={v.country_id} />
                                })
                            }
                        </Picker>
                    </View>
                    {this.state.to_id_new != 0 ? ( 
                    <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 5,paddingHorizontal: 10}}>
                        <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                        <Picker style={{flex: 0.9,paddingLeft: 150}}
                            selectedValue={this.state.rate_type_new}
                            onValueChange={(itemValue,itemPosition) => {
                                this.setState({rate_type_new: itemValue,toIndex: itemPosition,due_amount: this.props.navigation.getParam('due_amount','0')})
                                
                                
                            }
                            }>
                            <Picker.Item label="Select Rate Calculation Type" value="0" />
                            <Picker.Item label="Rate Multiplication" value="1" />
                            <Picker.Item label="Rate Division" value="2" />
                        </Picker>
                    </View> ): null}

                    {this.state.rate_type_new  !=0 ? ( 
                         <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>

                         <Text >Rate</Text>
                         <TextInputMask style={{ paddingLeft: 10, fontSize: 16 }}
                             type={'money'}
                             placeholder="Enter New Rate"
                             options={{
                                 precision: 2,
                                 separator: '.',
                                 delimiter: ',',
                                 unit: '',
                                 suffixUnit: ''
                             }}
                             value={this.state.rate_new}
                             onChangeText={text => {
                                this.setState({
                                    rate_new: text
                                });
                               
                                var new_due
                                const getNewRate = Constant.rawNumber(text);
                                if (this.state.rate_type_new == 1) {
                                    // const getRawRate = Constant.rawNumber(this.state.rate_v);
                                    new_due= this.state.bal*getNewRate
                                    this.setState({new_due: new_due})

                                } else if (this.state.rate_type_new == 2) {
                                    new_due= this.state.bal/getNewRate
                                    this.setState({new_due: new_due})
                                    
                                } else {
                                    this.setState({new_due: 0})
                                }
                                 this.setState({
                                    //  amount: text,charges: getpdue
                                 })

                             }}
                             
                         />
 
                     </View>
                             ): null}


                        </View>  ): null}


                     
              

               

                 <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.onPressShow}>
                            <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 ,  fontFamily: 'Poppins-Bold',}}>CONTINUE </Text>
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
    AmountCon: {
        backgroundColor: '#020cab',
        paddingVertical: 20,
        paddingHorizontal: 15,
        paddingTop: -10
    },
    valTxt: {
        color: '#FFF',
        paddingVertical: 10,
        fontSize: 13,
        fontFamily: 'Poppins-Medium'
    },
    updateSty: {
        color: "#FFF",
        fontSize: 20,
        fontFamily: 'Poppins-Regular'
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