'use strict'

var React = require('react');
import { View, Text, TouchableOpacity } from 'react-native';
var Button = require('apsl-react-native-button');
var Dice = require('../services/dice');
var DieButton = require('./die');

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
        let size = this.props.size || 64;
        this.dice = new Dice.Dice(this.props.dice);
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                {this.dice.map((die, i) => {
                    if (i<this.props.values.length) {
                        die.value(this.props.values[i]);
                    }
                    return (
                        <View key={i} style={{flex:1}}>
                            <DieButton die={i+1} value={die.value()} size={size} color={die.color()} onPress={this.onDie} />
                        </View>
                    );
                })}
                <View style={{flex:1, marginRight: 5, justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this.onRoll} style={{
                        //flex: 1,
                        //flexDirection: 'row',
                        justifyContent: 'center',
                        //width: size,
                        height: size,
                        backgroundColor: this.props.buttonBackgroundColor || '#3F51B5',
                        borderRadius: 10,
                        borderColor: 'black',
                        borderWidth: 1,
                        //marginTop: 5,
                        //marginLeft: 5,
                        //marginRight: 5
                    }}>
                        <Text style={{fontSize: 18,color: this.props.buttonColor || '#FFF', alignSelf: 'center', textAlign: 'center'}}>Roll</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
});

module.exports = DiceRoll;
