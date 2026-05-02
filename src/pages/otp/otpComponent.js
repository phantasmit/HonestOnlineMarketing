import React, { Component } from 'react';
import { NativeModules } from "react-native";
import { changeStack, doLogoutFun } from '../../navigation/action';
import { getUserLogin } from './action';
import auth from '@react-native-firebase/auth';
import { Alert, BackHandler, NativeModules } from 'react-native';
import stacks from "../../navigation/stackEnum";
import DeviceInfo from 'react-native-device-info';
import Orientation from 'react-native-orientation-locker';
//
class OtpComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '+91 99981 45156',
            verificationCode: '123456',
            verificationId: null,
            codeSent: false,
            deviceID: '',
            clickPos: 0
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            /// this.sendVerificationCode()
            // this.props.navigation.navigate('Splash2')
            //this.props.changeStack({ stack_name: stacks.APP_STACK })
            //
            Orientation.unlockAllOrientations();
            Orientation.lockToPortrait();
            //
            DeviceInfo.getUniqueId().then((value) => {
                this.setState({
                    deviceID: value
                })
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


    //
    sendVerificationCode = async () => {
        const { phoneNumber } = this.state;
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            this.setState({ verificationId: confirmation.verificationId, codeSent: true });
            Alert.alert('Code sent to your phone!');
            // this.verifyCode()
        } catch (error) {
            console.error('Error sending code:', error);
            Alert.alert('Failed to send code. Please try again.');
        }
    };
    verifyCode = async () => {
        const { verificationCode, verificationId } = this.state;
        try {
            const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);
            await auth().signInWithCredential(credential);
            Alert.alert('Phone number verified!');
        } catch (error) {
            console.error('Error verifying code:', error);
            Alert.alert('Failed to verify code. Please try again.');
        }
    };
    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
        }
    }

    static mapDispatchToProps = {
        changeStack: changeStack,
        getUserLogin: getUserLogin,
        doLogoutFun: doLogoutFun
    }

}

export { OtpComponent };