import {StyleSheet} from 'react-native';

const primaryColor = '#6F3A00';
const secondaryColor = '#00689E';
const white = '#FFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export {styles, primaryColor, secondaryColor, white};