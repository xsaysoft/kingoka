

//const URL = "http://172.20.10.8/king/portal/";
const URL = "http://kingokagroup.com/";
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

  numberFormate(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
};