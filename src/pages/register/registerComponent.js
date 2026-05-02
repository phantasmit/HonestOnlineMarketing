import React, { Component } from 'react';
import { changeStack, doLogoutFun } from '../../navigation/action';
import { getUserRegister } from './action';
import stacks from "../../navigation/stackEnum";

//
class RegisterComponent extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {

        })
    }

    doUserRegister = (requestData) => {
        this.props.getUserRegister({
            reqData: requestData,
            onSuccessResponse: (response => {

            }),
            onErrorResponse: (error => {
                if (error?.Message) {
                    alert(error?.Message)
                }
            })
        })
    }
    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
        }
    }

    static mapDispatchToProps = {
        changeStack: changeStack,
        doLogoutFun: doLogoutFun,
        getUserRegister: getUserRegister
    }

}

export { RegisterComponent };