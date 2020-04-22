import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, StatusBar } from 'react-native';
import Theme from '../styles/Theme';
import Icon from '../common/icons';

export default class Notifi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            transfer: [
                { userimage: require('../assets/img/atm.png'), username: '$ 260.00 withdrawn at ATM', },
                { userimage: require('../assets/img/bank.png'), username: '$ 550.00 Credited for your Bank Account', },
            ],
            transferlater: [
                { userimage: require('../assets/img/girl.png'), username: '$ 1200.00 Credited from NETbanking', transferdate: '28 may 2019', },
                { userimage: require('../assets/img/bank.png'), username: '$ 55.00 Charges for your Bank Account', transferdate: '26 may 2019', },
                { userimage: require('../assets/img/man.png'), username: '$ 3300.00 Debited ', transferdate: '17 may 2019', },
                { userimage: require('../assets/img/atm.png'), username: '$ 5000.00 Credited at ATM', transferdate: '10 may 2019', },
                { userimage: require('../assets/img/atm.png'), username: '$ 6000.00 Credited at ATM', transferdate: '3 may 2019', },

            ],
        }
    }

    _renderTransfer(rowdata) {
        return (
            <TouchableOpacity>
                <View style={styles.transferbox}>
                    <View style={styles.flexrow}>
                        <View style={styles.imgContainer}>
                            <Image style={styles.userimg} source={rowdata.item.userimage} />
                        </View>
                        <View style={styles.flexrow}>
                            <View style={styles.userdetails}>
                                <Text style={styles.notifiTxt}>{rowdata.item.username}</Text>
                                <Text style={styles.dayTxt}>{rowdata.item.transferdate}</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Theme.bgcolor }}>
                <StatusBar backgroundColor="#020cab" barStyle="light-content" />
                <View style={styles.logContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon family="MaterialIcons" name="arrow-back" size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headtxt}>Notification</Text>
                </View>
                <ScrollView>
                    <Text style={styles.txtday}>TODAY</Text>
                    <FlatList
                        data={this.state.transfer}
                        renderItem={this._renderTransfer.bind(this)}
                    />
                    <Text style={styles.txtday}>OLDER</Text>
                    <FlatList
                        data={this.state.transferlater}
                        renderItem={this._renderTransfer.bind(this)}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexrow: {
        flex: 1,
        flexDirection: 'row'
    },
    transferbox: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        elevation: 2,
        shadowColor: 'lightgrey',
        shadowOffset: { width: -0.5, height: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 1
    },
    imgContainer: {
        backgroundColor: "#fff",
        margin: 5,
        width: 50,
        height: 50,
        borderRadius: 50,
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
    debited: {
        fontSize: 10,
        paddingVertical: 2,
        color: 'green',
        textAlign: 'center'
    },
    userimg: {
        width: 30,
        height: 30,
        resizeMode: "contain"
    },
    dayTxt: {
        fontSize: 10,
        color: 'gray',
        fontFamily: 'Poppins-Light'
    },
    txtday: {
        margin: 10,
        fontFamily: 'Poppins-SemiBold'
    },
    userdetails: {
        flex: 1,
        paddingLeft: 10,
        flexDirection: "column",
        justifyContent: 'center'
    },
    notifiTxt: {
        color: 'black',
        fontSize: 13,
        fontFamily: 'Poppins-Regular'
    },
    paymentsty: {
        flex: 0.4,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    logContainer: {
        padding: 15,
        backgroundColor: '#020cab',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headtxt: {
        color: '#FFf',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        marginHorizontal: 20
    }
});
