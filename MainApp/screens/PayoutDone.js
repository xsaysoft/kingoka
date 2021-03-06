import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, StatusBar,Alert } from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Constant from "../components/Constant";
import {SCLAlert,SCLAlertButton} from 'react-native-scl-alert'
export default class PayoutDone extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            ben_acct:this.props.navigation.getParam('ben_acct', '0'),
            ben_phone:this.props.navigation.getParam('ben_phone', '0'),
            message:this.props.navigation.getParam('message', '0'),
            toAgent: this.props.navigation.getParam('toAgent', '0'),
            first_name:this.props.navigation.getParam('first_name', '0'),
            last_name: this.props.navigation.getParam('last_name', '0'),
            phone: this.props.navigation.getParam('phone', '0'),
            agent_to: this.props.navigation.getParam('agent_to', '0'),
            agent_acct_id: this.props.navigation.getParam('agent_acct_id', '0'),
            c_ref: this.props.navigation.getParam('c_ref', '0'),
            status: this.props.navigation.getParam('status', '0'),
           
            
            
            pin:"",
            spinner: false,
            Amessage:"",
            Smessage:"",
      tableHead: [,'Agent', 'Sender', 'Beneficiary'],
      tableData: [
        [props.navigation.getParam('first_name', '') +" "+ this.props.navigation.getParam('last_name',''), this.props.navigation.getParam('cus_name', ''), this.props.navigation.getParam('ben_name', '')],
        [this.props.navigation.getParam('phone', '0'), this.props.navigation.getParam('cus_phone', 'phone'), this.props.navigation.getParam('ben_phone', '')],
      ],
      RtableHead: ['Bank', 'Account', 'Message'],
      RtableData: [
        [this.props.navigation.getParam('ben_bank', '0'), this.props.navigation.getParam('ben_acct', '0'), this.props.navigation.getParam('message', '0')],
       
      ]
 
        }
    }

   
    async componentDidMount() {
     

    }
    
onPressTransfer = async() => {

      
        const { pin } = this.state;
        if (pin.length <= 0) {
          Alert.alert("Please Enter Your Pin.");
        }else {
      this.setState({ spinner: true });
             // post method
    fetch(Constant.URL+Constant.CPAYOUT,{
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
        const bal = (this.state.amount - this.state.charges) * this.state.rate
       
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
        <Text style={styles.logintxt}>Approve Payout  </Text>
                </View>
                <ScrollView>
                    <View style={styles.AmountCon}>
                        <Text style={styles.valTxt}>Value To Transfer between currency</Text>
                        <View style={styles.rowcenter}>
                           {this.state. getCurrency}
                            <Text style={{ color: "#FFF", fontSize: 40, paddingLeft: 5 }}>{bal.toFixed(2)}</Text>
                     
                        </View>
                        <Text style={styles.updateSty}>{this.state.from} > {this.state.to}</Text>
                    </View>
                   
    
                        <View style={styles.container}>
                            <Table borderStyle={{borderWidth: 1}}>
                            <Row data={this.state.tableHead} flexArr={[ 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
                            <TableWrapper style={styles.wrapper}>
                                <Rows data={this.state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
                            </TableWrapper>
                            </Table>
                        </View>
                       
                        <View style={styles.container}>
                            <Table borderStyle={{borderWidth: 1}}>
                            <Row data={this.state.RtableHead} flexArr={[ 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
                            <TableWrapper style={styles.wrapper}>
                                <Rows data={this.state.RtableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
                            </TableWrapper>
                            </Table>
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
                      <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.onPressTransfer}> 
                    <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 ,  fontFamily: 'Poppins-Bold',}}>Confirm Payout</Text>
                    </TouchableOpacity>
                 ): null}
                    {this.state.status==1 ? ( 
                    <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: 'red', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.onPressRV}> 
                    <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 ,  fontFamily: 'Poppins-Bold',}}>Reverse Payment</Text>
                    </TouchableOpacity>
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
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff',  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
});