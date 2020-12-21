import React, { Component } from 'react';
import SplashScreen from '../screens/SplashScreen';
import SliderScreen from '../screens/SliderScreen'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Forget from '../screens/ForgetPassword';
import TabNav from '../screens/TabComponent/index';
import HomeScreen from '../screens/TabComponent/HomeScreen';
import Notifi from '../screens/NotificationsScreen';
import ProfileEdit from '../screens/UserprofileEdit';
import AccountEdit from '../screens/AccountEdit';
import About from '../screens/About';
import CreditCard from '../screens/CreditCardScene';
import Giftcard from '../screens/Giftcard';
import Reward from '../screens/Rewards';
import Wallet from '../screens/Wallet';
import Topup from '../screens/Topup';
import MoblieRecharge from '../screens/MoblieRecharge';
import Users from '../screens/Users';
import SendContacts from '../screens/SendContacts';
import ReceiveContacts from '../screens/ReceiveContacts';
import ReceiveHistory from '../screens/ReceiveHistory';
import Send from '../screens/send';
import Receive from '../screens/Receive';
import NoNetworkScreen from '../screens/NoNetworkScreen';
import SendB from '../screens/SendB';
import agent from '../screens/agent';
import done from '../screens/done';
import Rate from '../screens/Rate';
import RateB from '../screens/RateB';
import RateDollar from '../screens/RateDollar';
import Payout from '../screens/Payout';
import PayoutDone from '../screens/PayoutDone';
import Credit from '../screens/Credit';
import CreditSend from '../screens/CreditSend';
import PayoutConfirm from '../screens/PayoutConfirm';
import WalletHistory from '../screens/WalletHistory';
import SwitchWallet from '../screens/SwitchWallet';
import SwitchWalletConfirm from '../screens/SwitchWalletConfirm';
import ExpenseType from '../screens/ExpenseType';
import ExpenseCal from "../screens/ExpenseCal";
import TransferCal from "../screens/TransferCal";
import TransferReceive from "../screens/TransferReceive";
import TransferConfirm from "../screens/TransferConfirm";
import CustomerAction from "../screens/CustomerAction";
import Customers from "../screens/Customers";
import DebtorAction from "../screens/DebtorAction";
import Formula from "../screens/Formula";
import FormulaRate from "../screens/FormulaRate";








 
const Routes = {
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }

  },
  SliderScreen: {
    screen: SliderScreen,
    navigationOptions: {
      header: null
    }
  },

  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },

  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null
    }
  },

  Forget: {
    screen: Forget,
    navigationOptions: {
      header: null
    }
  },

  TabNav: {
    screen: TabNav,
    navigationOptions: {
      header: null
    }
  },

  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },

  Notifi: {
    screen: Notifi,
    navigationOptions: {
      header: null
    },
  },

  ProfileEdit: {
    screen: ProfileEdit,
    navigationOptions: {
      header: null
    },
  },

  AccountEdit: {
    screen: AccountEdit,
    navigationOptions: {
      header: null
    },
  },

  About: {
    screen: About,
    navigationOptions: {
      header: null
    },
  },

  CreditCard: {
    screen: CreditCard,
    navigationOptions: {
      header: null
    },
  },

  Giftcard: {
    screen: Giftcard,
    navigationOptions: {
      header: null
    },
  },

  Reward: {
    screen: Reward,
    navigationOptions: {
      header: null
    },
  },

  Wallet: {
    screen: Wallet,
    navigationOptions: {
      header: null
    },
  },

  Topup: {
    screen: Topup,
    navigationOptions: {
      header: null
    },
  },

  MoblieRecharge: {
    screen: MoblieRecharge,
    navigationOptions: {
      header: null
    },
  },

 Users: {
    screen: Users,
    navigationOptions: {
      header: null
    },
  },
  SendContacts: {
    screen: SendContacts,
    navigationOptions: {
      header: null
    },
  },

  ReceiveContacts: {
    screen: ReceiveContacts,
    navigationOptions: {
      header: null
    },
  },

  Send: {
    screen: Send,
    navigationOptions: {
      header: null
    },
  },

  Receive: {
    screen: Receive,
    navigationOptions: {
      header: null
    },
  },

  NoNetworkScreen: {
    screen: NoNetworkScreen,
    navigationOptions: {
      header: null
    },
  },
  ReceiveHistory: {
    screen: ReceiveHistory,
    navigationOptions: {
      header: null
    },
  },
  SendB: {
    screen: SendB,
    navigationOptions: {
      header: null
    },
  },
  agent: {
    screen: agent,
    navigationOptions: {
      header: null
    },
  },
  done: {
    screen: done,
    navigationOptions: {
      header: null
    },
  },
  Rate: {
    screen: Rate,
    navigationOptions: {
      header: null
    },
  },
  RateB: {
    screen: RateB,
    navigationOptions: {
      header: null
    },
  },
  Payout: {
    screen: Payout,
    navigationOptions: {
      header: null
    },
  },
  PayoutDone: {
    screen: PayoutDone,
    navigationOptions: {
      header: null
    },
  },
  Credit: {
    screen: Credit,
    navigationOptions: {
      header: null
    },
  },

  CreditSend: {
    screen: CreditSend,
    navigationOptions: {
      header: null
    },
  },
  PayoutConfirm: {
    screen: PayoutConfirm,
    navigationOptions: {
      header: null
    },
  },
  WalletHistory: {
    screen:   WalletHistory,
    navigationOptions: {
      header: null
    },
  },
  SwitchWallet: {
    screen:   SwitchWallet,
    navigationOptions: {
      header: null
    },
  },
  SwitchWalletConfirm: {
    screen:   SwitchWalletConfirm,
    navigationOptions: {
      header: null
    },
  },
  ExpenseType: {
    screen:   ExpenseType,
    navigationOptions: {
      header: null
    },
  },
  ExpenseCal: {
    screen:   ExpenseCal,
    navigationOptions: {
      header: null
    },
  },
  TransferCal: {
    screen:   TransferCal,
    navigationOptions: {
      header: null
    },
  },
  TransferReceive: {
    screen:   TransferReceive,
    navigationOptions: {
      header: null
    },
  },  
  TransferConfirm: {
    screen:   TransferConfirm,
    navigationOptions: {
      header: null
    },
  }, 
  CustomerAction: {
    screen:   CustomerAction,
    navigationOptions: {
      header: null
    },
  }, 
  Customers: {
    screen:   Customers,
    navigationOptions: {
      header: null
    },
  }, 
  DebtorAction: {
    screen:   DebtorAction,
    navigationOptions: {
      header: null
    },
  },
  Formula: {
    screen:   Formula,
    navigationOptions: {
      header: null
    },
  },
  FormulaRate: {
    screen:   FormulaRate,
    navigationOptions: {
      header: null
    },
  },
  RateDollar: {
    screen:   RateDollar,
    navigationOptions: {
      header: null
    },
  },
  
  
  
}
export default Routes;

