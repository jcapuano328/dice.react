import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Dice from '../services/dice';
import Die6 from './die6Sided';
import Die10 from './die10Sided';

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
        let dir = this.props.direction == 'vertical' ? 'column' : 'row';
        this.dice = new Dice.Dice(this.props.dice);
        return (
            <View style={{flex:1, flexDirection: dir, justifyContent: 'center', alignItems: 'center'}}>
                {this.renderDice(size)}
                {this.renderButton(size)}
            </View>
        );
    },
    renderDice(size) {
        return (
            <View style={{flex: this.props.direction == 'vertical' ? 1 : 6, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                {this.dice.map((die, i) => {
                    if (i<this.props.values.length) {
                        die.value(this.props.values[i]);
                    }
                    switch(die.sides()) {
                    case 9:
                    case 10:
                        return (
                            <Die10 key={i} die={i+1} value={die.value()} size={size} color={die.color()} onPress={this.onDie} />
                        );
                    case 6:
                    default:
                        return (
                            <Die6 key={i} die={i+1} value={die.value()} size={size} color={die.color()} onPress={this.onDie} />
                        );
                    }
                })}
            </View>
        );
    },    
    renderButton(size) {
        let paddingLeft = this.props.direction == 'vertical' ? 30 : 10;
        let paddingRight = this.props.direction == 'vertical' ? 30 : 10;
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <TouchableOpacity onPress={this.onRoll} style={{
                    //flex: 1,
                    //flexDirection: 'row',
                    justifyContent: 'center',
                    //width: size*1.25,
                    //height: size,
                    backgroundColor: this.props.buttonBackgroundColor || '#3F51B5',
                    borderRadius: 10,
                    borderColor: 'black',
                    borderWidth: 1,
                    paddingTop: 10,
                    paddingLeft: paddingLeft,
                    paddingRight: paddingRight,
                    paddingBottom: 10
                    //marginTop: 5,
                    //marginLeft: 5,
                    //marginRight: 5
                }}>
                    <Text style={{/*fontSize: 18,*/color: this.props.buttonColor || '#FFF', alignSelf: 'center', textAlign: 'center'}}>Roll</Text>
                </TouchableOpacity>
            </View>
        );     
    }
});

module.exports = DiceRoll;
