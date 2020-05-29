import AsyncStorage from '@react-native-community/async-storage';
//const URL = "http://192.168.88.35/king/portal/";
const URL = "http://192.168.43.165/king/portal/";
//const URL = "http://kingokagroup.com/";
const LOGIN = "MobileApi/m_login";
const getCOUNTRY = "MobileApi/getCountry";
const getRATE = "MobileApi/getRate";
const addCUSTOMER = "MobileApi/addCustomer";
const getCUSTOMERS = "MobileApi/getCustomer";
const getUSER = "MobileApi/getUser";
const addCREDIT = "MobileApi/addCredit";
const getCusBal = "MobileApi/getBal";
const getAgBal = "MobileApi/getAgBal";
const getHistory = "MobileApi/getHistory";
const getBEN = "MobileApi/getBen";
const getBENID = "MobileApi/getBenID";
const getAGENT = "MobileApi/getAgent";
const addTRANSFER = "MobileApi/addTransfer"
const getTRANSFER = "MobileApi/getAgentT";
const CPAYOUT = "MobileApi/Cpayout";
const RPAYOUT = "MobileApi/Rpayout";
const getBANKS = "MobileApi/getBanks";
const getPERCENT = "MobileApi/getPercent";
const getOTHERWALLET = "MobileApi/OtherWallet";
const addINCOME = "MobileApi/addIncome";
const addEXPENSES = "MobileApi/addExpenses";
const addAgentTransfer = "MobileApi/addAgentTransfer";
const TransferPending = "MobileApi/TransferPending";
const ConfirmTransfer = "MobileApi/ConfirmTransfer";
const debitWallet =  "MobileApi/debitWallet";
const debtorPay  =  "MobileApi/debtorPay";
const getCountryMain = "MobileApi/getCountryMain";


export default {
    URL,
    LOGIN,
    getCOUNTRY,
    getRATE,
    addCUSTOMER,
    getCUSTOMERS,
    getUSER,
    addCREDIT,
    getCusBal,
    getHistory,
    getBEN,
    getBENID,
    getAGENT,
    addTRANSFER,
    getTRANSFER,
    CPAYOUT,
    RPAYOUT,
    getBANKS,
    getAgBal,
    getPERCENT,
    getOTHERWALLET,
    addINCOME,
    addEXPENSES,
    addAgentTransfer,
    TransferPending,
    ConfirmTransfer,
    debitWallet,
    debtorPay,
    getCountryMain,

    numberFormate(x) {
        return '' + x.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },

    rawNumber(x) {
        return parseFloat(x.replace(/,/g, ''))
    },
    async removeAsyncValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (exception) {
            return false;
        }
    },
    async SetAsyncValue(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            return false;
        }
    },


};