import { useNavigation } from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { white } from '../assets/styles/Style';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState("Mobile");
  const [password, setPassword] = useState("111111");
  const {isLoading, login, userInfo} = useContext(AuthContext);
  
  
  const { navigate} = useNavigation();

  useEffect(() => {
    if(userInfo) {
      navigate('Home');
    }
  }, [userInfo]);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <SafeAreaView>
          <Image style={styles.logo} source={require('../assets/images/pictures/slogan.jpg')} />  
        </SafeAreaView>
        <TextInput
          style={styles.input}
          value={username}
          placeholder="Enter username"
          onChangeText={text => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button
          title="Login"
          onPress={() => {
            login(username, password);
          }}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20
  }
});

export default LoginScreen;
