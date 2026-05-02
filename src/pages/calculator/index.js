import React from "react";
import { View ,Text} from "react-native";
import { CalculatorComponent } from "./calculatorComponent";
import { connect } from "react-redux";
import colors from "../../assets/appColor/colors";
import HeaderComponent from "../../hoc/headerComponent";
import HOCComponent from "../../hoc/hocComponent";
import fonts from "../../assets/fonts/fonts";
import { normalize } from "../../utils/normalize";
//
const HeaderComponents = HeaderComponent(View)
const HOCComponents = HOCComponent(HeaderComponents);
//
class Calculator extends CalculatorComponent {

    render() {
        return (
            <HOCComponents title="Calculator">
                <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                   

                </View>
            </HOCComponents>
        )
    }
}

export default connect(CalculatorComponent.mapStateToProps, CalculatorComponent.mapDispatchToProps)(Calculator);