import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';

const DetailScreen = ({route}) => {
  const { isLoading, endAt, supportId, addHomeVisit } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
  const { disInfo } = useContext(AuthContext);
  const { homeVisit } = useContext(AuthContext);
  
  const { disId } = route.params;
  const { curLatitude } = route.params;
  const { curLongitude } = route.params;

  const [mtieuGdinh, setMTieuGdinh] = useState("");
  const [mtieuDtri, setMtieuDtri] = useState("");
  const [ctVltl, setCtVltl] = useState("");
  const [ctHdtl, setCtHdtl] = useState("");
  const [ctAntl, setCtAntl] = useState("");
  const [ctGddb, setCtGddb] = useState("");

  const [reson, setReson] = useState("");
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <Text style={styles.link} >{userInfo.username}</Text>
        <Text>Dis code: {disInfo.disNum}</Text>
        <Text>Fullname: {disInfo.disFullName}</Text>
        <Text>ID number: {disInfo.disNumID}</Text>
        <Text>Sex: {disInfo.disSex}</Text>
        <Text>Brithday: {disInfo.disBirthDay}</Text>
        <Text>Last update date: {disInfo.disLastUpdate}</Text>
        <Text style={styles.separator}></Text>
        <Text>Start at: {homeVisit.startAt}</Text>
        <Text>End at: {homeVisit.endAt}</Text>
        <Text style={styles.separator}></Text>

        {/* <Text>Latitude: {curLatitude}</Text>
        <Text>Longitude: {curLongitude}</Text> */}
        {supportId==0 ?null: <TextInput
          style={styles.input}
          value={mtieuGdinh}
          placeholder="Enter info"
          onChangeText={text => setMTieuGdinh(text)}
        />}
        {supportId==0 ?null: <TextInput
          style={styles.input}
          value={mtieuDtri}
          placeholder="Enter info"
          onChangeText={text => setMtieuDtri(text)}
        />}
        {supportId==0 ?null: <TextInput
          style={styles.input}
          value={reson}
          placeholder="Enter info"
          onChangeText={text => setReson(text)}
        />}
       
        {endAt=="null"?null:
        <Button
          title={supportId==0?'Add Home Visit':'Update Home Visit'}
          onPress={() => {
            addHomeVisit(homeVisit.visitId, supportId, disId, 
              userInfo.id, curLatitude, curLongitude, mtieuGdinh, mtieuDtri, reson);
          }}          
        />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '90%',
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
});

export default DetailScreen;
