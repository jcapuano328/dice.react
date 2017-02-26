import {PixelRatio,Dimensions} from 'react-native';

let scale = () => {
    //let dimensions = Dimensions.get('window');
    //console.log('Dimensions', dimensions);
    //return dimensions.fontScale;
    let ratio = PixelRatio.get();
    //console.log('PixelRatio', ratio);
    let factor = 1.0;
    if (ratio == 1) {
        factor = 2;
    } else if (ratio > 1 && ratio <= 1.5) {
        factor = 1.5;
    } else if (ratio > 1.5 && ratio <= 2) {
        factor = 1;
    } else if (ratio > 2 && ratio <= 2.5) {
        factor = 0.75;
    } else if (ratio > 2.5 && ratio <= 3) {
        factor = 0.5;
    } else if (ratio > 3 && ratio <= 3.5) {
        factor = 0.25;
    } else if (ratio > 3.5) {
        factor = 0.1;
    }
    return factor;
}
let scaled = (size) => {
    return size * scale();
}

module.exports = {
    Font: {
        xtrasmall() {
            return scaled(6);
        },
        small() {
            return scaled(8);
        },
        smallmedium() {
            return scaled(10);
        },
        medium() {
            return scaled(12);
        },
        mediumlarge() {
            return scaled(14);
        },
        large() {
            return scaled(18);
        },
        xtralarge() {
            return scaled(22);
        }
    },
    Padding: {
        pad(size) {
            return scaled(size);
        }
    }
}
