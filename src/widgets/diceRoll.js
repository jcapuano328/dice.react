'use strict'

var React = require('react');
import { View, Text, TouchableOpacity } from 'react-native';
var Dice = require('../services/dice');
var Die6 = require('./die6Sided');
var Die10 = require('./die10Sided');

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
                    switch(die.sides()) {
                    case 9:
                    case 10:
                        return <Die10 key={i} die={i+1} value={die.value()} size={size} color={die.color()} onPress={this.onDie} />
                    case 6:
                    default:
                        return <Die6 key={i} die={i+1} value={die.value()} size={size} color={die.color()} onPress={this.onDie} />
                    }
                })}
                <View style={{marginRight: 5, justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this.onRoll} style={{
                        //flex: 1,
                        //flexDirection: 'row',
                        justifyContent: 'center',
                        width: size*1.25,
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
