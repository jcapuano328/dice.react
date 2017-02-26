import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Style from '../services/style';
import Dice from '../services/dice';
import Die6 from './die6Sided';
import Die10 from './die10Sided';
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

var DiceRoll = React.createClass({
    dice: null,
    onRoll(e) {
      this.dice.roll();
      this.props.onRoll && this.props.onRoll(this.dice.dice());
    },
    onDie(e) {
      let die = this.dice.dieEx(e);
      die.increment(true);
      this.props.onDie && this.props.onDie(e, die.value());
    },
    render() {
        this.dice = new Dice.Dice(this.props.dice);
        return (
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center', marginRight:2}}>
                {this.dice.map((die, i) => {
                    if (i<this.props.values.length) {
                        die.value(this.props.values[i]);
                    }
                    switch(die.sides()) {
                    case 9:
                    case 10:
                        return (
                            <View key={i} style={{flex:1}}>
                            <Die10 die={i+1} value={die.value()} size={this.props.size} color={die.color()} onPress={this.onDie} />
                            </View>
                        );
                    case 6:
                        return (
                            <View key={i} style={{flex:1}}>
                            <Die6 die={i+1} value={die.value()} size={this.props.size} color={die.color()} onPress={this.onDie} />
                            </View>
                        );
                    default:
                        return <View key={i} style={{flex:1}} />
                    }
                })}
                <View style={{flex:1.25}}>
                    <RollButton buttonColor={this.props.buttonColor} buttonBackgroundColor={this.props.buttonBackgroundColor}
                        direction={this.props.direction} onRoll={this.onRoll} />
                </View>
            </View>
        );
    }
});

module.exports = DiceRoll;
