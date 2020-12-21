import React,{Component} from 'react';
import {View,Text,ScrollView,StyleSheet,Image,TouchableOpacity,TextInput,Picker,StatusBar,Alert} from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';
import RadioForm from 'react-native-simple-radio-button';
import Constant from "../components/Constant";


import {TextInputMask} from 'react-native-masked-text'

export default class RateDollar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cus_name: this.props.navigation.getParam('cus_name','Name'),
            cus_phone: this.props.navigation.getParam('cus_phone','phone'),
            customer_id: this.props.navigation.getParam('customer_id','0'),
            amount: this.props.navigation.getParam('amount','0'),
            dollar: this.props.navigation.getParam('dollar','0'),
            dollar2: this.props.navigation.getParam('dollar2','0'),
            local: this.props.navigation.getParam('local','0'),
            local2: this.props.navigation.getParam('local2','0'),
            charges: this.props.navigation.getParam('charges','0'),
            to: this.props.navigation.getParam('to','0'),
            to_id: this.props.navigation.getParam('to_id','0'),
            from: this.props.navigation.getParam('from','0'),
            fromAgent: this.props.navigation.getParam('fromAgent','0'),
            bank_id: this.props.navigation.getParam('bank_id','0'),
            ch_type: this.props.navigation.getParam('ch_type','0'),
            due_amount: this.props.navigation.getParam('due_amount','0'),
            r_bal: this.props.navigation.getParam('r_bal','0'),
            getCountry_id: this.props.navigation.getParam('getCountry_id','0'),
            trans_type: this.props.navigation.getParam('trans_type','0'),
            getCountry_id: this.props.navigation.getParam('getCountry_id','0'),
            from_c_rate: this.props.navigation.getParam('from_c_rate','0'),
            to_c_rate: this.props.navigation.getParam('to_c_rate','0'),
            value: 0,up_val: 0,down_val: 0,
            rate_v: 0,rate_to: 0,new_dr:0,
            rate_type: 0,
            r_amount: 0,r_click: 0,
            bal: 0,mut_float:[],to_float:[],
           
        }
    }

    async componentDidMount() {
        //get Rate
        this.GetRateSet(1);

    }


    async GetRateSet(val) {
        console.log("keychange",val)
        var i,floats = [],floats2 = [],current_rate,limit_v,rate_inc,rate_dec,sum_v,calulated_rate,up_val,down_val,rate_val,rate_type_get,to_dr

        this.setState({spinner: true});
        try {

            const BalApiCall = await fetch(Constant.URL + Constant.getRateSet + "/" + this.state.getCountry_id + "/" + this.state.to_id + "/" + val + "/" + 1);
            const dataSource = await BalApiCall.json();

            //Generate rate
            console.log("rate_val",rate_val)
            console.log("dataSource.data",dataSource.data)
            rate_type_get = Number(dataSource.data.rate_type)
            if (rate_type_get == 1) {current_rate = Number(this.state.dollar)} else {current_rate = Number(this.state.dollar2)}
            limit_v = Number(dataSource.data.limited_by)
            rate_inc = Number(dataSource.data.increase_by)
            rate_dec = Number(dataSource.data.decrease_by)
            sum_v = Number(dataSource.data.sum_up)
            calulated_rate = current_rate + (rate_inc - rate_dec)
            sum_v = Number(dataSource.data.sum_up)
            to_dr = dataSource.data.to_dr


            i = calulated_rate
            floats.push(i.toFixed(4)) //mutiplication
            floats2.push((1 / i).toFixed(6)) //Division
            if (i < 0) {i = 0} else {i}
            while (i <= (calulated_rate + limit_v)) {
                //Set limit for loop
                if (floats.length === limit_v) {
                    break;
                }

                i = (i + sum_v);
                floats.push(i.toFixed(4));
                floats2.push((1 / i).toFixed(6));
            }

            //server Generate rate
            if (dataSource.data.empty_val == 1) {
                up_val = floats.toString()
                down_val = floats2.toString()
            } else {
                up_val = 0
                down_val = 0
            }

            //End Generate rate
            this.setState({pinner: false,up_val: up_val,down_val: down_val});
            console.log("doen",this.state.up_val)
        } catch (err) {
            console.log("Error fetching data-----------",err);
            this.setState({spinner: false});
        }

        //GET RATE SET START

        //Multiplication
        if (this.state.up_val == 0) {
        } else {
            this.setState({dollar: this.state.up_val});
        }
        //Division
        if (this.state.down_val == 0) {
        } else {
            this.setState({dollar2: this.state.down_val});
        }

        // Rate Multiplication
        var floats = [],floats_to = [],asc_val
        let dollar_val = this.state.dollar
        var i,x
        //if no rate corner
        if (this.state.up_val == 0) {
            asc_val = Number(dollar_val)
            i = asc_val
            x = ""
            if (i < 0) {i = 0} else {i}
            while (i <= (asc_val)) {
                x += i.toFixed(4);
                i++;
                floats.push(x);
                x = parseFloat(x);
            }
        } else {
            //if no rate corner
            asc_val = this.state.up_val
            floats = asc_val.split(',');

        }

        //validate conversion rate
        if (to_dr == null) {
            floats_to.push(this.state.from_c_rate)
        } else {
            floats_to = (to_dr.split(/\s*,\s*/)) // split and convert to loop
        }

        this.setState({mut_float: floats})
        this.setState({to_float: floats_to})
  

        //END GET RATE
    }


    onPressB = () => {


        if (this.state.rate_v == "Select Rate") {
            Alert.alert("Please Select Sending Rate.");
            return false;
        }

        if (this.state.rate_type <= 0) {
            Alert.alert("Please Rate is required.");
            return false;
        }
    
 

        this.setState({show: false})
        this.props.navigation.navigate("RateB",{
            cus_name: this.state.cus_name,
            customer_id: this.state.customer_id,
            amount: this.state.amount,
            rate: this.state.rate_v,
            rate_type: this.state.rate_type,
            charges: this.state.charges,
            to: this.state.to,
            to_id: this.state.to_id,
            from: this.state.from,
            fromAgent: this.state.fromAgent,
            cus_phone: this.state.cus_phone,
            bank_id: this.state.bank_id,
            ch_type: this.state.ch_type,
            r_bal:this.state.r_bal,
            bal: this.state.bal,
            due_amount: this.state.due_amount,
            getCountry_id: this.state.getCountry_id,
            new_local_rate: this.state.new_dr,
            new_dollar_trans: 1,
            local: this.state.new_dr,
            local2: this.state.new_dr,

        })

    }

    render() {

        return (
            <View style={{flex: 1,backgroundColor: Theme.bgcolor}}>
                <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.logContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.logintxt}>Dollar Rate Calculation</Text>
                </View>
                <ScrollView>
                    <View style={styles.AmountCon}>

                        <Text style={styles.valTxt}>You Send</Text>
                        <View style={styles.rowcenter}>
                            {/* <Icon family="FontAwesome" name="rupee" size={40} color="#FFF" /> */}
                            <Text style={{color: "#FFF",fontSize: 40,paddingLeft: 5}}>
                                {Constant.numberFormate(this.state.due_amount.toFixed(2))}
                                <Icon family="Feather" name="plus" size={20} color="#FFF" />
                                <Text style={{textAlign: 'right',fontSize: 12,color: "#fff"}}> Charges : </Text>
                                <Text style={{textAlign: 'right',fontSize: 20,color: "#fff"}}>{this.state.charges.toFixed(2)} </Text>
                            </Text>
                        </View>
                        <Text style={styles.updateSty}>{this.state.from} </Text>

                        <Text style={{textAlign: 'right',fontSize: 12,color: "#fff"}}>Sending {this.state.from}  Dollar Rate </Text>
                        <Text style={{textAlign: 'right',fontSize: 30,color: "#fff"}}>
                           
                            {/* {Constant.numberFormate(this.state.bal.toFixed(2))} */}
                            {this.state.new_dr}
                        </Text>
                       

                    </View>


                    {/* not in use , remove on production  */}

                    <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
                        <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                        <Picker style={{flex: 0.9,paddingLeft: 150}}
                            selectedValue={this.state.rate_v}
                            onValueChange={(itemValue,itemPosition) => {this.setState({rate_v: itemValue,toIndex: itemPosition})}}   >
                                <Picker.Item label="Select Sending Rate" value="0" />   
                            {
                                this.state.mut_float.map((v) => {
                                    return <Picker.Item label={v} value={v} />
                                })
                            }
                       
                          
                        </Picker>


                    </View>
                    {/* Select Receiving Dollar Rate */}
                    <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 2,paddingHorizontal: 15}}>
                        <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                        <Picker style={{flex: 0.9,paddingLeft: 150}}
                            selectedValue={this.state.rate_to}
                            onValueChange={(itemValue,itemPosition) => {this.setState({rate_to: itemValue,toIndex: itemPosition})}}   >
                                 <Picker.Item label="Select Receiving Rate" value="0" />   
                            {
                                this.state.to_float.map((v) => {
                                    return <Picker.Item label={v} value={v} />
                                })
                            }

                            
                        </Picker>
                    </View>
                 

                    


                    {this.state.rate_to != 0 ? (
                        <View>
                            <View style={{flexDirection: 'row',alignItems: 'center',borderWidth: 1,margin: 15,marginTop: 5,paddingHorizontal: 10}}>
                                <Text style={{flex: 0.1,paddingLeft: 1}} ></Text>
                                <Picker style={{flex: 0.9,paddingLeft: 150}}
                                    selectedValue={this.state.rate_type}
                                    onValueChange={(itemValue,itemPosition) => {

                                        this.setState({rate_type: itemValue,toIndex: itemPosition})
                                        if (itemValue == 1) {
                                            
                                         var getBal = (this.state.rate_to)/this.state.rate_v 
                                         if(getBal > 1){
                                         this.setState({new_dr: getBal})
                                         }else{this.setState({new_dr: getBal.toFixed(7)})}
                                         
                                      

                                        } else if (itemValue == 2) {
                                            var getBal = this.state.rate_v /(this.state.rate_to)
                                            if(getBal > 1){
                                                this.setState({new_dr: getBal})
                                                }else{this.setState({new_dr: getBal.toFixed(7)})}
                                        }
                                    }
                                    }>
                                    <Picker.Item label="Select Rate Calculation Type" value="0" />
                                    <Picker.Item label="Rate Multiplication" value="1" />
                                    <Picker.Item label="Rate Division" value="2" />
                                </Picker>
                            </View>

                            <TouchableOpacity style={{paddingVertical: 10,backgroundColor: '#020cab',marginTop: 30,borderRadius: 50,marginHorizontal: 30}} onPress={this.onPressB}>
                                <Text style={{color: '#FFF',textAlign: 'center',fontSize: 16,fontFamily: 'Poppins-Bold'}}>Proccess</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
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
        fontSize: 20,
        fontFamily: 'Poppins-Regular'
    },
    rewardsTxt: {
        paddingVertical: 20,
        fontFamily: 'Poppins-Thin',
        color: '#000'
    }
});


