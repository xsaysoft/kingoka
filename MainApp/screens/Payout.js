import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList,StatusBar } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';
import Theme from "../styles/Theme";
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';


export default class SendContacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            AgentList: [ ],
            spinner: true,
            personal_info_id:"",
            history : this.props.navigation.getParam('history', '0'),
            cus_img: "../assets/img/boy.png"
        }
    }

    async componentDidMount() {
        this.setState({ personal_info_id: await AsyncStorage.getItem('@personal_info_id'),
        getFrom:await AsyncStorage.getItem('@getFrom'),}); 
        
        try {
        
            const CustomerApiCall = await fetch(Constant.URL+Constant.getTRANSFER+"/"+this.state.personal_info_id+"/"+this.state.history+"/"+this.state.getFrom);
            const getCustomer = await CustomerApiCall.json();
        
            this.setState({AgentList: getCustomer, spinner: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }

    _renderTransfer(rowdata) {
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("PayoutDone", {
                agent_acct_id: rowdata.item.agent_acct_id,
                agent_to: rowdata.item.agent_to,
                first_name: rowdata.item.first_name,
                last_name: rowdata.item.last_name,
                phone: rowdata.item.phone,
                customer_id: rowdata.item.customer_id,
                amount: rowdata.item.amount,
                rate: rowdata.item.rate,
                rate_type: rowdata.item.rate_type,
                charges: rowdata.item.charges,
                message: rowdata.item.message,
                from: rowdata.item.cur_from,
                to: rowdata.item.cur_to,
                cus_name: rowdata.item.cus_name,
                cus_phone: rowdata.item.cus_phone,
                cus_adr: rowdata.item.cus_adr,
                ben_name: rowdata.item.ben_name,
                ben_acct: rowdata.item.ben_acct,
                ben_bank: rowdata.item.ben_bank,
                ben_phone: rowdata.item.ben_phone,
                c_ref: rowdata.item.c_ref,
                status: rowdata.item.status,
                due_amount: rowdata.item.due_amount,
                payout_bal:rowdata.item.payout_bal,
                bank_id_pay:rowdata.item.payout_bal,
                payout_due:rowdata.item.payout_due,

              
              })} >
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.userimg} source={require('../assets/img/boy.png')} />
                        </View>
                        <View style={styles.userdetails}>
                            <Text style={{ fontSize: 18, color: '#000',fontFamily: 'Poppins-Light' }}>{rowdata.item.first_name} {rowdata.item.last_name}</Text>
                            <Text style={{ fontSize: 10, color: '#000',fontFamily: 'Poppins-Thin' }}>{rowdata.item.aa_date}  </Text>
                            {rowdata.item.type==4? (<Text  style={{ fontSize: 10,color: 'red'}}>Cash Return</Text>):null }
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
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
                    {this.state.history ==0 ? (<Text style={styles.headTxt}> Payout Center </Text>    ): null }
                    {this.state.history ==1 ? (<Text style={styles.headTxt}> Payout Reversal Center </Text>    ): null }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                        <Icon family="Feather" name="search" size={25} />
                        <TextInput style={{ paddingLeft: 10, fontSize: 16 }}
                           
                            placeholder="Quick Search"
                            // onChangeText={text => this.searchFilterFunction(text)}
                            autoCorrect={false}  
                        />
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.AgentList}
                        renderItem={this._renderTransfer.bind(this)}
                    />
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
    container: {
        paddingHorizontal: 20,
    },
    txtStl: {
        flex: 0.9,
        color: 'black',
        paddingLeft: 5,
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
        paddingLeft:10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgray'
    },
});