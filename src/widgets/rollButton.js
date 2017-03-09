import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import {Style} from 'react-native-nub';
var DiceRollIcon = require('../resources/dicecup.png');

var RollButton = React.createClass({
    getInitialState() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width ||
            this.state.height != e.nativeEvent.layout.height) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },
    render() {
        let width = (this.state.width*0.9) || 32;
        let height = (this.state.height*0.9) || 32;

        let paddingLeft = this.props.direction == 'vertical' ? 45 : 15;
        let paddingRight = this.props.direction == 'vertical' ? 45 : 15;
        return (
            <TouchableOpacity onPress={this.props.onRoll} style={{
                justifyContent: 'center',
                backgroundColor: this.props.buttonBackgroundColor || 'silver',//'#3F51B5',
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 1,
                paddingTop: Style.Padding.pad(15),
                paddingLeft: Style.Padding.pad(paddingLeft),
                paddingRight: Style.Padding.pad(paddingRight),
                paddingBottom: Style.Padding.pad(15)
            }} onLayout={this.onLayout}>
                {/*<Text style={{fontSize: Style.Font.medium(),color: this.props.buttonColor || '#FFF', alignSelf: 'center', textAlign: 'center'}}>Roll</Text>*/}
                <Image
                    style={{width: width, height: height, resizeMode: 'contain', alignSelf: 'center'}}
                    source={DiceRollIcon} />

            </TouchableOpacity>
        );
    }
});

module.exports = RollButton;