import AsyncStorage from '@react-native-community/async-storage';
//const URL = "http://192.168.88.68/king/portal/";
const URL = "http://192.168.43.135/king/portal/";
//const URL = "https://playground.kingokagroup.com/";
//const URL = "https://kingokagroup.com/";
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
const getBanksExclude  = "MobileApi/getBanksExclude";
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
const TransHistory="MobileApi/TransHistory";
const UpdateToken="MobileApi/UpdateToken";
const getAgentCountryWallet="MobileApi/getAgentCountryWallet"
const getProfitRate="MobileApi/getProfitRate";
const getRateSet="MobileApi/getRateSet";
const getCharges="MobileApi/getCharges";


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
    TransHistory,
    UpdateToken,
    getAgentCountryWallet,
    getProfitRate,
    getRateSet,
    getBanksExclude,
    getCharges,

    numberFormate(price,sign="") {
   
        //return '' + x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        if(price==""){
            return 0.00
          }
            const pieces = parseFloat(price).toFixed(2).split('')
            let ii = pieces.length - 3
            while ((ii-=3) > 0) {
              pieces.splice(ii, 0, ',')
            }
            return sign + pieces.join('')
      
    },


    
    

    rawNumber(x) {
        if(x==0){
            return x
        }else{
            return parseFloat(x.replace(/,/g, ''))
        }
       
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
    CheckRoundUP(num){
        if((num % 1) > 0.5){
       return num
    }else{
        return num
    }

}


};