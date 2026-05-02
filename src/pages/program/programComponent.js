import { NativeModules } from "react-native";
import React, { Component } from 'react';
import Orientation from 'react-native-orientation-locker';
import { changeStack, checkAppUserUDID, doLogout, doLogoutFun } from '../../navigation/action';
import { getLast5Data, getUserBalance, singleMessageData, checkUserWinReqData, drawDetailReqData } from './action';
import moment from 'moment';
import { data } from './data';
import { verifyDrawTimeData } from '../history/action';
import {
    AlertNotificationRoot,
    Toast,
} from 'react-native-alert-notification';
import DeviceInfo from 'react-native-device-info';
import stacks from "../../navigation/stackEnum";
//

class ProgramComponent extends Component {

    constructor(props) {
        super(props);
        Orientation.lockToLandscape();
        this.tabRef = React.createRef();
        this.showToast()
        this.state = {
            index: 0,
            selectCounter: 0,
            selectedIndex: -1,
            currentDate: '',
            currentTime: '',
            drawTime: '',
            untilid: '1',
            remainTimer: 0,
            last5Record: [],
            programData: JSON.parse(JSON.stringify(data)),
            totalTicket: 0,
            appMessage: [],
            isActionButton: false,
            totalBalance: '',
            isWinner: false,
            isDisable: false,
            isSessionClosed: true,
            elapsedTime: 0,
            isRunning: false,
            remainingTime: 0,
        }
        this.elapsedTimer = null
    }

    startTimer = () => {
        //
        this.setState({
            isRunning: true,
            remainingTime: 0
        }, () => {
            this.timer = setInterval(() => {
                this.setState((prevState) => {
                    //
                    const curretDate = new Date();
                    const totalSeconds = ((5 - (curretDate.getMinutes() % 5)) * 60) - curretDate.getSeconds();
                    //
                    if (totalSeconds <= 1) {
                        //
                        this.getLast5Record()
                        //
                        if ((curretDate.getMinutes() + 6) == 60) {
                            return {
                                currentDate: moment().format("DD-MM-yyyy"),
                                drawTime: ((curretDate.getHours() + 1) % 12 || 12) + ":" + this.convertSeconds(((curretDate.getMinutes() + 6) * 60) + totalSeconds).minutes + "  " + (curretDate.getHours() >= 12 ? 'PM' : 'AM'),
                                isDisable: false,
                                isSessionClosed: true
                            };
                        } else {
                            return {
                                currentDate: moment().format("DD-MM-yyyy"),
                                drawTime: (curretDate.getHours() % 12 || 12) + ":" + this.convertSeconds(((curretDate.getMinutes() + 6) * 60) + totalSeconds).minutes + "  " + (curretDate.getHours() >= 12 ? 'PM' : 'AM'),
                                isDisable: false,
                                isSessionClosed: true
                            };
                        }
                    }
                    if (totalSeconds == 15) {
                        return { isSessionClosed: false };
                    }
                    return { remainingTime: totalSeconds, currentTime: curretDate.toLocaleTimeString('en-US', { hour12: true }) };
                });
            }, 1000);
        });
    };

    stopTimer = () => {
        this.setState({ isRunning: false });
        clearInterval(this.elapsedTimer);
    };

    resetTimer = () => {
        this.setState({ elapsedTime: 0, isRunning: false });
        clearInterval(this.elapsedTimer);
    };

    formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //
            this.clearAllData()
            //
            //Orientation.unlockAllOrientations()
            Orientation.lockToLandscape();
            //
            this.startTimer()
            this.checkNextDrawTime(this.state.isDisable)
            //
            //
            this.props.checkAppUserUDID({
                reqData: {
                    "user_id": this.props.userData?.user_id
                },
                onSuccessResponse: (response => {
                    if (response.result == true) {
                        DeviceInfo.getUniqueId().then((value) => {
                            if (response?.udid === value) {
                                //
                                this.props.singleMessageData({
                                    reqData: {},
                                    onSuccessResponse: (response => {
                                        this.setState({
                                            appMessage: response?.data
                                        })
                                    }),
                                    onErrorResponse: (error => {
                                        console.log(JSON.stringify(error));
                                    }),
                                })
                                //
                                this.props.getUserBalance({
                                    reqData: {
                                        "user_id": this.props.userData?.user_id
                                    },
                                    onSuccessResponse: (response => {
                                        this.setState({
                                            totalBalance: response?.UserBalance
                                        })
                                    }),
                                    onErrorResponse: (error => {
                                        console.log(JSON.stringify(error));
                                    }),
                                })
                            } else {
                                this.props.doLogoutFun({
                                    reqData: {
                                        'user_id': this.props.userData?.user_id
                                    },
                                    onSuccessResponse: (response => {
                                        this.props.changeStack({ stack_name: stacks.ON_BOARD_STACK })
                                        this.props.doLogout()
                                        NativeModules.ToastModule.showToast(response?.Message);
                                    }),
                                    onErrorResponse: (error => {
                                        console.log(JSON.stringify(error));
                                    }),
                                })
                            }
                        })
                    }

                }),
                onErrorResponse: (error => {
                    console.log(JSON.stringify(error));
                }),
            })
        })
        //
    }
    //
    componentWillUnmount() {
        this.stopTimer()
    }
    //
    showToast = () => {
        Toast.show({
            title: 'This is a text-only notification!',
            duration: 1000, // duration in milliseconds
            placement: 'bottom', // position at the bottom
            animationType: 'slide-in', // slide-in animation
            containerStyle: {
                backgroundColor: '#333', // Customize background color
            },
            textStyle: {
                color: '#fff', // Customize text color
            },
        });

    };
    //
    getLast5Record = () => {
        setTimeout(() => {
            this.props.getLast5Data({
                reqData: {},
                onSuccessResponse: (response => {
                    this.setState({
                        last5Record: response
                    })
                }),
                onErrorResponse: (error => {
                    console.log(JSON.stringify(error));
                }),
            })
        }, 2000)
    }
    //
    convertSeconds = (seconds) => {
        //
        const duration = moment.duration(seconds, 'seconds');
        //
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes().toString().padStart(2, '0');

        return { hours, minutes };
    }
    //
    checkNextDrawTime = (isDisableCheck = false) => {
        //
        const curretDate = new Date();
        const totalSeconds = (5 - (curretDate.getMinutes() % 5)) * 60;
        //
        if ((curretDate.getMinutes() + 6) == 60) {
            this.setState({
                currentDate: moment().format("DD-MM-yyyy"),
                drawTime: (curretDate.getHours() + 1 % 12 || 12) + ":" + this.convertSeconds((curretDate.getMinutes() * 60) + totalSeconds).minutes + "  " + (curretDate.getHours() >= 12 ? 'PM' : 'AM'),
                isDisable: isDisableCheck,
                isSessionClosed: true
            }, () => {
                this.getLast5Record()
            })
        } else {
            this.setState({
                currentDate: moment().format("DD-MM-yyyy"),
                drawTime: (curretDate.getHours() % 12 || 12) + ":" + this.convertSeconds((curretDate.getMinutes() * 60) + totalSeconds).minutes + "  " + (curretDate.getHours() >= 12 ? 'PM' : 'AM'),
                isDisable: isDisableCheck,
                isSessionClosed: true
            }, () => {
                this.getLast5Record()
            })
        }

    }
    //
    clearAllData = () => {
        this.setState({
            programData: JSON.parse(JSON.stringify(data)),
            totalTicket: 0,
            selectedIndex: -1,
            selectCounter: 0,
            isActionButton: false
        })
    }
    //
    goToPreviousScreen = () => {
        Orientation.unlockAllOrientations()
        Orientation.lockToPortrait();
        this.props.navigation.goBack()
    }
    //
    checkUserWinStatus = () => {
        this.setState({
            isDisable: true
        }, () => {
            this.props.checkUserWinReqData({
                reqData: {
                    "user_id": this.props.userData?.user_id
                },
                onSuccessResponse: (response => {
                    if (response?.result) {
                        if (response?.Winning == 0) {
                            NativeModules.ToastModule.showToast('Oops! better luck next time.');
                        } else {
                            this.props.navigation.navigate('CheckModal', response)
                        }
                    } else {
                        NativeModules.ToastModule.showToast(response?.Message);
                    }
                }),
                onErrorResponse: (error => {
                    console.log(JSON.stringify(error));
                }),
            })
        })
    }
    //
    checkDhamakaOffer = (drawId) => {
        this.props.drawDetailReqData({
            reqData: {
                "DrawId": drawId
            },
            onSuccessResponse: (response => {
                this.props.navigation.navigate('DhamakaView', { data: response?.data })
            }),
            onErrorResponse: (error => {
                console.log(JSON.stringify(error));
            }),
        })
    }
    //
    checkDrawTimeReq = () => {
        //
        const curretDate = new Date();
        //
        this.props.verifyDrawTimeData({
            reqData: {
                "purchasedate": moment().format("yyyy-MM-DD"),
                "purchasetime": `${curretDate.getHours()}:${curretDate.getMinutes()}:${curretDate.getSeconds()}`
            },
            onSuccessResponse: ((response) => {
                if (response?.result) {
                    this.props.navigation.navigate('ProgramSelection', { programData: this.state.programData })
                } else {
                    NativeModules.ToastModule.showToast('Session Closed');
                }
            }),
            onErrorResponse: ((error) => {
                console.log(JSON.stringify(error));
            }),
        })
    }
    //
    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
        }
    }
    //
    static mapDispatchToProps = {
        changeStack: changeStack,
        getLast5Data: getLast5Data,
        getUserBalance: getUserBalance,
        singleMessageData: singleMessageData,
        checkUserWinReqData: checkUserWinReqData,
        drawDetailReqData: drawDetailReqData,
        verifyDrawTimeData: verifyDrawTimeData,
        checkAppUserUDID: checkAppUserUDID,
        doLogout: doLogout,
        doLogoutFun: doLogoutFun,
    }

}

export { ProgramComponent };