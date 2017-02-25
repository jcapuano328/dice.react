import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Dice from '../services/dice';
import Die6 from './die6Sided';
import Die10 from './die10Sided';

var DiceTray = React.createClass({    
    dice: null,
    onDie(e) {
      let die = this.dice.dieEx(e);
      die.increment(true);
      this.props.onDie && this.props.onDie(e, die.value());
    },
    render() {
        this.dice = new Dice.Dice(this.props.dice);
        let size = this.props.size;
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
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
            </View>
        );
    }
});

module.exports = DiceTray;
