import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../../common/icons';
import Theme from '../../styles/Theme';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

export default class ProfileScreen extends Component {
    constructor(props) {
       
        super(props)
        this.state = {
            wallet:"0.00",
        }
    }
    
    async componentDidMount() {

            this.setState({ wallet: await AsyncStorage.getItem('@wallet') ,
            getCurrency: await AsyncStorage.getItem('@getCurrency'), });

    }
   
    logout= async () => {
        await AsyncStorage.removeItem("@isLoggedIn");
        AsyncStorage.removeItem();
        this.props.navigation.navigate("LoginScreen")

      };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                <ScrollView>

                    <LinearGradient colors={['#fc0f84', '#020cab']}
                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.BGsty}>
                        <Text style={styles.myAc}>My Account</Text>
                            <View style={styles.balancesty}>
                                <Text style={{ fontFamily: 'Poppins-Medium', color: '#000' }}>Balance </Text>
        <Text style={styles.coststy}>{this.state.getCurrency} {this.state.wallet} </Text>
                            </View>
                    </LinearGradient>

                    <View style={styles.tablistContainer}>
                        <TouchableOpacity style={styles.tabBox}  onPress={() => this.props.navigation.navigate("Topup")}>
                            <View style={styles.tabIconSty}>
                                <Icon family="MaterialCommunityIcons" name="briefcase-upload-outline" size={25} color="#FFF" />
                            </View>
                            <Text style={styles.tabName}>TopUp</Text>
                        </TouchableOpacity>

                    

                        <TouchableOpacity style={styles.tabBox} onPress={() => this.props.navigation.navigate("Wallet")}>
                            <View style={styles.tabIconSty}>
                                <Icon family="SimpleLineIcons" name="wallet" size={25} color="#FFF" />
                            </View>
                            <Text style={styles.tabName}>Wallet</Text>
                        </TouchableOpacity>
                    </View>


                    <View>
                        <View style={{ marginTop: 30, paddingLeft: 35, paddingVertical: 10, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ProfileEdit")}>
                                <View style={styles.settingLayout}>
                                    <View style={styles.settingNamesty}>
                                        <Icon family="FontAwesome5" name='user' size={27} color={Theme.mainColor} />
                                        <Text style={styles.meunSty}>Profile</Text>
                                    </View>
                                    <Icon family="MaterialIcons" name="keyboard-arrow-right" size={30} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>

                      
                        <View style={{ paddingLeft: 35, paddingVertical: 10, }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("About")}>
                                <View style={styles.settingLayout}>
                                    <View style={styles.settingNamesty}>
                                        <Icon family="SimpleLineIcons" name='question' size={30} color={Theme.mainColor} />
                                        <Text style={styles.meunSty}>About </Text>
                                    </View>
                                    <Icon family="MaterialIcons" name="keyboard-arrow-right" size={30} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.logContainer} onPress={this.logout}>
                            <Icon family="AntDesign" name="logout" size={30} color={Theme.mainColor} />
                            <Text style={styles.logoutTxt}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    BGsty: {
        flex: 1,
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        height: 150,
    },
    myAc: {
        color: '#FFF',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        textAlign: 'center',
        paddingVertical: 20
    },
    coststy: {
        color: '#fcad50',
        fontFamily: 'Poppins-Bold',
        fontSize: 16
    },
    balanceBg: {
        padding: 10,
        backgroundColor: '#FFF',
        marginHorizontal: 40,
        borderRadius: 20
    },
    balancesty: {
        padding: 10,
        backgroundColor: '#FFF',
        marginHorizontal: 40,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabBox: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 15,
    },
    tabName: {
        paddingTop: 10,
        fontFamily: 'Poppins-Medium'
    },
    meunSty: {
        fontSize: 17,
        paddingLeft: 20,
        fontFamily: 'Poppins-SemiBold'
    },
    Acdetails: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 12,
        paddingVertical: 5
    },
    settingLayout: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    tablistContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 50,
        elevation: 2,
        shadowColor: 'lightgrey',
        shadowOffset: { width: -0.5, height: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    tabIconSty: {
        backgroundColor: Theme.mainColor,
        padding: 10,
        borderRadius: 50,
        alignItems: 'center'
    },
    settingNamesty: {
        flex: 0.6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    logContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        paddingLeft: 50
    },
    logoutTxt: {
        fontSize: 17,
        paddingHorizontal: 5,
        paddingLeft: 20,
        fontFamily: 'Poppins-SemiBold'
    }
});