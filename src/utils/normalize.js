import { Dimensions, Platform, PixelRatio } from 'react-native';
import Orientation from 'react-native-orientation-locker';
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

//const orientationListener = Orientation.addOrientationListener(handleOrientationChange);

export function normalize(size) {
  //
  const newSize = size * (Dimensions.get('window').width / 320)
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
}

//const handleOrientationChange = (orientation) => {
  
//};