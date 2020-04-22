import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";
import Icon from '../common/icons';

export default class LoginScreen extends Component {
 // constructor to  work with state 
  constructor(props) {
    super(props)
    this.state = {
      spinner: false,
      dataSource:'',
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
        await AsyncStorage.setItem('@isLoggedIn', '1'),
        await AsyncStorage.setItem('@email', this.state.dataSource.data.email),
        await AsyncStorage.setItem('@first_name', this.state.dataSource.data.first_name),
        await AsyncStorage.setItem('@last_name', this.state.dataSource.data.last_name),
        await AsyncStorage.setItem('@phone', this.state.dataSource.data.phone),
        await AsyncStorage.setItem('@country', this.state.dataSource.data.country),
        await AsyncStorage.setItem('@personal_info_id', this.state.dataSource.data.personal_info_id),
        await AsyncStorage.setItem('@store_vid', this.state.dataSource.data.store_vid),
        await AsyncStorage.setItem('@getCurrency', this.state.dataSource.data.currency)
        await AsyncStorage.setItem('@getFrom', this.state.dataSource.data.country_id)
        await AsyncStorage.setItem('@wallet', this.state.dataSource.data.bal)
    })();

   
    this.setState({ spinner: false });
    this.props.navigation.navigate("TabNav" , {
      first_name: this.state.dataSource.data.first_name,
      last_name: this.state.dataSource.data.last_name,
      email: this.state.dataSource.data.email,
      getCurrency: this.state.dataSource.data.currency,
      phone: this.state.dataSource.data.phone,
      wallet: this.state.dataSource.data.bal,
      userInfo: this.state.dataSource.data,
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

