import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [disInfo, setDisInfo] = useState([]);
  const [homeVisit, setHomeVisit] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [isViewDetail, setIsViewDetail] = useState(false);

  const [supportId, setSupportId] = useState(0);
  const [endAt, setEndAt] = useState(0);
  const [isDone, setIsDone] = useState(-1);


  const register = (name, email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/auth/signup`, {
        name,
        email,
        password,
      })
      .then(res => {
        let retval = res.data;
        if (retval.code == "00000") {
          setUserInfo(retval);
          AsyncStorage.setItem('userInfo', JSON.stringify(retval));
        } else {
          Alert.alert(retval.message);
        }
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (username, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/auth/signin`, {
        username,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        if (userInfo.code == "99999") {
          Alert.alert(userInfo.message);
        } else {
          console.log(userInfo);
          setUserInfo(userInfo);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`signin login error ${e}`);
        // Alert.alert('error');
        setIsLoading(false);
      });
  };

  const getDisInfo = (keyword) => {
    setIsLoading(true);
    setIsViewDetail(false);
    axios
      .get(
        `${BASE_URL}/auth/dis-info?pwdCode=` + keyword,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        },
      )
      .then(res => {
        let dis = res.data;
        // console.log(dis);
        setDisInfo(dis.data);
        AsyncStorage.setItem('disInfo', JSON.stringify(dis));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`getDisInfo error ${e}`);
        setIsLoading(false);
      });
  };

  const getDetailDisInfo = (disId) => {
    setIsLoading(true);
    axios
      .get(
        `${BASE_URL}/auth/get-dis-info?disId=` + disId,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        },
      )
      .then(res => {
        let dis = res.data;       
        setDisInfo(dis);        
        AsyncStorage.setItem('disInfo', JSON.stringify(dis));       
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`getDetailDisInfo error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo(null);
        setDisInfo([]);
        setHomeVisit([]);
        setSupportId(0);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  const addHomeVisit = (visitId, supportId, disId, userId, latitude, longitude, mtieuGdinh, mtieuDtri, reson) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/auth/add-home-visit`, {
        visitId,
        supportId,
        disId,
        userId,
        latitude,
        longitude,
        mtieuGdinh,
        mtieuDtri,
        reson,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.accessToken}` },
      },)
      .then(res => {
        let retval = res.data;
        AsyncStorage.setItem('homeVisit', JSON.stringify(retval));
        setHomeVisit(retval);
        console.log('addHomeVisit '+retval.endAt);
        setSupportId(retval.supportId);
        setEndAt(retval.supportId==0?retval.endAt:"-1");       
        setIsLoading(false);
      })
      .catch(e => {        
        console.log(`addHomeVisit error ${e}`);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    isLoggedIn();
    getDisInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        disInfo,
        homeVisit,
        splashLoading,
        isViewDetail,
        supportId,
        isDone,
        register,
        login,
        logout,
        getDisInfo,
        getDetailDisInfo,
        addHomeVisit
      }}>
      {children}
    </AuthContext.Provider>
  );
};
