import React from 'react';
import { View } from 'react-native';
import {Range} from 'react-native-nub';
import Dice from '../services/dice';
import Die6 from './die6Sided';
import Die10 from './die10Sided';

var DiceTray = React.createClass({    
    onDie(e) {
      this.props.onDie && this.props.onDie(e);
    },
    render() {
        let perrow = this.props.perrow || 5;//Math.ceil(this.props.dice.count() / rows);
        let rows = this.props.rows || Math.ceil(this.props.dice.count() / perrow);            
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {Range(rows).map((r,i) => {
                    return (
                        <View key={r} style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            {Range(perrow).map((c,j) => {                                
                                let idx = (i*perrow)+j;  
                                let die = this.props.dice.dieEx(idx+1);
                                if (die == null) {
                                    return <View key={idx+1} style={{flex:1}} />
                                }								
                                if (idx<this.props.values.length) {
                                    die.value(this.props.values[idx]);
                                }
                                switch(die.sides()) {
                                case 9:
                                case 10:
                                    return (
                                        <View key={idx+1} style={{flex:1, alignItems: 'center'}}>
                                        <Die10 die={idx+1} value={die.value()} size={this.props.size} color={die.color()} onPress={this.onDie} />
                                        </View>
                                    );
                                case 6:
                                    return (
                                        <View key={idx+1} style={{flex:1, alignItems: 'center'}}>
                                        <Die6 die={idx+1} value={die.value()} size={this.props.size} color={die.color()} onPress={this.onDie} />
                                        </View>
                                    );
                                default:
                                    return <View key={idx+1} style={{flex:1}} />
                                }                    
                            })}
                        </View>
                    );
                })}
            </View>                
        );
    }
});

module.exports = DiceTray;
