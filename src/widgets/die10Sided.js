'use strict'

var React = require('react');
import { View, TouchableOpacity } from 'react-native';
var DieFaceNumber = require('./dieFaceNumber');
var range = require('../services/range');

var Die = React.createClass({
    onPress() {
        this.props.onPress && this.props.onPress(this.props.die);
    },
    render() {
        let size = this.props.size || 64;
        let cell = size / 3;
        let diecolor = this.props.dieColor || this.props.diecolor || this.props.color.die;
        let dotcolor = this.props.dotColor || this.props.dotcolor || this.props.color.dot;
        return (
            <TouchableOpacity onPress={this.onPress} style={{
                width: size,
                height: size,
                backgroundColor: 'transparent',
                marginLeft: 5,
                marginRight: 5
            }}>
                <View style={{
                    borderTopWidth: 0,
                    borderTopColor: 'transparent',
                    borderLeftColor: 'transparent',
                    borderLeftWidth: size*.5,
                    borderRightColor: 'transparent',
                    borderRightWidth: size*.5,
                    borderBottomColor: diecolor,
                    borderBottomWidth: size*.75,
                }}/>
                <View style={{
                    width: size,
                    height: 0,
                    borderTopWidth: size*.25,
                    borderTopColor: diecolor,
                    borderLeftColor: 'transparent',
                    borderLeftWidth: size*.5,
                    borderRightColor: 'transparent',
                    borderRightWidth: size*.5,
                    borderBottomColor: 'transparent',
                    borderBottomWidth: 0,
                }}/>
                <View style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 2,
                    left: 0
                }}>
                    <DieFaceNumber value={this.props.value} size={size} color={dotcolor} />
                </View>
            </TouchableOpacity>
        );
    }
});

module.exports = Die;
