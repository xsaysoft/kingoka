import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList,StatusBar } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../common/icons';
import Theme from "../styles/Theme";
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";

export default class agent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CountryList: [ ],
            spinner: true,
            personal_info_id:"",
            cus_img: "../assets/img/boy.png",
            cus_name : this.props.navigation.getParam('cus_name', 'Name'),
            cus_phone: this.props.navigation.getParam('cus_phone', 'phone'),
            customer_id: this.props.navigation.getParam('customer_id', '0'),
            amount: this.props.navigation.getParam('amount', '0'),
            rate: this.props.navigation.getParam('rate', '0'),
            charges: this.props.navigation.getParam('charges', '0'),
            to: this.props.navigation.getParam('to', '0'),
            from: this.props.navigation.getParam('from', '0'),
            ben_name:this.props.navigation.getParam('ben_name', '0'),
            ben_id:this.props.navigation.getParam('ben_id', '0'),
            ben_bank:this.props.navigation.getParam('ben_bank', '0'),
            ben_acc:this.props.navigation.getParam('ben_acc', '0'),
            ben_phone:this.props.navigation.getParam('ben_phone', '0'),
            message:this.props.navigation.getParam('message', '0'),
            fromAgent:this.props.navigation.getParam('fromAgent', '0'),
        }
    }

    async componentDidMount() {
        this.setState({ personal_info_id: await AsyncStorage.getItem('@personal_info_id')}); 
        try {
       
            const CountryApiCall = await fetch(Constant.URL+Constant.getAGENT);
            const getCountry = await CountryApiCall .json();
          
            this.setState({CountryList: getCountry, spinner: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }

    _renderTransfer(rowdata) {
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("done", {
                toAgent: rowdata.item.personal_info_id,
                country: rowdata.item.country,
                first_name: rowdata.item.first_name,
                last_name: rowdata.item.last_name,
                phone: rowdata.item.phone,
                cus_name: this.state.cus_name,
                cus_phone:this.state.cus_phone,
                customer_id: this.state.customer_id,
                amount:this.state.amount,
                rate:this.state.rate,
                charges:this.state.charges,
                to:this.state.to,
                from:this.state.from,
                ben_name:this.state.ben_name,
                ben_id:this.state.ben_id,
                ben_bank:this.state.ben_bank,
                ben_acc:this.state.ben_acc,
                ben_phone:this.state.ben_phone,
                message:this.state.message,
                fromAgent:this.state.fromAgent,
              
              })} >
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.userimg} source={require('../assets/img/profile.jpg')} />
                        </View>
                        <View style={styles.userdetails}>
                            <Text style={{ fontSize: 18, color: '#000',fontFamily: 'Poppins-Light' }}>{rowdata.item.country}</Text>
            <Text style={{ color: '#000',fontFamily: 'Poppins-Thin' }}>{rowdata.item.first_name} {rowdata.item.last_name}</Text>
            <Text style={{ fontSize: 10, color: '#000',fontFamily: 'Poppins-Thin' }}> {rowdata.item.phone}</Text>
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
        <Text style={styles.headTxt}>Select Receiver</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                        <Icon family="Feather" name="search" size={25} />
                        <TextInput style={{ paddingLeft: 10, fontSize: 16 }}
                           
                            placeholder="Quick Search"
                            onChangeText={text => this.searchFilterFunction(text)}
                            autoCorrect={false}  
                        />
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.CountryList}
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