//const BASE_URL = "https://d-98-lux-57-on-712-line.in/uapi/index.php"
//const BASE_URL = "http://mahakalmarketing.in/uapis/index.php"
const BASE_URL = "https://api.ho-ne-st-2-on-li-ne.in/index.php"
//LOGIN API
export const LOGIN_API = () => `${BASE_URL}/login`;
//LOGOUT API
export const LOGOUT_API = () => `${BASE_URL}/logout`;
//Rgister API
export const REGISTER_API = () => `${BASE_URL}/signup`;
//BALANCE API
export const USER_BALANCE_API = (useId) => `${BASE_URL}/balance/${useId}`;
//LAST 5 HISTORY
export const GET_LAST_5_HISTORY_API = () => `${BASE_URL}/smallhistory`;
//SUBMIT PROGRAM
export const SUBMIT_PROGRAM_DETAIL_API = () => `${BASE_URL}/program`;
//History 
export const GET_HISTORY_DATA_API = (useId) => `${BASE_URL}/transection/${useId}`;
//All Draw History
export const GET_ALL_DRAW_API = () => `${BASE_URL}/history`;
//take Balance Api
export const TAKE_BALANCE_API = (useId) => `${BASE_URL}/takebalance/${useId}`;
//Win balance APi
export const WIN_BALANCE_API = () => `${BASE_URL}/winbalancess`;
//All Message Api
export const GET_ALL_MESSAGE_API = () => `${BASE_URL}/messages`;//messageslast
//History Deatils API
export const GET_HISTORY_DETAIL_API = (bnumber, useId) => `${BASE_URL}/detailtransec/${bnumber}/${useId}`;//
//Change password API
export const CHANGE_PASSWORD_API = (useId) => `${BASE_URL}/user/${useId}`;
//Check user winning or not
export const CHECK_WIN_API = (useId) => `${BASE_URL}/winbalance/${useId}`;
//Draw Detail API
export const DRAW_DETAIL_API = (drawId) => `${BASE_URL}/detaildraw/${drawId}`;
//User Info API
export const USER_INFO_API = () => `${BASE_URL}/puser`;
//Get Support API
export const GET_SUPPORT_API = () => `${BASE_URL}/getsupport`;
//Submit Support API
export const SUBMIT_SUPPORT_API = () => `${BASE_URL}/postsupport`;
//GET Reply for support api
export const GET_SUPPORT_DETAIL_API = () => `${BASE_URL}/getsupportdetail`;
//Check Drawtime
export const VERIFY_DRAWTIME_API = () => `${BASE_URL}/drawtime`;
//Add balance
export const ADD_BALANCE_API = () => `${BASE_URL}/transection/addbalance`;
//Withdraw balance
export const WITHDRAW_BALANCE_API = () => `${BASE_URL}/transection/withdrawal`;
//Cancel Transaction API
export const CANCEL_TRANSACTION_API = () => `${BASE_URL}/transection/cancel`;
//Get All Transaction API 
export const TRANSACTION_ALL_API = () => `${BASE_URL}/transection/getall`;
//Check Current User Session API 
export const CHECK_USER_SESSION_API = (useId) => `${BASE_URL}/session/${useId}`;
//Check App Version API
export const CHECK_APP_VERSION_API = () => `${BASE_URL}/version`;
//Check User Active or Not
export const CHECK_USER_ACTIVE_API = (useId) => `${BASE_URL}/active/${useId}`;
//Check App is in  maintenance or Not
export const CHECK_APP_MAINTENANCE_API = () => `${BASE_URL}/maintenance`;
//Check User Udid
export const CHECK_USER_UDID_API = (useId) => `${BASE_URL}/udid/${useId}`;
//Cancel Ticket API
export const CANCEL_TICKET_API = (useId) => `${BASE_URL}/ticket/cancel/${useId}`;