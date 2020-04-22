import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, StatusBar,Alert } from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';
import { TextInputMask } from 'react-native-masked-text'
import RadioForm from 'react-native-simple-radio-button';

export default class Rate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cus_name : this.props.navigation.getParam('cus_name', 'Name'),
            cus_phone: this.props.navigation.getParam('cus_phone', 'phone'),
            customer_id: this.props.navigation.getParam('customer_id', '0'),
            amount: this.props.navigation.getParam('amount', '0'),
            dollar: this.props.navigation.getParam('dollar', '0'),
            local: this.props.navigation.getParam('local', '0'),
            charges: this.props.navigation.getParam('charges', '0'),
            to: this.props.navigation.getParam('to', '0'),
            from: this.props.navigation.getParam('from', '0'),
            fromAgent: this.props.navigation.getParam('fromAgent', '0'),
            value:this.props.navigation.getParam('dollar', '0'),
            rate_v:"",
            radio_props: [
                {label: 'DOLLAR', value: this.props.navigation.getParam('dollar', '0') },
                {label: 'LOCAL', value: this.props.navigation.getParam('local', '0') },
                {label: 'ADD', value:1 }
              ],
        }
    }
 

    onPressB = () =>  {
       
         const { rate_v,value } = this.state;
        if(this.state.value==1){
            if(rate_v.length <=0){
                Alert.alert("Please Enter Rate.");
                return false;
            }
        const getrateV = this.rateV.getRawValue()
        this.setState({ show: false })  
        this.props.navigation.navigate("SendB",{
          cus_name: this.state.cus_name,
           customer_id: this.state.customer_id,
           amount:this.state.amount,
           rate: getrateV ,
           charges:this.state.charges,
           to:this.state.to,
           from:this.state.getCurrency,
           fromAgent:this.state.fromAgent,
           cus_phone:this.state.cus_phone,
                    
        } )

        }else{
     
            if(value.length <=0 ){
                Alert.alert("Please Selete Rate Rate.");
                return false;
            } 
            this.setState({ show: false })  
            this.props.navigation.navigate("SendB",{
              cus_name: this.state.cus_name,
               customer_id: this.state.customer_id,
               amount:this.state.amount,
               rate:this.state.value ,
               charges:this.state.charges,
               to:this.state.to,
               from:this.state.from,
               fromAgent:this.state.fromAgent,
               cus_phone:this.state.cus_phone,
                        
            } )
        }
    
        

     }
    render() {
    
       const bal = (this.state.amount - this.state.charges) * this.state.value
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
                        <Text style={styles.valTxt}>Current Value</Text>
                        <View style={styles.rowcenter}>
                            {/* <Icon family="FontAwesome" name="rupee" size={40} color="#FFF" /> */}
                            <Text style={{ color: "#FFF", fontSize: 40, paddingLeft: 5 }}>
                            {bal.toFixed(2)}
                            </Text>
                        </View>
                        <Text style={styles.updateSty}>
                       
                            </Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingTop: 70 }}>
                  <RadioForm
                        radio_props={this.state.radio_props}
                        initial={8}
                        formHorizontal={true}
                        labelHorizontal={true}
                        labelStyle={{padding:10 }}
                        buttonSize={25}
                        buttonColor={'#020cab'}
                    
                    
                        onPress={(value) => {this.setState({value:value})}}
                    />
                        <Image style={{ width: 150, height: 140, resizeMode: 'center' }} source={require('../assets/img/wallet.png')} />
                       
      {this.state.value==1 ? (  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 5,marginTop:20, paddingHorizontal: 15 }}>
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
                            }}
                            ref={(ref) => this.rateV = ref}
                        />
                    </View>): null}
                    </View>
                    <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.onPressB}> 
                    <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 ,  fontFamily: 'Poppins-Bold',}}>Proccess</Text>
                    </TouchableOpacity>
                    <View style={{margin: 20}}></View>
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
        fontSize: 10,
        fontFamily: 'Poppins-Regular'
    },
    rewardsTxt: {
        paddingVertical: 20,
        fontFamily: 'Poppins-Thin',
        color: '#000'
    }
});