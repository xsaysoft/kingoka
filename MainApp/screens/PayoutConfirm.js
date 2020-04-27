import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, StatusBar,Alert ,Picker} from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import { TextInputMask } from 'react-native-masked-text'
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert'
export default class PayoutConfirm extends Component {
    constructor(props) {
        super(props)
        this.state = {
        
            amount: this.props.navigation.getParam('amount', '0'),
            rate: this.props.navigation.getParam('rate', '0'),
            rate_type: this.props.navigation.getParam('rate_type', '0'),
            charges: this.props.navigation.getParam('charges', '0'),
            to: this.props.navigation.getParam('to', '0'),
            from: this.props.navigation.getParam('from', '0'),
            agent_acct_id: this.props.navigation.getParam('agent_acct_id', '0'),
            agent_to: this.props.navigation.getParam('agent_to', '0'),
            c_ref: this.props.navigation.getParam('c_ref', '0'),
            status: this.props.navigation.getParam('status', '0'),
            pin:"",
            spinner: false,
            Amessage:"",
            Smessage:"",
            bank_type:0,
            BankList:[],
            bank_id:0,
            payout_cost:0,
            Cbal:0,
    
 
        }
    }

   
    async componentDidMount() {
        try {
       
            const BankApiCall = await fetch(Constant.URL+Constant.getBANKS);
            const getBank = await BankApiCall.json();
            this.setState({BankList: getBank, spinner: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }

    }
    handleOpen = () => {
        let payoutVV
        if(this.state.payout_cost!=0){
        payoutVV =this.payoutV.getRawValue()
        }else{payoutVV=0}

        if(this.state.bank_type==2){
            if(this.state.bank_id<=0){
                Alert.alert("Please Select a Bank.");
                return false   
            }
        }

        const { pin } = this.state;
        if (pin.length <= 0) {
          Alert.alert("Please Enter Your Pin.");
        }else if(this.state.bank_type <= 0){
            Alert.alert("Please Select Payout Type.");
            
        }else {
           
            let bbal
            if(this.state.rate_type==1){
              bbal = (this.state.amount - this.state.charges)* (this.state.rate) +payoutVV
              this.setState({ Cbal: bbal })
            }else {
              bbal = (this.state.amount - this.state.charges)/ (this.state.rate) + payoutVV
              this.setState({ Cbal: bbal })
            }
        this.setState({ Pshow: true })

        }
      }
   

onPressTransfer = async() => {

    const payoutVV =this.payoutV.getRawValue()
   
        const { pin } = this.state;
        if (pin.length <= 0) {
          Alert.alert("Please Enter Your Pin.");
        }else if(this.state.bank_type <= 0){
            Alert.alert("Please Select Bank.");
        }else {
      this.setState({ spinner: true });
             // post method
    fetch(Constant.URL+Constant.CPAYOUT,{
        method: 'POST',
        body: JSON.stringify({ 
            agent_to: this.state.agent_to,
            agent_acct_id: this.state.agent_acct_id,
            pin: this.state.pin,
            bank_id: this.state.bank_id,
            getpayout_cost: payoutVV,
            c_ref: this.state.c_ref,
        })
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
             
            this.setState({ spinner: false,show: true ,Amessage:this.state.dataSource.data.message ,Pshow:false});
            
          }
          
         }).catch(function (error) {
          this.setState({ spinner: false });
         console.log("-------- error ------- "+error);
         alert("result:"+error)
         });
      
      //end post method
        }
    }
    onPressRV = async() => {

      
        const { pin } = this.state;
        if (pin.length <= 0) {
          Alert.alert("Please Enter Your Pin.");
        }else {
      this.setState({ spinner: true });
             // post method
    fetch(Constant.URL+Constant.RPAYOUT,{
        method: 'POST',
        body: JSON.stringify({ 
            agent_to: this.state.agent_to,
            agent_acct_id: this.state.agent_acct_id,
            pin: this.state.pin,
            c_ref: this.state.c_ref,
        })
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

    render() {
        let bal
        if(this.state.rate_type==1){
          bal = (this.state.amount - this.state.charges)* (this.state.rate)
        }else {
          bal = (this.state.amount - this.state.charges)/ (this.state.rate)
        }
         
       
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                  <Spinner
                visible={this.state.spinner}
                overlayColor={'rgba(0, 0, 0, 0.30)'}
                />
                <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.logContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
        <Text style={styles.logintxt}>Approve Payout </Text>
                </View>
                <ScrollView>
                    <View style={styles.AmountCon}>
                        <Text style={styles.valTxt}>Value To Transfer between currency</Text>
                        <View style={styles.rowcenter}>
                           {this.state. getCurrency}
                            <Text style={{ color: "#FFF", fontSize: 40, paddingLeft: 5 }}>{Constant.numberFormate(bal.toFixed(2))}</Text>
                     
                        </View>
                        <Text style={styles.updateSty}>{this.state.from} > {this.state.to}</Text>
                    </View>
                   
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:10, paddingHorizontal: 15 }}>
                            <Text  style={{ flex: 0.1, paddingLeft: 1 }} ></Text> 
                            <Picker  style={{ flex: 0.9, paddingLeft: 150 }}  
                            selectedValue={this.state.bank_type}  
                            onValueChange={(itemValue, itemPosition) => this.setState({bank_type: itemValue, toIndex: itemPosition, value:""})}   >  
                             <Picker.Item label="Select Payout Type" value="0" />
                             <Picker.Item label="Wallet Payout" value="1" />
                             <Picker.Item label="Bank Payout" value="2" />
                            </Picker> 
                        </View>
                    
                        {this.state.bank_type ==2 ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15,marginTop:2, paddingHorizontal: 15 }}>
                            <Text  style={{ flex: 0.1, paddingLeft: 1 }} ></Text> 
                            <Picker  style={{ flex: 0.9, paddingLeft: 150 }}  
                            selectedValue={this.state.bank_id}  
                            onValueChange={(itemValue, itemPosition) => this.setState({bank_id: itemValue, toIndex: itemPosition})}   >  
                             <Picker.Item label="SELECT BANK" value="0" /> 
                             {
                                this.state.BankList.map( (v)=>{
                                return <Picker.Item label={v.bank_name  }  value={v.bank_id} />
                                })
                                } 
                            </Picker> 
                        </View>
                     ): null }
                       
                       
                       <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                        
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
                            value={this.state.payout_cost}
                            onChangeText={text => {
                            this.setState({
                                payout_cost: text
                            })
                            }}
                            ref={(ref) => this.payoutV = ref}
                        />
                       
                    </View>
                      
                   
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                        <Icon family="Feather" name="key" size={25} />
                        <TextInput style={{ paddingLeft: 10, fontSize: 16 }}
                           
                            placeholder="ENTER YOUR PIN"
                            
                            keyboardType="number-pad"
                            secureTextEntry={true}
                            maxLength={4}
                            onChangeText={(pin)=>this.setState({pin})}
                            value={this.state.pin}
                        />
                    
                      </View>
                      {this.state.status==0 ? ( 

                      <View>
                          <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.handleOpen}> 
                        <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 ,  fontFamily: 'Poppins-Bold',}}>Confirm Payout</Text>
                        </TouchableOpacity>
                          <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: 'red', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.onPressRV}> 
                          <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 ,  fontFamily: 'Poppins-Bold',}}>Unable To Payout</Text>
                          </TouchableOpacity>

                      </View>
          
                 ): null}
                    

                    <View style={{margin: 20}}></View>
         
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

        
        <SCLAlert
                        theme="info"
                        show={this.state.Pshow}
                        title="Confirm Payout"
                        onRequestClose
                        subtitle="Total Payout will be debited"
                        onRequestClose={() => {
                            this.setState({ Pshow: false })
                            }}
                        >
                      <View style={styles.rowcenter}>
                       
                        
                            <Text style={{ color: "#000", fontSize: 30, paddingLeft: 5 , textAlign:"center"}}> {this.state.to} {Constant.numberFormate(this.state.Cbal.toFixed(2))}</Text>
                     
                        </View>
                       
          <SCLAlertButton theme="info" onPress={this.onPressTransfer} >PAYOUT NOW</SCLAlertButton>
        </SCLAlert>


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
    },
    
});