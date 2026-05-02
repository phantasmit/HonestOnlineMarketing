import React, { Component } from 'react';
import { singleMessageData } from '../program/action';
//
class NotificationComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationData: [],
            refreshing: false,
            isLoading: false
        }

    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                isLoading: true
            }, () => {
                this.fetchNotificationData()
            })

        })
    }

    fetchNotificationData = () => {
        this.props.singleMessageData({
            reqData: {
                "type": "Notification"
            },
            onSuccessResponse: (response => {
                this.setState({
                    notificationData: response?.data,
                    refreshing: false,
                    isLoading: false
                })
            }),
            onErrorResponse: (error => {
                console.log(JSON.stringify(error));
                this.setState({
                    notificationData: [],
                    refreshing: false,
                    isLoading: false
                })
            }),
        })
    }

    static mapStateToProps = (state) => {

        return {
            userData: state.StackReducer.userData,
        }
    }

    static mapDispatchToProps = {
        singleMessageData: singleMessageData
    }

}

export { NotificationComponent };