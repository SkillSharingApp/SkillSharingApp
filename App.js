import React, {useState, useEffect} from 'react';


import {
  View,
  Text,
  Button,
  StatusBar,
  StyleSheet
} from 'react-native';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const props = {

};

const App = (props) => {
  // set instructorStream and studentStream states and handlers
  const [instructorStream, setInstructorStream] = useState(null);
  const [studentStream, setStudentStream] = useState(null);

  // functions to start and stop instructor stream
  const startInstructorStream = async () => {
    if (!instructorStream) {
      try {
        let mediaStream = await mediaDevices.getUserMedia({ video: true, audio: true });
        setInstructorStream(mediaStream);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const stopInstructorStream = () => {
    if (instructorStream) {
      instructorStream.release();
      setInstructorStream(null);
    }
  };

  useEffect(() => {
    console.log(!!instructorStream);
  }, [instructorStream])


  return (
  // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  <View style={styles.body}>
    <StatusBar barStyle="dark-content" />
    <View style={{
    height: '75%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue'
    }}>
    {instructorStream ? <RTCView streamURL = {instructorStream.toURL()} style={styles.stream} />
     : <Text style={{color: "black"}}>Waiting for connection...</Text>}
    </View>
    <View>
      <Button title = "Start" onPress = {startInstructorStream} />
      <Button title = "Stop" onPress = {stopInstructorStream} /> 
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'pink',
    ...StyleSheet.absoluteFill
  },
  stream: {
    flex: 1,
    height: '100%'
  },
  footer: {
    backgroundColor: 'lightgray',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default App;