import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {Range} from 'react-native-nub';
import DieFaceDot from './dieFaceDot';

var Die = React.createClass({
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
        if (this.state.width != e.nativeEvent.layout.width /*||
            this.state.height != e.nativeEvent.layout.height*/) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },
    onPress() {
        this.props.onPress && this.props.onPress(this.props.die);
    },
    render() {
        let size = this.props.size || Math.min(this.state.height, this.state.width) || 32;
        size *= 0.98; // shrink a bit
        let cell = size / 3;
        let diecolor = this.props.dieColor || this.props.color.die;
        let dotcolor = this.props.dotColor || this.props.color.dot;
        return (
            <View style={{flex: 1, marginLeft: 1, marginRight: 1}} onLayout={this.onLayout}>
                <TouchableOpacity onPress={this.onPress} style={{
                    width: size,
                    height: size,
                    backgroundColor: diecolor,
                    borderRadius: 5,
                    borderColor: dotcolor == 'black' ? dotcolor : 'black',
                    borderWidth: 1,
                    //marginTop: 5,
                    //marginLeft: 5,
                    //marginRight: 5
                }}>
                        {Range(3).map((r,ri) =>
                        <View key={ri} style={{flex: 1, flexDirection: 'row'}}>
                            {Range(3).map((c,ci) => <DieFaceDot key={ri+ci} value={this.props.value} color={dotcolor} size={cell} row={ri} col={ci} />)}
                        </View>
                    )}
                </TouchableOpacity>
            </View>

        );
    }
});

module.exports = Die;
