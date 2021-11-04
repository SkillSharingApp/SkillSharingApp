// import React from "react";
// import {View, Text} from 'react-native';


// export default CallScreen = ({ route, navigation }) => {
//     return <Text>Welcome to CallView</Text>;
// }

import React, {useState, useEffect} from 'react';
import PipView from './components/PipView';
import firestore from '@react-native-firebase/firestore';


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
  registerGlobals,
  RTCSessionDescriptionType
} from 'react-native-webrtc';

// remove this when this is turned into a separate screen
const props = {
  isInstructor: !true,
  classId: 1
};

const App = () => {
  // set instructorStream and studentStream states and handlers
  const [instructorStream, setInstructorStream] = useState(null);
  const [studentStream, setStudentStream] = useState(null);
  const [mirrorView, setMirrorView] = useState(false);
  const [teacherJoined, setTeacherJoined] = useState(false);
  const [studentJoined, setStudentJoined] = useState(false);

  //Firebase connection logic
  const classSignals = firestore().collection('classes').doc(`${props.classId}`);
  classSignals.get().then(data => console.log(data))
  
  // if user is teacher, set teacherJoined to true otherwise make studentJoined true
  useEffect( () => {
    if (!props.isInstructor) {
      if (!studentJoined) setStudentJoined(true);
      classSignals.onSnapshot( (snapshot) => {
        // let offer = await snapshot.get({fieldPath: 'teacherOffer'});
        console.log(JSON.stringify(Reflect.ownKeys(snapshot), null, 2))
        // console.log(Reflect.ownKeys(offer))
        // console.log(Reflect.ownKeys(snapshot));
        // console.log(Reflect.getPrototypeOf(snapshot).constructor);
        // if (offer !== '') {
        //   setTeacherJoined(true);
        // }
      }, err => console.error(err));
    }
    if (props.isInstructor && !teacherJoined) setTeacherJoined(true);
  }, [])
  

  // webRTC connection logic
  const configuration = {
  iceservers: [
    {urls: 'stun:stun.l.google.com:19302'},
    {urls: 'stun:stun1.l.google.com:19302'},
    {urls: 'stun:stun2.l.google.com:19302'}
    ]
  };

  const pc = new RTCPeerConnection(configuration);

  const mirrorPress = () => props.isInstructor && setMirrorView(!mirrorView);

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

  const startButtonPress = async () => {
    try {
      // get access to cam and mic
      let stream = await mediaDevices.getUserMedia({ video: true, audio: true });
      // props.isInstructor ? setInstructorStream(stream) : setStudentStream(stream);

      // instructor side code
      if (props.isInstructor) {
        // set instructor stream
        setInstructorStream(stream);
        pc.createOffer()
        .then(desc => {
          pc.setLocalDescription(desc)
          .then(() => {
            // post offer to Firebase
            classSignals.update({
            teacherOffer: pc.localDescription});
          })
        })
      } else {
        // student side code
        setStudentStream(stream);
        let teacherOffer = await classSignals.get('teacherOffer');
        await pc.setRemoteDescription(new RTCSessionDescription(teacherOffer));
        const studentAnswer = await pc.createAnswer();
        await pc.setLocalDescription(studentAnswer);
        await classSignals.update({studentAnswer : pc.localDescription});
      }


    } catch (err) {
      console.error(err);
    }
  }

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
    {!instructorStream && <Text style={{color: "black"}}>Waiting for instructor to join...</Text>}
    {instructorStream && <RTCView streamURL = {instructorStream.toURL()} mirror = {mirrorView} zOrder = {5}  style={styles.instructorStream} key={'instructorView'} />}
    <PipView stream = {studentStream || instructorStream} />
    </View>
    <View>
      {props.isInstructor && <Button title = 'Mirror' onPress = {mirrorPress} />}
      {/* <Button title = 'Start' disabled = {!teacherJoined} onPress = {startInstructorStream} /> */}
      <Button title = 'Start' disabled = {!teacherJoined} onPress = {startButtonPress} />
      <Button title = 'Stop' disabled = {!teacherJoined} onPress = {stopInstructorStream} /> 
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'pink',
    ...StyleSheet.absoluteFill
  },
  instructorStream: {
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

export default CallScreen;