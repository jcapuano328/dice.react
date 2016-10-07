'use strict'

var React = require('react');
import { View, Text, TouchableOpacity } from 'react-native';
var DieFaceDot = require('./dieFaceDot');
var DieFaceNumber = require('./dieFaceNumber');
var range = require('../services/range');

var Die = React.createClass({
    onPress() {
        this.props.onPress && this.props.onPress(this.props.die);
    },
    render() {
        let size = this.props.size || 64;
        let cell = size / 3;
        let diecolor = this.props.dieColor || this.props.color.die;
        let dotcolor = this.props.dotColor || this.props.color.dot;
        return (
            <TouchableOpacity onPress={this.onPress} style={{
                width: size,
                height: size,
                backgroundColor: diecolor,
                borderRadius: 2,
                borderColor: dotcolor == 'black' ? dotcolor : 'black',
                borderWidth: 1,
                //marginTop: 5,
                marginLeft: 5,
                marginRight: 5
            }}>
                {this.props.type == 'number' || this.props.value > 6 ? this.renderNumber(dotcolor) : this.renderDot(cell,dotcolor)}
            </TouchableOpacity>
        );
    },
    renderDot(size,dotcolor) {
        return (
            <View style={{flex: 1}}>
                {range(3).map((r,ri) =>
                    <View key={ri} style={{flex: 1, flexDirection: 'row'}}>
                        {range(3).map((c,ci) => <DieFaceDot key={ri+ci} value={this.props.value} color={dotcolor} size={size} row={ri} col={ci} />)}
                    </View>
                )}
            </View>
        );
    },
    renderNumber(dotcolor) {
        return (<DieFaceNumber value={this.props.value} color={dotcolor} />);
    }
});

module.exports = Die;
