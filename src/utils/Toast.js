import Toast from 'react-native-root-toast';

export default (content, options) => {
  let toast = Toast.show(content, {
    duration: Toast.durations.SHORT,
    position: 0,
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