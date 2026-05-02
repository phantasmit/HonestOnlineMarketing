import React, { Component } from 'react';
import Orientation from 'react-native-orientation-locker';
import { submitProgramData } from '../program/action';
import { verifyDrawTimeData } from '../history/action';
import moment from 'moment';
import { NativeModules } from 'react-native';
import { checkUserActivOrNotData, updateErrroInfo } from '../../navigation/action';
//
class ProgramSelectionComponent extends Component {

    constructor(props) {
        super(props);
        //
        Orientation.lockToLandscape();
        //
        this.state = {
            programSelectionData: [],
            currentTime: '',
            totalQty: 0,
            yantraStr: '',
            isSessionClosed: true,
            remainTimer: 0,
            untilid: '1',
        }
        //
        this.interval = null;
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //
            //Orientation.unlockAllOrientations();
            Orientation.lockToLandscape();
            //
            this.interval = setInterval(() => {
                //
                const curretDate = new Date();
                //
                const totalSeconds = (5 - (curretDate.getMinutes() % 5));
                const currentSeconds = (60 - curretDate.getSeconds());
                //
                this.setState({
                    currentTime: new Date().toLocaleTimeString(),
                    isSessionClosed: !(totalSeconds == 1 && currentSeconds <= 15)
                })
            }, 1000)
            //
            //this.checkCurrentDrawTime()
            //
            this.setState({
                programSelectionData: this.props.route.params.programData.filter(item => item.counter > 0)
            }, () => {
                var tempTotalQty = 0
                this.state.programSelectionData.forEach((item, index) => {
                    tempTotalQty += parseInt(item?.counter)
                })
                this.setState({
                    totalQty: tempTotalQty
                })
            })

            var yantra = ''
            this.props.route.params.programData.forEach((item, index) => {
                yantra += item?.counter + ","
            })
            this.setState({
                yantraStr: yantra.substring(yantra, yantra.length - 1)
            })
            //
        })
    }
    //
    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    //
    // checkCurrentDrawTime = () => {
    //     //
    //     const curretDate = new Date();
    //     const totalSeconds = (5 - (curretDate.getMinutes() % 5)) * 60;
    //     //
    //     this.setState({
    //         untilid: (parseInt(this.state.untilid) + 1).toString(),
    //         remainTimer: totalSeconds - curretDate.getSeconds(),
    //         isSessionClosed: false
    //     })
    // }
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
                    this.props.submitProgramData({
                        reqData: {
                            "user_id": this.props.userData?.user_id,
                            "Yantra": this.state.yantraStr
                        },
                        onSuccessResponse: (response => {
                            NativeModules.ToastModule.showToast('Purchase successfully !');
                            this.props.navigation.goBack()
                        }),
                        onErrorResponse: (error => {
                            console.log(JSON.stringify(error));
                            NativeModules.ToastModule.showToast('Error !');
                        })
                    })
                } else {
                    NativeModules.ToastModule.showToast('Session Closed');
                }
            }),
            onErrorResponse: ((error) => {
                console.log(JSON.stringify(error));
            }),
        })
    }
    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
        }
    }

    static mapDispatchToProps = {
        submitProgramData: submitProgramData,
        verifyDrawTimeData: verifyDrawTimeData,
        checkUserActivOrNotData: checkUserActivOrNotData,
        updateErrroInfo: updateErrroInfo

    }

}

export { ProgramSelectionComponent };