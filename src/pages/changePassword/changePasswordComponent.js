import React, { Component } from 'react';
import { getUserChangePassword } from './action';
//
class ChangePasswordComponent extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {

        })
    }



    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
        }
    }

    static mapDispatchToProps = {
        getUserChangePassword:getUserChangePassword
    }

}

export { ChangePasswordComponent };