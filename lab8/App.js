import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const DATA = [
  {
    id: '1',
    title: 'First Item',
    author: 'Jane Doe',
  },
  {
    id: '2',
    title: 'Second Item',
    author: 'Mark Sloan',
  },
  {
    id: '3',
    title: 'Third Item',
    author: 'Dan Brown',
  },
  {
    id: '4',
    title: 'Fourth Item',
    author: 'Nick Lee',
  },
];

function Item({ title, author, backgroundColor, textColor, onPress }) {
  return (
    <TouchableOpacity style={[styles.item, backgroundColor]} onPress={onPress}>
      <Text style={[styles.title, textColor]}>{title}</Text>
      <Text style={[styles.author, textColor]}>{author}</Text>
    </TouchableOpacity>
  );
}

// <Item title={DATA[0].title} author={DATA[0].author}/>
// <Item title={DATA[1].title} author={DATA[1].author}/>
export default function App() {
  const [listData, setListData] = React.useState(DATA);
  const [refreshCnt, setRefresh] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Add"
        onPress={() => {
          DATA.push({
            id: (Math.random() * 100).toString(),
            author: 'Auth' + (Math.random() * 100).toString().substr(5),
            title: 'Auto' + (Math.random() * 100).toString().substr(5),
          });
          setListData(DATA);
          setRefresh(refreshCnt + 1);
        }}
      />

      <FlatList
        data={listData}
        renderItem={({ item }) => {
          const backgroundColor =
            item.id === selectedId ? '#800000' : '#D2B48C';
          const color = item.id === selectedId ? 'white' : 'black';
          return (
            <Item
              title={item.title}
              author={item.author}
              onPress={() => setSelectedId(item.id)}
              backgroundColor={{ backgroundColor }}
              textColor={{ color }}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        extraData={listData}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  item: {
    margin: 24,
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: { fontSize: 20 },
  author: { fontSize: 20 },
});
