import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {RTCView} from 'react-native-webrtc';

export default PipView = (props) => {
  return (
    <View style={
      {
        position: 'absolute',
        backgroundColor: 'black',
        width: '20%',
        height: '20%',
        zIndex: 10
      }
    }>
      {props.stream && <RTCView streamURL = {props.stream} style={{height:'100%', zOrder:20, flex: 1}} />}
    </View>
  )
}