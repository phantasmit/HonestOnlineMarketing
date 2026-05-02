import React, { Component } from 'react';
import Orientation from 'react-native-orientation-locker';
import { getHistoryData,verifyDrawTimeData } from './action';
//
class HistoryComponent extends Component {
    //
    constructor(props) {
        super(props);
        this.state = {
            historyData: [],
            isLoading: false
        }
    }
    //
    componentDidMount() {

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //
            //Orientation.unlockAllOrientations();
            Orientation.lockToPortrait();
            //
            this.setState({
                isLoading: true
            }, () => {
                this.props.getHistoryData({
                    reqData: {
                        "user_id": this.props.userData?.user_id
                    },
                    onSuccessResponse: (response => {
                        console.log('JSON.stringify(response) '+JSON.stringify(response));
                        
                        this.setState({
                            historyData: response,
                            isLoading: false
                        })
                    }),
                    onErrorResponse: (error => {
                        if ('Message' in error) {
                            alert(error?.Message)
                        }
                        this.setState({
                            isLoading: false,
                            historyData: []
                        })
                        //
                    }),
                })
            })
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
        getHistoryData: getHistoryData,
        verifyDrawTimeData:verifyDrawTimeData
    }

}

export { HistoryComponent };