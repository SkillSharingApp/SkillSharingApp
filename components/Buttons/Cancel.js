import React from "react";
import { Button, Alert } from 'react-native';

export default CancelButton = () =>{
    //pass props from skill data required for the DB delete request
    const confirmCancel = () =>{
        Alert.alert(
            "Are you sure?",
            "If you cancel, you will have to rebook if you'd like to take this class again",
            [
              {
                text: "Cancel Class",
                onPress: () => {
                    //we can put logic for actually deleting from DB here!
                },
                style: "cancel"
              },
              { text: "I changed my mind..." }
            ]
          );
    }

    return (
        <Button 
            //style={}
            title="Cancel Class"
            onPress= {confirmCancel}/>
    )
}