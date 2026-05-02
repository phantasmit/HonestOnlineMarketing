import React, { Component } from 'react';
import { getUserInfoData } from './action';
import { changeStack, doLogout, doLogoutFun } from '../../navigation/action';
//
class UserProfileComponent extends Component {

    constructor(props) {
        super(props);
        this.state={
            userInfo:{}
        }

    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //
            this.props.getUserInfoData({
                reqData: {
                    'user_id': this.props.userData?.user_id
                },
                onSuccessResponse: (response => {
                    this.setState({
                        userInfo:response?.data
                    })
                }),
                onErrorResponse: (error => {
                    console.log(JSON.stringify(error));
                }),
            })
            //
        })
    }



    static mapStateToProps = (state) => {

        return {
            userData: state.StackReducer.userData,
        }
    }

    static mapDispatchToProps = {
        getUserInfoData: getUserInfoData,
        doLogoutFun:doLogoutFun,
        changeStack:changeStack,
        doLogout:doLogout
    }

}

export { UserProfileComponent };