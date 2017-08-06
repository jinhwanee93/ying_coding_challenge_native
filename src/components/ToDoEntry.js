import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

function ToDoEntry(props) {
  console.log('what is the props? ', props)
    return (
      <View>
        <Text>{props.entry}</Text>
        <Text>{props.isCompleted}</Text>
        <Text>{props.createdAt}</Text>
      </View>    
    )
};

export default ToDoEntry;