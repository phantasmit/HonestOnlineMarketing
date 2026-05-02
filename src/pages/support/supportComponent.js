import React, { Component } from 'react';
import Orientation from 'react-native-orientation-locker';
import { getSupportData } from './action';
//
class SupportComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            supportData: [],
        }

    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //
            Orientation.unlockAllOrientations();
            Orientation.lockToPortrait();
            //
            this.fetchSupportData()
        })
    }

    fetchSupportData = () => {
        this.props.getSupportData({
            reqData: {
                "user_id": 2
            },
            onSuccessResponse: (response => {
                this.setState({
                    refreshing: false,
                    supportData: response?.data,
                })

            }),
            onErrorResponse: (error => {
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
        getSupportData: getSupportData
    }

}

export { SupportComponent };