import React, { Component } from 'react';
import Orientation from 'react-native-orientation-locker';
import { getHistoryDetailData, cancelTicketData } from './action';
import { data } from '../program/data';
//
class HistoryDetailComponent extends Component {
    //
    constructor(props) {
        super(props);
        this.state = {
            historyDetail: {},
            isLoading: false,
            masterPptionData: JSON.parse(JSON.stringify(data)),
            optionData: [],
            isDeleteTicket: false,
            isSessionClosed: true
        }
    }
    //
    componentDidMount() {

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            //
            Orientation.lockToPortrait();
            //
            this.setState({
                isLoading: true
            }, () => {
                this.props.getHistoryDetailData({
                    reqData: {
                        "user_id": this.props.userData?.user_id,
                        "bnumber": this.props.route.params.Barcode
                    },
                    onSuccessResponse: (response => {
                        //
                        const tempData = []
                        this.state.masterPptionData.map((item, index) => {
                            for (const [key, value] of Object.entries(response[0])) {
                                if (item.title.toLowerCase() == key.toLowerCase() && value > 0) {
                                    item['value'] = value;
                                    tempData.push(item);
                                }
                            }
                        })
                        //
                        setTimeout(() => {
                            this.setState({
                                historyDetail: response[0],
                                optionData: tempData,
                                isLoading: false
                            })
                        }, 1000)
                        //
                    }),
                    onErrorResponse: (error => {
                        console.log(JSON.stringify(error));
                        this.setState({
                            historyDetail: {},
                            optionData: [],
                            isLoading: false
                        })
                    }),
                })

            })
        })


    }
    //
    canCelTicketData = () => {
        this.props.cancelTicketData({
            reqData: {
                "user_id": this.props.userData?.user_id,
                "bodyData": JSON.stringify({
                    "barcode": this.props.route.params.Barcode,
                    "date": new Date().toISOString().split("T")[0]
                })
            },
            onSuccessResponse: (response => {
                alert('Cancel Ticket successfully !')
                this.setState({
                    isDeleteTicket: false
                }, () => {
                    this.props.navigation.goBack()
                })
            }),
            onErrorResponse: (error => {
                this.setState({
                    isDeleteTicket: false
                })
                console.log(JSON.stringify(error));
            }),
        })
    }
    // startTimer = () => {
    //     //
    //     this.timer = setInterval(() => {
    //         this.setState((prevState) => {
    //             //
    //             const curretDate = new Date();
    //             const totalSeconds = ((5 - (curretDate.getMinutes() % 5)) * 60) - curretDate.getSeconds();
    //             //
    //             if (totalSeconds == 20) {
    //                 return { isSessionClosed: false };
    //             }
    //             return { remainingTime: totalSeconds, currentTime: curretDate.toLocaleTimeString('en-US', { hour12: true }) };
    //         });
    //     }, 1000);
    // };

    // stopTimer = () => {
    //     clearInterval(this.elapsedTimer);
    // };
    //
    static mapStateToProps = (state) => {
        return {
            userData: state.StackReducer.userData,
        }
    }
    //
    static mapDispatchToProps = {
        getHistoryDetailData: getHistoryDetailData,
        cancelTicketData: cancelTicketData
    }

}

export { HistoryDetailComponent };