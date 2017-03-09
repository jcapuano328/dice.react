import React from 'react';
import { View } from 'react-native';
import {Style} from 'react-native-nub';
import Dice from '../services/dice';
import Die6 from './die6Sided';
import Die10 from './die10Sided';
import RollButton from './rollButton';

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
