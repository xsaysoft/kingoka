import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import {connect} from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';

import Icon from '../common/icons';

class LoginScreen extends Component {
 // constructor to  work with state 
  constructor(props) {
    super(props)
    this.state = {
      spinner: false,
      dataSource:[],
      email:'',
      Password:''
    }
} 




  onPressSignIn = async() => {

    this.setState({ spinner: true });
    const { email, password } = this.state;
    if (email.length <= 0 || password.length <= 0) {
      this.setState({ spinner: false });
      Alert.alert("Please fill out the required fields.");
    }else {
    
// post method
fetch(Constant.URL+Constant.LOGIN,{
  method: 'POST',
  body: JSON.stringify({ 
                        email: this.state.email,
                        password: this.state.password})
    })
    .then((response) => response.json())
    .then((result) => {
        console.log("allrest",result);
  this.setState({
          spinner: false,
      dataSource: result,
    });

    console.log("personal",this.state.dataSource.data.personal_info_id);
    if(this.state.dataSource.code==200){
      (async () => {
        Constant.SetAsyncValue('@isLoggedIn', '1'),
         Constant.SetAsyncValue('@email', this.state.dataSource.data.email),
         Constant.SetAsyncValue('@first_name', this.state.dataSource.data.first_name),
         Constant.SetAsyncValue('@last_name', this.state.dataSource.data.last_name),
         Constant.SetAsyncValue('@phone', this.state.dataSource.data.phone),
         Constant.SetAsyncValue('@country', this.state.dataSource.data.country),
         Constant.SetAsyncValue('@personal_info_id', this.state.dataSource.data.personal_info_id),
         Constant.SetAsyncValue('@store_vid', this.state.dataSource.data.store_vid),
         Constant.SetAsyncValue('@getCurrency', this.state.dataSource.data.currency),
         Constant.SetAsyncValue('@getFrom', this.state.dataSource.data.country_id),
         Constant.SetAsyncValue('@profit_rate', this.state.dataSource.data.profit_rate)
         //Get HOME DETAILS
         try {

          const BalApiCall = await fetch(Constant.URL + Constant.getAgBal + "/" + this.state.dataSource.data.personal_info_id+"/"+this.state.dataSource.data.country_id);
          const dataSource = await BalApiCall.json();
          await AsyncStorage.setItem('@wallet', dataSource.bal)
          
          this.props.getCustomerWallet(dataSource.c_bal)
          this.props.getAgentWallet(dataSource.bal)
          this.props.getAgentCurrency(this.state.dataSource.data.currency)
          this.setState({ wallet: dataSource.bal, c_wallet: dataSource.c_bal, spinner: false });
      } catch (err) {
          console.log("Error fetching kdata-----------", err);
          this.setState({ spinner: false });
      }
      
    })();

   
    this.setState({ spinner: false });
    this.props.navigation.navigate("TabNav" , {
      first_name: this.state.dataSource.data.first_name,
      last_name: this.state.dataSource.data.last_name,
      email: this.state.dataSource.data.email,
      getCurrency: this.state.dataSource.data.currency,
      phone: this.state.dataSource.data.phone,
      userInfo: this.state.dataSource.data,
      personal_info_id: this.state.dataSource.data.personal_info_id,
      getFrom: this.state.dataSource.data.country_id,
      
      
    });
    
    }else{
      this.setState({ spinner: false });
      Alert.alert("Invalid login details.");
    }
    
   }).catch(function (error) {
    this.setState({ spinner: false });
   console.log("-------- error ------- "+error);
   alert("result:"+error)
   });

//end post method
    }
  }
  
 
  onPressSignUp = () => {
    this.props.navigation.navigate("RegisterScreen");
  }
  onPressForget = () => {
    this.props.navigation.navigate("Forget");
  }


  render() {

    return (
      <View style={{ flex: 1 }}>
       <Spinner
          visible={this.state.spinner}
          overlayColor={'rgba(0, 0, 0, 0.5)'}
        />
        <LinearGradient colors={['#fc0f84', '#020cab']}
          start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={{ flex: 1 }}>
          <ScrollView>

            <View style={styles.logContainer}>
              <Text style={styles.logintxt}>Login</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Image style={styles.logo} source={require("./../assets/img/logo.png")} />
            </View>

            <View style={{ marginTop: 50, marginHorizontal: 20 }}>

              <View style={styles.txtbox}>
                <View style={styles.iconSty}>
                  <Icon family="AntDesign" name="user" size={22} color="white" />
                </View>
                <TextInput
                  style={styles.txtInputSty}
                  placeholderTextColor="white"
                  placeholder="Email (or) Phone number"
                  onChangeText={(email)=>this.setState({email})}
                  value={this.state.email}
                />
              </View>


              <View style={styles.txtbox}>
                <View style={styles.iconSty}>
                  <Icon family="AntDesign" name="lock" size={22} color="white" />
                </View>
                <TextInput
                  style={styles.txtInputSty}
                  placeholder="Password"
                  placeholderTextColor="white"
                  secureTextEntry={true}
                  onChangeText={(password)=>this.setState({password})}
                  value={this.state.password}
                />
              </View>

              <TouchableOpacity onPress={this.onPressForget}>
                <Text style={styles.forgettxt}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 20, paddingVertical: 30, marginTop: 50 }} onPress={this.onPressSignIn}>
                <View style={styles.signContainer}>
                  <Text style={styles.signupTxt}>SIGN IN</Text>
                 
                </View>
              </TouchableOpacity>
            
            </View>
          </ScrollView>
        </LinearGradient>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  logContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20
  },
  logintxt: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginHorizontal: 20
  },
  logo: {
    marginTop: 50,
    width: 100,
    height: 100,
    resizeMode: "center",
    borderRadius: 50
  },
  txtbox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    overflow: 'hidden',
    marginVertical: 5
  },
  iconSty: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtInputSty: {
    flex: 3,
    color: 'white',
    fontFamily: 'Poppins-Light',
    paddingRight: 15,
  },
  txtStl: {
    flex: 0.9,
    color: 'white',
    paddingLeft: 5,
    paddingRight: 50,
    fontFamily: 'Poppins-Light'
  },
  headertxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: "600",
    paddingVertical: 20,
  },
  txtSignup: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular'
  },
  forgettxt: {
    color: 'white',
    textAlign: 'right',
    marginVertical: 10,
    fontFamily: 'Poppins-Medium'
  },
  signContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 50
  },
  signupTxt: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#020cab'
  },

})

function  mapStateProps(state){
  return{
      userW:state.userW,
      agentW:state.agentW,
      agentC:state.agentC
  }
}

function mapDispatchProps(dispatch){
  
  return{
   getCustomerWallet: (response) => dispatch({
      type: 'CUSTOMER_WALLET',
      payload: response
   }),
   getAgentWallet: (response) => dispatch({
       type: 'AGENT_WALLET',
       payload: response
      }),
  
  getAgentCurrency: (response) => dispatch({
      type: 'AGENT_CURRENCY',
      payload: response
      }),
  }
}


export default connect(mapStateProps,mapDispatchProps)(LoginScreen)