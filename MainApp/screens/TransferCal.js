import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput, StatusBar, Alert, Picker } from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';

import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert'
import { connect } from "react-redux";




class TransferCal extends Component {
    constructor(props) {

        super(props)
        this.state = {

            c_type: this.props.navigation.getParam('c_type', '0'),

            BankList: [],
            AgentList: [],
            bank_id: "",
            amount: '',
            msg: "",
            personal_info_id: "",
            spinner: false,
            bal: "0.00",
            show: false,
            income_bal: 0,
            pin: "",
            Amessage: "",
            Smessage: "",
            agent_to_id:0,


        }
    }
    async componentDidMount() {
        this.setState({ spinner: true });
        this.setState({
            personal_info_id: await AsyncStorage.getItem('@personal_info_id'),
            getCurrency: await AsyncStorage.getItem('@getCurrency'),
            getFrom: await AsyncStorage.getItem('@getFrom'),
            getProfit: await AsyncStorage.getItem('@profit_rate'),
            wallet: await AsyncStorage.getItem('@wallet'),
        });
        try {

            const BalApiCall = await fetch(Constant.URL + Constant.getCusBal + "/" + this.state.customer_id);
            const dataSource = await BalApiCall.json();
            console.log("dataSource", dataSource)
            this.setState({ bal: dataSource.bal, spinner: false });
        } catch (err) {
            console.log("Error fetching data-----------", err);
        }
        //gET Bank
        try {

            const BankApiCall = await fetch(Constant.URL + Constant.getBANKS);
            const getBank = await BankApiCall.json();
            this.setState({ BankList: getBank, spinner: false });
        } catch (err) {
            console.log("Error fetching data-----------", err);
        }
         //gET Agent
         try {

            const AgentApiCall = await fetch(Constant.URL + Constant.getAGENT+"/"+this.state.getFrom);
            const getAgent = await AgentApiCall.json();
           
            this.setState({ AgentList: getAgent, spinner: false });
        } catch (err) {
            console.log("Error fetching data-----------", err);
        }

    }

    async bal() {

        this.setState({ spinner: true });
        try {

            const BalApiCall = await fetch(Constant.URL + Constant.getAgBal + "/" + this.state.personal_info_id + "/" + this.state.getFrom);
            const dataSource = await BalApiCall.json();
            Constant.SetAsyncValue('@wallet', dataSource.bal)
            this.props.getCustomerWallet(dataSource.c_bal)
            this.props.getAgentWallet(dataSource.bal)

        } catch (err) {
            console.log("Error fetching data-----------", err);
            this.setState({ spinner: false });
        }
    }



    handleOpen = () => {
        const { amount } = this.state;
        console.log("bank_id",this.state.bank_id)
        // console.log(Math.round(this.state.wallet))
        if(this.state.agent_to_id==0 && this.state.c_type==1){
            Alert.alert("Select Agent To Continue.");
            return false
        }
        if(this.state.bank_id==0 && this.state.c_type==2){
            Alert.alert("Select Bank To Continue.");
            return false
        }
        if(this.state.personal_info_id==this.state.agent_to_id){
            Alert.alert("Invalid Transfer , You can not make a self transfer.");
            return false
        }
        // if( this.state.amount  > Math.round(this.state.wallet) ){
        //     Alert.alert("Insufficient Fund");
        //     return false
        // }
        if (amount.length <= 0) {
            this.setState({ spinner: false });
            Alert.alert("Please Enter Amount.");
        } else {
            this.setState({ show: true })
        }
    }

    handleClose = () => {
        this.setState({ show: false })
    }


