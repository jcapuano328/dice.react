import React from 'react';
import { View, Text } from 'react-native';

let dotmatrix = {
    upperleft: {row: 0, col: 0},
    middleleft: {row: 1, col: 0},
    lowerleft: {row: 2, col: 0},
    middle: {row: 1, col: 1},
    upperright: {row: 0, col: 2},
    middleright: {row: 1, col: 2},
    lowerright: {row: 2, col: 2}
};
let dots = {
    1: [dotmatrix.middle],
    2: [dotmatrix.upperleft,dotmatrix.lowerright],
    3: [dotmatrix.upperleft,dotmatrix.middle,dotmatrix.lowerright],
    4: [dotmatrix.upperleft,dotmatrix.lowerleft,dotmatrix.upperright,dotmatrix.lowerright],
    5: [dotmatrix.upperleft,dotmatrix.lowerleft,dotmatrix.middle,dotmatrix.upperright,dotmatrix.lowerright],
    6: [dotmatrix.upperleft,dotmatrix.middleleft,dotmatrix.lowerleft,dotmatrix.upperright,dotmatrix.middleright,dotmatrix.lowerright]
};

var Dot = React.createClass({
    render() {
        let dotsize = this.props.size * 0.66;
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{
                    width: dotsize,
                    height: dotsize,
                    borderRadius: dotsize/2,
                    backgroundColor: this.props.color
                }}/>
            </View>
        );
    }
});

var DieFace = React.createClass({
    render() {
        let size = this.props.size || (64 / 3);
        if (this.renderDot(this.props.row,this.props.col,this.props.value)) {
            return <Dot color={this.props.color} size={size} />
        }

        return <View style={{flex:1}}><Text>{' '}</Text></View>
    },
    renderDot(row,col,value) {
        return (dots[value] || []).some((d) => d.row == row && d.col == col);
    },
});

module.exports = DieFace;
