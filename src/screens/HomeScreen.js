import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, Button, StyleSheet, Text, TextInput, View, FlatList, PermissionsAndroid, TouchableWithoutFeedback } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Geolocation from 'react-native-geolocation-service';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
// import Geolocation from '@react-native-community/geolocation';


const HomeScreen = ({ navigation }) => {
  const { userInfo, isLoading, logout, getDisInfo } = useContext(AuthContext);
  const { disInfo } = useContext(AuthContext);
  const { getDetailDisInfo } = useContext(AuthContext);
  const [keyword, setPwdCode] = useState("");
  const { navigate } = useNavigation();

  // state to hold location
  const [curLatitude, setCurLattitude] = useState('');
  const [curLongitude, setCurLongitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');

  const [isViewDetail, setIsViewDetail] = useState(false);



  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('granted', granted);
        if (granted === 'granted') {
          console.log('You can use Geolocation');
          getOneTimeLocation();
          subscribeLocationLocation();
          //return true;
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      } catch (err) {
        // return false;
        console.warn(err);
      }
    };
    requestLocationPermission();
    return () => {
      // Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting location ...');
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('You are Here: ');
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurLongitude(currentLongitude);
        setCurLattitude(currentLatitude);
      }, (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus('You are Here');
        // console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurLongitude(currentLongitude);
        setCurLattitude(currentLatitude);
      }, (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  const rowPress = (id) => {   
    getDetailDisInfo(id);
    navigation.navigate('Detail', { disId: id, curLatitude, curLongitude });
  }

  const renderItem = (itemData) => {
    return (
      <TouchableWithoutFeedback onPress={() => rowPress(itemData.item.id)}>
        <View style={styles.containerFlate}>
          <View style={styles.innerContainer}>
            {/* <Text style={styles.title}>Id : {itemData.item.id}</Text> */}
            <Text style={styles.title}>Code : {itemData.item.maSo}</Text>
            <Text style={styles.title}>Name : {itemData.item.fullName}</Text>
            <Text style={styles.title}>Address : {itemData.item.address}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback  >
    );
  }

  const ListHeader = () => {
    //View to set in Header
    return (
      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>
          List disinfo
        </Text>
      </View>
    );
  };

  const EmptyListMessage = ({ item }) => {
    return (
      // Flat List Item
      <Text
        style={styles.emptyListStyle}>
        No Data Found
      </Text>
    );
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginTop: 3,
          marginBottom: 3
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <Text style={styles.userHeader} >User Information</Text>
        <Text style={styles.userInfo} >UserID: {userInfo.id} - UserName: {userInfo.username}</Text>
        <Text style={styles.userInfo} >Email: {userInfo.email}</Text>
        <Text style={styles.link} >{locationStatus} {curLatitude} {curLongitude}</Text>
        <TouchableOpacity onPress={() => {
          logout();
          navigate('Login');
        }}>
          <Text style={styles.link}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.separator}></Text>

        <TextInput
          style={styles.input}
          value={keyword}
          placeholder="Enter code"
          onChangeText={text => setPwdCode(text)}
        />


        <Button title="Search" onPress={() => {
          getDisInfo(keyword);
        }} />

        <FlatList
          data={disInfo}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // ListHeaderComponent={ListHeader}
          ListEmptyComponent={EmptyListMessage}
          ItemSeparatorComponent={renderSeparator}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
  wrapper: {
    width: '90%',
    flexDirection: 'column'
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  title: {
    // fontWeight: 'bold',
    fontSize: 14,
  },
  card: {
    width: '90%'
  },
  emptyListStyle: {
    textAlign: 'center',
  },
  headerFooterStyle: {
    width: '100%',
    height: 45,
    backgroundColor: '#606070',
  },
  userHeader: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  userInfo: {
    fontSize: 14,
  },
  separator: {
  },
  link: {
    color: 'blue',
  },
});

export default HomeScreen;
