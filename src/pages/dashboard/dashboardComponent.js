import React, { Component } from 'react';
import Orientation from 'react-native-orientation-locker';
import { changeStack, checkAppUserUDID, doLogout, doLogoutFun } from '../../navigation/action';
import { data } from './data';
import { getUserBalance } from '../program/action';
import { BackHandler, NativeModules } from 'react-native';
//
class DashboardComponent extends Component {

    constructor(props) {
        super(props);
        this.tabRef = React.createRef();
        this.state = {
            index: 0,
            optionData: JSON.parse(JSON.stringify(data)),
            totalBalance: 0,
            clickPos: 0
        }
    }

    componentDidMount() {
        //
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //
            //Orientation.unlockAllOrientations();
            Orientation.lockToPortrait();
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
            //
            this.backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                this.handleBackPress
            );
            //
        })
    }

    componentWillUnmount() {
        // Remove the event listener when the component is unmounted
        this.backHandler.remove();
    }
    handleBackPress = () => {
        // Custom logic
        if (this.state.clickPos == 0) {
            this.setState({
                clickPos: 1
            }, () => {
                NativeModules.ToastModule.showToast('Press again to exit');
            })

        } else {
            BackHandler.exitApp()
        }
        return true; // Returning true prevents default behavior (app exit)
    };

    checkMessageStatus = () => {
        var today = new Date()
        var curHr = today.getHours()

        if (curHr < 12) {
            return 'Good Morning'
        } else if (curHr < 18) {
            return 'Good Afternoon'
        } else {
            return 'Good Evening'
        }
    }

    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
        }
    }

    static mapDispatchToProps = {
        changeStack: changeStack,
        doLogout: doLogout,
        doLogoutFun: doLogoutFun,
        getUserBalance: getUserBalance,
        checkAppUserUDID: checkAppUserUDID
    }

}

export { DashboardComponent };