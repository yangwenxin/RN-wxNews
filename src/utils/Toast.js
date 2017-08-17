import Toast from 'react-native-root-toast';
import {pxToDp} from "./ScreenUtil";

export default (content, options) => {
  let toast = Toast.show(content, {
    duration: Toast.durations.SHORT,
    position: pxToDp(-180),
    shadow: false,
    textColor: '#fff',
    animation: true,
    hideOnPress: true,
    delay: 0,
    ...options
  });
  toast.hide = () => {
    Toast.hide(toast);
  }
  return toast;
}