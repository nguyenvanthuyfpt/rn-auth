import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useContext } from 'react';
import {ActivityIndicator, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const SplashScreen = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);
  const { navigate } = useNavigation();

  useEffect(() => {
    if(!splashLoading){
      if(userInfo.access_token) {
        navigate('Home')
      } else {
        navigate('Login')
      }}
  }, [splashLoading]);

  return (
    <View
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#06bcee'}}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

export default SplashScreen;