    onPressDebit = async () => {

        this.setState({ spinner: true });
  
        // post method
        fetch(Constant.URL + Constant.addAgentTransfer, {
            method: 'POST',
            body: JSON.stringify({
                agent_to_id: this.state.agent_to_id,
                agent_from_id: this.state.personal_info_id,
                msg: this.state.msg,
                pin: this.state.pin,
                bank_id: this.state.bank_id,
                getCountry_id: this.state.getFrom,
                getProfit: 0,
                amount: this.state.amount
            })
        })
            .then((response) => response.json())
            .then((result) => {

                this.setState({
                    spinner: false,
                    dataSource: result,
                });

                console.log(this.state.dataSource.data);
                if (this.state.dataSource.code == 200) {
                    this.bal()
                    this.setState({ spinner: false, Sshow: true, Smessage: this.state.dataSource.data.message });
                    this.setState({
                        amount: '',
                        pin: "",
                        show: false
                    });

                } else {
                    this.setState({ spinner: false, Ashow: true, show: false, Amessage: this.state.dataSource.data.message });
                }

            }).catch(function (error) {
                this.setState({ spinner: false });
                console.log("-------- error ------- " + error);
                alert("result:" + error)
            });

      
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

                    <Text style={styles.headTxt}> Transfer Transaction</Text>

                </View>
                <ScrollView>



                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 10 }}  >
                        <Icon style={{ padding: 5 }} family="FontAwesome" name="link" size={30} color="#020cab" />
                        <View>
                            <Text style={{ fontFamily: 'Poppins-Regular' }}>Balance :</Text>
                            <Text style={{ fontSize: 18, color: '#000', fontFamily: 'Poppins-ExtraLight' }}> {this.state.getCurrency} {this.state.wallet}</Text>
                        </View>

                    </TouchableOpacity>

                    {this.state.c_type == 2 ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                            <Text style={{ flex: 0.1, paddingLeft: 1 }} ></Text>
                            <Picker style={{ flex: 0.9, paddingLeft: 150 }}
                                selectedValue={this.state.bank_id}
                                onValueChange={(itemValue, itemPosition) => this.setState({ bank_id: itemValue, toIndex: itemPosition })}   >
                                <Picker.Item label="SELECT BANK" value="0" />
                                {
                                    this.state.BankList.map((v) => {
                                        return <Picker.Item label={v.bank_name} value={v.bank_id} />
                                    })
                                }
                            </Picker>
                        </View>
                    ) : null}
                   
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                            <Icon family="FontAwesome" name="money" size={25} />
                            <TextInput style={{ paddingLeft: 10, fontSize: 16 }}
                                keyboardType='number-pad'
                                placeholder="Enter Amount"
                                value={this.state.amount}
                                onChangeText={(amount) => {
                                    this.setState({ amount, income_bal: amount })

                                }}

                            />
                        </View>
                  
                    {this.state.c_type == 1 ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 2, paddingHorizontal: 15 }}>
                        <Text style={{ flex: 0.1, paddingLeft: 1 }} ></Text>
                        <Picker style={{ flex: 0.9, paddingLeft: 150 }}
                            selectedValue={this.state.agent_to_id}
                            onValueChange={(itemValue, itemPosition) => this.setState({ agent_to_id: itemValue, toIndex: itemPosition })}   >
                            <Picker.Item label="SELECT AGENT" value="0" />
                            {
                                this.state.AgentList.map((v) => {
                                    return <Picker.Item label={v.first_name +" "+ v.last_name +" ["+ v.country+"]"} value={v.personal_info_id} />
                                })
                            }
                        </Picker>
                    </View>
                      ) : null}
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:20, paddingHorizontal: 15 }}>
                    <Text >Profit Rate</Text>
                    
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
                            value={this.state.getProfit}
                            onChangeText={text => {
                                this.setState({
                                    getProfit: text,
                                    income_bal:this.state.amount*Constant.rawNumber(text)
                                })

                                
                                
                            }}
                            
                        />
                        
                    </View> */}

                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                        <TextInput style={{ flex: 1, paddingLeft: 10, fontSize: 16, fontFamily: 'Poppins-ExtraLightItalic' }}
                            keyboardType='email-address'
                            placeholder="Add a message (Optioncal)"
                            onChangeText={(msg) => this.setState({ msg })}
                            value={this.state.msg}
                        />
                    </View>
                    <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.handleOpen}  >
                        <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins-Bold', }}>Transfer</Text>
                    </TouchableOpacity>


                    <View style={{ margin: 20 }}></View>

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
                            onChangeText={(pin) => this.setState({ pin })}
                            value={this.state.pin}
                            secureTextEntry={true}
                            maxLength={4}
                        />


                        <SCLAlertButton theme="info" onPress={this.onPressDebit} >SEND</SCLAlertButton>

                    </SCLAlert>

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

function mapStateProps(state) {
    return {
        userW: state.userW,
        agentW: state.agentW
    }
}
function mapDispatchProps(dispatch) {

    return {
        getCustomerWallet: (response) => dispatch({
            type: 'CUSTOMER_WALLET',
            payload: response
        }),
        getAgentWallet: (response) => dispatch({
            type: 'AGENT_WALLET',
            payload: response
        })
    }
}


export default connect(mapStateProps, mapDispatchProps)(TransferCal)