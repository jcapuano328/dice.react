import React from 'react';
import { View, Text } from 'react-native';

var DieFace = React.createClass({
    render() {
        let size = (this.props.size || 64) * .65;
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                <Text style={{fontSize: size, fontWeight: 'bold', fontFamily:'sans-serif-black', color: this.props.color || 'black', textAlign:'center', alignSelf:'center'}}>
                    {this.props.value.toString()}
                </Text>
            </View>
        );
    }
});

module.exports = DieFace;
