'use strict'

var React = require('react');
import { View, Text } from 'react-native';

var DieFace = React.createClass({
    render() {
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                <Text style={{fontSize: 48, fontWeight: 'bold', fontFamily:'sans-serif-black', color: this.props.color || 'black', textAlign:'center', alignSelf:'center'}}>
                    {this.props.value.toString()}
                </Text>
            </View>
        );
    }
});

module.exports = DieFace;
