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
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const DATA = [
  {
    id: '1',
    username: 'First Item',
    name: 'Jane Doe',
  },
  {
    id: '2',
    username: 'Second Item',
    name: 'Mark Sloan',
  },
  {
    id: '3',
    username: 'Third Item',
    name: 'Dan Brown',
  },
  {
    id: '4',
    username: 'Fourth Item',
    name: 'Nick Lee',
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

function HomeScreen(navigation) {
  const [refresh, setRefresh] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [list, setData] = React.useState(DATA);

  const getUsers = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getUsers(), [];
  });

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={list}
          renderItem={({ item }) => {
            const backgroundColor =
              item.id === selectedId ? '#800000' : '#D2B48C';
            const color = item.id === selectedId ? 'white' : 'black';

            return (
              <Item
                title={item.username}
                author={item.name}
                onPress={() => navigation.navigate('Details', { item })}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          extraData={refresh}
        />
      )}
    </SafeAreaView>
  );
}

function DetailsScreen(navigation, route) {
  return (
    <>
      <Text>{route,params.item.name}</Text>
      <Text>{route,params.item.username}</Text>
      <Text>{route,params.item.email}</Text>
      <Text>{route,params.item.phone}</Text>
    </>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
