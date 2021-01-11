/* 
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = "menu-default";

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = "en";
export const localeOptions = [
  { id: "en", name: "English - LTR", direction: "ltr" },
  { id: "es", name: "Español", direction: "ltr" },
  { id: "enrtl", name: "English - RTL", direction: "rtl" },
];

export const firebaseConfig = {
  apiKey: "AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg",
  authDomain: "gogo-react-login.firebaseapp.com",
  databaseURL: "https://gogo-react-login.firebaseio.com",
  projectId: "gogo-react-login",
  storageBucket: "gogo-react-login.appspot.com",
  messagingSenderId: "216495999563",
};

export const currentUser = {
  id: 1,
  title: "Sarah Kortney",
  img: "/assets/img/profiles/l-1.jpg",
  date: "Last seen today 15:24",
  role: 2,
};

export const adminRoot = "/app";
export const accountRoot = "/accounts";
export const buyUrl = "https://1.envato.market/k4z0";
export const searchPath = `${adminRoot}/pages/miscellaneous/search`;
export const servicePath = "https://api.coloredstrategies.com";

export const themeColorStorageKey = "__theme_selected_color";
export const isMultiColorActive = true;
export const defaultColor = "light.greenlime";
export const isDarkSwitchActive = true;
export const defaultDirection = "ltr";
export const themeRadiusStorageKey = "__theme_radius";
export const isAuthGuardActive = false;
export const colors = [
  "bluenavy",
  "blueyale",
  "blueolympic",
  "greenmoss",
  "greenlime",
  "purplemonster",
  "orangecarrot",
  "redruby",
  "yellowgranola",
  "greysteel",
];

export const LOGIN_SUCCESS = "LOGIN SUCCESS";
export const LOGIN_FAILED = "LOGIN FAILED";
export const LOGOUT = "LOGOUT";
export const CLEARMESSAGE = "CLEAR MESSAGE";

export const ADD_ACCOUNT = "ADD ACCOUNT";
export const CLEAR_ACCOUNT = "CLEAR ACCOUNT";
export const SELECTED_ACCOUNT = "SELECTED ACCOUNT";
export const ACCOUNT_PERMISSION = "ACCOUNT PERMISSION";

export const STORE_DETAILS = "STORE DETAILS";
export const UPDATE_DETAILS = "UPDATE DETAILS";

export const BASE_URL = "https://localhost:44319/api"; //"http://api.oatleaf.com/api";
//export const BASE_GATEWAY_URL = "http://35.193.238.146/gateway";
export const ADMIN_LOGIN_URL = `${BASE_URL}/User/signin`;
export const REGISTER_URL = `${BASE_URL}/User/signup`;

export const MENU_SET_CLASSNAMES = "MENU_SET_CLASSNAMES";
export const MENU_CONTAINER_ADD_CLASSNAME = "MENU_CONTAINER_ADD_CLASSNAME";
export const MENU_CLICK_MOBILE_MENU = "MENU_CLICK_MOBILE_MENU";
export const MENU_CHANGE_DEFAULT_CLASSES = "MENU_CHANGE_DEFAULT_CLASSES";
export const MENU_CHANGE_HAS_SUB_ITEM_STATUS =
  "MENU_CHANGE_HAS_SUB_ITEM_STATUS";
