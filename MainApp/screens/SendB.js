import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, TextInput,StatusBar,Picker ,Alert} from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Constant from "../components/Constant";



export default class Send extends Component {
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
            fromAgent: this.props.navigation.getParam('fromAgent', '0'),
            ben_name:"",
            message:"",
            ben_id:"",
            ben_bank:"",
            ben_acc:"",
            ben_phone:"",
            CountryList: [],
             BenList: [],
            BenIDList:"",
            personal_info_id:"",
            spinner: true,
            bal:"0.00",
            show: false,
       

         
         
        }
    
    }


    async componentDidMount() {

        this.setState({ wallet: await AsyncStorage.getItem('@wallet') ,
        personal_info_id: await AsyncStorage.getItem('@personal_info_id') ,
        getCurrency: await AsyncStorage.getItem('@getCurrency'), });
        
        try {
       
            const BenApiCall = await fetch(Constant.URL+Constant.getBEN+"/"+this.state.customer_id);
            const getBen = await BenApiCall.json();
        
            this.setState({BenList: getBen, spinner: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }

      
    
    }

    handleClose = () => {

        this.setState({ show: false })
     }

    onPressShow = async () => {
   
    const { ben_id} = this.state;
    if( ben_id <=0){
        Alert.alert("Please Select A Beneficiary.");
    }else {
        
        try {
       
            const BenIDApiCall = await fetch(Constant.URL+Constant.getBENID+"/"+this.state.ben_id);
            const getBenID = await BenIDApiCall.json();
       
            this.setState({BenIDList: getBenID, spinner: false});
            
            if(ben_id==90000)
            {

            }else{
            this.setState({ben_id: this.state.BenIDList.data.ben_id,
                ben_name: this.state.BenIDList.data.ben_name, 
                ben_phone: this.state.BenIDList.data.ben_phone, 
                 spinner: false});
            }
            
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
         this.props.navigation.navigate("agent",{
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
            
         })
    
        }
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
        <Text style={styles.headTxt}> Add Beneficiary {this.state.cus_name} </Text>
                </View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: 'lightgray', alignItems: 'center' }}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.userimg} source={require('../assets/img/boy.png')} />
                        </View>
                        <View style={styles.userdetails}>
                            <Text style={{ fontSize: 18, color: '#000', fontFamily: 'Poppins-Light' }}>{this.state.cus_name}</Text>
                            <Text style={{ fontSize: 12, color: '#000', fontFamily: 'Poppins-Thin' }}>{this.state.cus_phone}</Text>
                        </View>
                       
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                    <Picker  style={{ flex: 0.9, paddingLeft: 150 }}  
                            selectedValue={this.state.ben_id}  
                            onValueChange={(itemValue, itemPosition) => this.setState({ben_id: itemValue, ben_idIndex: itemPosition})}   > 
                            
                             <Picker.Item label=" SELECT BENEFICIARY" value="0"/> 
                             <Picker.Item label=" CREATE NEW BENEFICIARY" value="90000" /> 
                             {
                                this.state.BenList.map( (x)=>{
                                return <Picker.Item label={x.ben_name +" - "+ x.ben_phone }  value={x.ben_id} />
                                })
                                } 
                            </Picker> 
                          
                    </View>
                 
{this.state.ben_id==90000 ? (  <View >
                                <View style={styles.txtbox}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Beneficiary Name"
                                keyboardType="name-phone-pad"
                                onChangeText={(ben_name)=>this.setState({ben_name})}
                                value={this.state.ben_name}
                                
                            />
                          
                        </View>
                        <View style={styles.txtbox}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Beneficiary Phone"
                                keyboardType="phone-pad"
                                maxLength={14}
                                onChangeText={(ben_phone)=>this.setState({ben_phone})}
                                value={this.state.ben_phone}
                            />
                           
                        </View>
                        <View style={styles.txtbox}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Beneficiary Bank Name"
                                keyboardType="name-phone-pad" 
                                onChangeText={(ben_bank)=>this.setState({ben_bank})}
                                value={this.state.ben_bank}
                            />
                          
                        </View>
                        <View style={styles.txtbox}>
                            <TextInput
                                style={{ flex: 0.9, paddingLeft: 20 }}
                                placeholder="Beneficiary Account Number"
                                keyboardType="name-phone-pad" 
                                onChangeText={(ben_acc)=>this.setState({ben_acc})}
                                value={this.state.ben_acc}
                            />
                          
                        </View>
                </View>  ): null}

                     
                        
                     <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, margin: 15, paddingHorizontal: 15 }}>
                        <TextInput style={{ flex: 1, paddingLeft: 10, fontSize: 16, fontFamily:'Poppins-ExtraLightItalic' }}
                            keyboardType='email-address'
                            placeholder="Add a message (Optioncal)"
                            onChangeText={(message)=>this.setState({message})}
                            value={this.state.message}
                        />
                    </View>

               

                 <TouchableOpacity style={{ paddingVertical: 10, backgroundColor: '#020cab', marginTop: 30, borderRadius: 50, marginHorizontal: 30 }} onPress={this.onPressShow}>
                            <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 ,  fontFamily: 'Poppins-Bold',}}>CONTINUE </Text>
                </TouchableOpacity>

                

                     
                    <View style={{margin: 20}}></View>
                  
                    
                   
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