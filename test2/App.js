import * as React from 'react';
import {
  Text,
  Test,
  StyleSheet,
  SafeAreaView,
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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

const ALBUM_DATA = [
  {
    userId: '1',
    id: '1',
    title: 'quidem molestiae enim',
  },
  {
    userId: '1',
    id: '2',
    title: 'sunt qui excepturi placeat culpa',
  },
  {
    userId: '1',
    id: '3',
    title: 'omnis laborum odio',
  },
  {
    userId: '1',
    id: '4',
    title: 'non esse culpa molestiae omnis sed optio',
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

function HomeScreen({ navigation }) {
  const [selectedId, setSelectedId] = React.useState(null);
  const [refresh, setRefresh] = React.useState(0);
  const [isLoading, setLoading] = React.useState(true);
  const [list, setData] = React.useState(DATA);
  const [albumList, setAlbumData] = React.useState(ALBUM_DATA);

  const getAlbums = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/albums'
      );
      const json = await response.json();
      setAlbumData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
    getUsers();
  }, []);

  React.useEffect(() => {
    getAlbums();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Text style={styles.student}>Umit Kilinc 101232721</Text>
      </>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={albumList}
          userData={list}
          renderItem={({ item }) => {
            const backgroundColor =
              item.id === selectedId ? '#800000' : '#D2B48C';
            const color = item.id === selectedId ? 'white' : 'black';
            return (
              <Item
                title={item.title}
                //author={item.name}
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
function DetailsScreen({ navigation, route }) {
  return (
    <>
      <Text>{route.params.item.name}</Text>
      <Text>{route.params.item.email}</Text>
      <Text>{route.params.item.username}</Text>
      <Text>{route.params.item.phone}</Text>
    </>
  );
}

const Stack = createStackNavigator(); //createBottomTabNavigator(); //createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
  student: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    margin: 5,
    padding: 5,
    fontSize: 15,
  },
});
