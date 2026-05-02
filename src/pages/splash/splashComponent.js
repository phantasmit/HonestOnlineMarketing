import React, { Component } from 'react';
import { changeStack, doLogoutFun } from '../../navigation/action';
import { getUserLogin } from './action';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native'
import {
    AlertNotificationRoot,
    Toast,
} from 'react-native-alert-notification';
import Orientation from 'react-native-orientation-locker';
//
class SplashComponent extends Component {

    constructor(props) {
        super(props);

    }
    showToast = () => {
        Toast.show({
            title: 'This is a text-only notification!',
            // type:'INFO',
            autoClose: 30000,
            //duration: 1000, // duration in milliseconds
            placement: 'bottom', // position at the bottom
            // animationType: 'slide-in', // slide-in animation
            // textBodyStyle: {
            //     backgroundColor: 'white', // Customize background color
            // },
            // textStyle: {
            //     color: 'red', // Customize text color
            // },
        });

    };

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //Orientation.unlockAllOrientations();
            Orientation.lockToPortrait();
            setTimeout(() => {
                if (this.props.errorCode == 0 && this.props.userData?.user_id) {
                    this.props.navigation.replace('Dashboard')
                } else if (this.props.errorCode == 0) {
                    this.props.navigation.replace('Login')
                }
            }, 1500)
        })
    }


    static mapStateToProps = (state) => {
        return {
            errorCode: state.StackReducer.errorCode,
            userData: state.StackReducer.userData,
        }
    }

    static mapDispatchToProps = {

    }

}

export { SplashComponent };