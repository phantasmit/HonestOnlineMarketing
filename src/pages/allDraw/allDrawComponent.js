import React, { Component } from 'react';
import { getAllDrawData } from './action';
import Orientation from 'react-native-orientation-locker';
import { drawDetailReqData } from '../program/action';
//
class AllDrawComponent extends Component {

    constructor(props) {
        super(props);
        //
        Orientation.lockToLandscape();
        //
        this.state = {
            isLoading: false,
            allDrawData: []
        }
        //
       
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //
            //Orientation.unlockAllOrientations();
            Orientation.lockToLandscape();
            //
            this.setState({
                isLoading: true
            }, () => {
                this.props.getAllDrawData({
                    reqData: {},
                    onSuccessResponse: (response => {
                        this.setState({
                            allDrawData: response,
                            isLoading: false
                        })
                    }),
                    onErrorResponse: (error => {
                        this.setState({
                            allDrawData: [],
                            isLoading: false
                        })
                    }),
                })
            })
        })
    }

    checkDhamakaOffer = (drawId) => {
        this.props.drawDetailReqData({
            reqData: {
                "DrawId": drawId
            },
            onSuccessResponse: (response => {
                this.props.navigation.navigate('DhamakaView', { data: response?.data })

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
        getAllDrawData: getAllDrawData,
        drawDetailReqData:drawDetailReqData
    }

}

export { AllDrawComponent };