import AsyncStorage from '@react-native-community/async-storage';
//const URL = "http://192.168.88.66/king/portal/";
const URL = "http://192.168.88.34/king/portal/";
//const URL = "http://kingokagroup.com/";
const LOGIN = "MobileApi/m_login";
const getCOUNTRY ="MobileApi/getCountry";
const getRATE = "MobileApi/getRate";
const addCUSTOMER = "MobileApi/addCustomer";
const getCUSTOMERS = "MobileApi/getCustomer";
const getUSER= "MobileApi/getUser";
const addCREDIT ="MobileApi/addCredit";
const getCusBal ="MobileApi/getBal";
const getAgBal ="MobileApi/getAgBal";
const getHistory ="MobileApi/getHistory";
const getBEN ="MobileApi/getBen";
const getBENID ="MobileApi/getBenID";
const getAGENT="MobileApi/getAgent";
const addTRANSFER="MobileApi/addTransfer"
const getTRANSFER="MobileApi/getAgentT";
const CPAYOUT="MobileApi/Cpayout";
const RPAYOUT="MobileApi/Rpayout";
const getBANKS="MobileApi/getBanks";
const getPERCENT="MobileApi/getPercent";
const getOTHERWALLET ="MobileApi/OtherWallet";
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
  getAgBal ,
  getPERCENT,
  getOTHERWALLET,

  numberFormate(x) {
    return '' + x.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  },
  
rawNumber(x)
{
  return parseFloat(x.replace(/,/g, ''))
},
async removeAsyncValue(key) {
  try {
      await AsyncStorage.removeItem(key);
      return true;
  }
  catch(exception) {
      return false;
  }
},
async SetAsyncValue(key,value) {
  try {
    await AsyncStorage.setItem(key,value);
  }
  catch(e) {
      return false;
  }
},

  
};