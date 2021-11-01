import * as React from 'react';

import {View, Text, Button} from 'react-native';

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

const App = () => {
  return (
  <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center" }}>
    <View>
      <Text>webRTC</Text>
    </View>
    <RTCView />
    <View>
      <Text>view2</Text>
    </View>
    <View>
      <Text>view3</Text>
    </View>
    <Button
      title="Button1" />
    <Button
      title="Button2" />
   </View>
  );
};

export default App;