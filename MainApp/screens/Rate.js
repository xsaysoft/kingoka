import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Picker, StatusBar, Alert } from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';
import RadioForm from 'react-native-simple-radio-button';
import Constant from "../components/Constant";


import { TextInputMask } from 'react-native-masked-text'

export default class Rate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cus_name: this.props.navigation.getParam('cus_name', 'Name'),
            cus_phone: this.props.navigation.getParam('cus_phone', 'phone'),
            customer_id: this.props.navigation.getParam('customer_id', '0'),
            amount: this.props.navigation.getParam('amount', '0'),
            dollar: this.props.navigation.getParam('dollar', '0'),
            local: this.props.navigation.getParam('local', '0'),
            dollar2: this.props.navigation.getParam('dollar2', '0'),
            local2: this.props.navigation.getParam('local2', '0'),
            charges: this.props.navigation.getParam('charges', '0'),
            to: this.props.navigation.getParam('to', '0'),
            to_id: this.props.navigation.getParam('to_id', '0'),
            from: this.props.navigation.getParam('from', '0'),
            fromAgent: this.props.navigation.getParam('fromAgent', '0'),
            bank_id: this.props.navigation.getParam('bank_id', '0'),
            ch_type: this.props.navigation.getParam('ch_type', '0'),
            due_amount: this.props.navigation.getParam('due_amount', '0'),
            r_bal: this.props.navigation.getParam('r_bal', '0'),
            getCountry_id: this.props.navigation.getParam('getCountry_id', '0'),
            value: 0,
            rate_v: 0,
            rate_type: 0,
            r_amount: "",
            bal: 0,
            rate1_props: [
                // {label: 'DOLLAR', value: this.props.navigation.getParam('dollar', '0') },
                // {label: 'LOCAL', value: this.props.navigation.getParam('local', '0') },

            ],

            rate2_props: [
                // {label: 'DOLLAR', value: this.props.navigation.getParam('dollar2', '0') },
                // {label: 'LOCAL', value: this.props.navigation.getParam('local2', '0') },

            ],
        }
    }



    onPressB = () => {


        if (this.state.rate_v <= 0) {
            Alert.alert("Please Selete Rate Type.");
            return false;
        }
        if (this.state.rate_type <= 0) {
            Alert.alert("Please Rate is required.");
            return false;
        }
        if (this.state.bal <= 0) {
            Alert.alert("Please enter amount to calculate recipient amount.");
            return false;
        }
        if (this.state.r_bal < this.state.due_amount) {
            Alert.alert("Insufficient Credit.");
            return false;
        }
        this.setState({ show: false })
        this.props.navigation.navigate("SendB", {
            cus_name: this.state.cus_name,
            customer_id: this.state.customer_id,
            amount: this.state.amount.toFixed(5),
            rate: this.state.rate_v,
            rate_type: this.state.rate_type,
            charges: this.state.charges.toFixed(5),
            to: this.state.to,
            to_id: this.state.to_id,
            from: this.state.from,
            fromAgent: this.state.fromAgent,
            cus_phone: this.state.cus_phone,
            bank_id: this.state.bank_id,
            ch_type: this.state.ch_type,
            due_amount: this.state.due_amount.toFixed(5),
            getCountry_id: this.state.getCountry_id,

        })

    }

    render() {



        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.logContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.logintxt}>Rate Calculation</Text>
                </View>
                <ScrollView>
                    <View style={styles.AmountCon}>
                        <Text style={styles.valTxt}>You Send</Text>
                        <View style={styles.rowcenter}>
                            {/* <Icon family="FontAwesome" name="rupee" size={40} color="#FFF" /> */}
                            <Text style={{ color: "#FFF", fontSize: 40, paddingLeft: 5 }}>
                                {Constant.numberFormate(this.state.due_amount.toFixed(5))}

                            </Text>
                        </View>
                        <Text style={styles.updateSty}>{this.state.from} </Text>

                        <Text style={{ textAlign: 'right', fontSize: 12, color: "#fff" }}>Recipient Gets</Text>
                        <Text style={{ textAlign: 'right', fontSize: 30, color: "#fff" }}>

                            {Constant.numberFormate(this.state.bal.toFixed(5))}
                        </Text>
                        <Text style={{ textAlign: 'right', fontSize: 20, color: "#fff" }}> {this.state.to}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 5, paddingHorizontal: 10 }}>
                        <Text style={{ flex: 0.1, paddingLeft: 1 }} ></Text>
                        <Picker style={{ flex: 0.9, paddingLeft: 150 }}
                            selectedValue={this.state.rate_type}
                            onValueChange={(itemValue, itemPosition) => {
                                this.setState({ rate_type: itemValue, toIndex: itemPosition, rate_v: 0, r_amount: 0, bal: 0, due_amount: this.props.navigation.getParam('due_amount', '0') })
                                if (itemValue == 1) {
                                    this.setState({ rate_v: this.state.local })

                                    if (this.state.r_amount == 0) {
                                        var getBal = this.state.due_amount * this.state.local
                                        this.setState({ bal: getBal })
                                    }

                                } else if (itemValue == 2) {
                                    this.setState({ rate_v: this.state.local2 })
                                    if (this.state.r_amount == 0) {
                                        var getBal = this.state.due_amount / this.state.local2
                                        this.setState({ bal: getBal })

                                    }
                                }
                            }
                            }>
                            <Picker.Item label="Select Rate Calculation Type" value="0" />
                            <Picker.Item label="Rate Multiplication" value="1" />
                            <Picker.Item label="Rate Division" value="2" />
                        </Picker>
                    </View>



                    {/* not in use , remove on production  */}

                    {this.state.rate_type != 0 ? (
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 20, paddingHorizontal: 15 }}>
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
                                    value={this.state.rate_v}
                                    onChangeText={text => {
                                        this.setState({
                                            rate_v: text
                                        })

                                        var bal = 0, percent, charges, ammt
                                        if (this.state.rate_type == 1) {
                                            const getRawRate = Constant.rawNumber(text);
                                            const getRaw = this.state.due_amount;

                                            percent = this.state.ch_type / 100

                                            ammt = (getRaw) / (getRawRate)

                                            bal = ammt

                                            if (bal > 0) {
                                                bal = ammt
                                            } else {
                                                bal == 0;
                                            }
                                            this.setState({ bal: bal, due_amount: getRaw })


                                        } else if (this.state.rate_type == 2) {

                                            if (this.state.rate_v == 0) {
                                                bal = 0
                                            } else {
                                                const getRawRate = Constant.rawNumber(text);
                                                const getRaw = this.state.due_amount;

                                                percent = this.state.ch_type / 100

                                                ammt = (getRaw) * (getRawRate)

                                                bal = ammt

                                                if (bal > 0) {
                                                    bal = ammt
                                                } else {
                                                    bal == 0;
                                                }
                                                this.setState({ bal: bal, due_amount: getRaw })

                                            }
                                        } else {
                                            bal = 0
                                        }

                                    }}

                                />

                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, marginTop: 20, paddingHorizontal: 15 }}>
                                <Text >Recipient Amount</Text>
                                <TextInputMask style={{ paddingLeft: 10, fontSize: 16 }}
                                    type={'money'}
                                    placeholder="Set Recipient Amount"
                                    options={{
                                        precision: 2,
                                        separator: '.',
                                        delimiter: ',',
                                        unit: '',
                                        suffixUnit: ''
                                    }}
                                    value={this.state.r_amount}
                                    onChangeText={text => {
                                        this.setState({
                                            r_amount: text
                                        });
                                        var bal = 0, percent, due, charges, dueBal, ammt
                                        if (this.state.rate_type == 1) {
                                            const getRaw = Constant.rawNumber(text);
                                            const getRawRate = Constant.rawNumber(this.state.rate_v);

                                            percent = this.state.ch_type / 100

                                            ammt = (getRaw) / (getRawRate)
                                            charges = ammt * percent
                                            bal = ammt

                                            if (bal > 0) {
                                                bal = ammt
                                            } else {
                                                bal == 0;
                                            }
                                            this.setState({ amount: (ammt + charges), bal: getRaw, due_amount: bal, charges: charges })


                                        } else if (this.state.rate_type == 2) {

                                            if (this.state.rate_v == 0) {
                                                bal = 0
                                            } else {
                                                const getRaw = Constant.rawNumber(text);
                                                const getRawRate = Constant.rawNumber(this.state.rate_v);

                                                percent = this.state.ch_type / 100

                                                ammt = (getRaw) * (getRawRate)
                                                charges = ammt * percent
                                                bal = ammt

                                                if (bal > 0) {
                                                    bal = ammt
                                                } else {
                                                    bal == 0;
                                                }
                                                this.setState({ amount: (ammt + charges), bal: getRaw, due_amount: bal, charges: charges })

                                            }
                                        } else {
                                            bal = 0
                                        }

                                    }}

                                />


                            </View>



                            <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.onPressB}>
                                <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins-Bold' }}>Proccess</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                    <View style={{ margin: 20 }}></View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    transferbox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        backgroundColor: 'white',
        padding: 20,
    },
    logContainer: {
        padding: 15,
        backgroundColor: '#020cab',
        flexDirection: 'row',
        alignItems: 'center'
    },
    logintxt: {
        color: '#FFf',
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
    rowcenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    updateSty: {
        color: "#FFF",
        fontSize: 20,
        fontFamily: 'Poppins-Regular'
    },
    rewardsTxt: {
        paddingVertical: 20,
        fontFamily: 'Poppins-Thin',
        color: '#000'
    }
});


