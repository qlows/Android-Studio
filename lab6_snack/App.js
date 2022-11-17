import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  const [val, onChangeText] = React.useState('Enter text here');

  return (
    <SafeAreaView style={styles.container}>
      <Text>Umit Kilinc</Text>
      <Text>101232721</Text>
      <TextInput
        onChangeText={(text) => {
          onChangeText(text);
        }}
        onFocus={() => {
          onChangeText('');
        }}
        value={val}></TextInput>
      <Text>{val}</Text>
      <Button
        title="Clear"
        onPress={() => {
          onChangeText('');
        }}></Button>
      <TextInput></TextInput>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'tan',
    padding: 8,
  },
});
