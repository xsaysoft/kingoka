import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../common/icons';
import Theme from '../styles/Theme';
import LinearGradient from 'react-native-linear-gradient';
import Constant from "../components/Constant";
import AsyncStorage from '@react-native-community/async-storage';


export default class ExpenseType extends Component {
    constructor(props) {

        super(props)
        this.state = {
            wallet: "0.00",
            income: this.props.navigation.getParam('income', '0'),
            transfer: this.props.navigation.getParam('transfer', '0'),
        }
    }

    async componentDidMount() {

        this.setState({
            wallet: await AsyncStorage.getItem('@wallet'),
            getCurrency: await AsyncStorage.getItem('@getCurrency'),
        });

    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                <ScrollView>

                    <LinearGradient colors={['#fc0f84', '#020cab']}
                        start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.BGsty}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>

                            <Icon style={{ paddingLeft: 10, paddingTop: 10 }} family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                        </TouchableOpacity>
                        {this.state.transfer == 0 ? (
                            <Text style={styles.myAc}> Expense Type</Text>
                        ) : null}
                        {this.state.transfer == 1 ? (
                            <Text style={styles.myAc}> Transfer Type</Text>
                        ) : null}
                         {this.state.transfer == 2 ? (
                            <Text style={styles.myAc}> Debtor Type</Text>
                        ) : null}
                         {this.state.transfer == 3 ? (
                            <Text style={styles.myAc}> Cash Return Type</Text>
                        ) : null}
                        <View style={styles.balancesty}>
                            <Text style={{ fontFamily: 'Poppins-Medium', color: '#000' }}>Balance </Text>
                            <Text style={styles.coststy}>{this.state.getCurrency} {this.state.wallet} </Text>
                        </View>
                    </LinearGradient>
                    {this.state.transfer == 0 ? (
                        <View style={styles.tablistContainer}>


                            <TouchableOpacity style={styles.tabBox} onPress={() => this.props.navigation.navigate("ExpenseCal",
                                {
                                    c_type: 1,
                                }
                            )}>
                                <View style={styles.tabIconSty}>
                                    <Icon family="SimpleLineIcons" name="wallet" size={25} color="#FFF" />
                                </View>
                                <Text style={styles.tabName}>Agent Wallet</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity style={styles.tabBox} onPress={() => this.props.navigation.navigate("ExpenseCal",
                                { c_type: 2 }
                            )}>
                                <View style={styles.tabIconSty}>
                                    <Icon family="MaterialCommunityIcons" name="briefcase-upload-outline" size={25} color="#FFF" />
                                </View>
                                <Text style={styles.tabName}>Bank</Text>
                            </TouchableOpacity> */}


                        </View>
                    ) : null}

                    {this.state.transfer == 1 ? (
                        <View style={styles.tablistContainer}>


                            <TouchableOpacity style={styles.tabBox} onPress={() => this.props.navigation.navigate("TransferCal",
                                {
                                    c_type: 1,
                                }
                            )}>
                                <View style={styles.tabIconSty}>
                                    <Icon family="SimpleLineIcons" name="wallet" size={25} color="#FFF" />
                                </View>
                                <Text style={styles.tabName}>Agent Wallet</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tabBox} onPress={() => this.props.navigation.navigate("TransferCal",
                                { c_type: 2 }
                            )}>
                                <View style={styles.tabIconSty}>
                                    <Icon family="MaterialCommunityIcons" name="briefcase-upload-outline" size={25} color="#FFF" />
                                </View>
                                <Text style={styles.tabName}>Bank</Text>
                            </TouchableOpacity>

                        


                        </View>
                    ) : null}
                     {this.state.transfer == 2 ? (
                        <View style={styles.tablistContainer}>


                            <TouchableOpacity style={styles.tabBox} onPress={() => this.props.navigation.navigate("Customers",
                                {
                                    c_type: 1,transaction:"DebtorAction",
                                }
                            )}>
                                <View style={styles.tabIconSty}>
                                    <Icon family="SimpleLineIcons" name="wallet" size={25} color="#FFF" />
                                </View>
                                <Text style={styles.tabName}>Agent Wallet</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity style={styles.tabBox} onPress={() => this.props.navigation.navigate("Customers",
                                { c_type: 2,transaction:"DebtorAction", }
                            )}>
                                <View style={styles.tabIconSty}>
                                    <Icon family="MaterialCommunityIcons" name="briefcase-upload-outline" size={25} color="#FFF" />
                                </View>
                                <Text style={styles.tabName}>Bank</Text>
                            </TouchableOpacity> */}

                          


                        </View>
                    ) : null}

                    {this.state.transfer == 3 ? (
                        <View style={styles.tablistContainer}>


                            <TouchableOpacity style={styles.tabBox} onPress={() => this.props.navigation.navigate("Customers",
                                {
                                    c_type: 1,transaction:"CustomerAction",
                                }
                            )}>
                                <View style={styles.tabIconSty}>
                                    <Icon family="SimpleLineIcons" name="wallet" size={25} color="#FFF" />
                                </View>
                                <Text style={styles.tabName}>Agent Wallet</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.tabBox} onPress={() => this.props.navigation.navigate("Customers",
                                { c_type: 2,transaction:"CustomerAction", }
                            )}>
                                <View style={styles.tabIconSty}>
                                    <Icon family="MaterialCommunityIcons" name="briefcase-upload-outline" size={25} color="#FFF" />
                                </View>
                                <Text style={styles.tabName}>Other Agent</Text>
                            </TouchableOpacity>


                        </View>
                    ) : null}           


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
        padding: 30,
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
        shadowRadius: 1,
        paddingTop: 60
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