import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as React from 'react';

const HomeScreen = ({ navigation }) => {
  const [albums, setAlbums] = React.useState([]);

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((res) => res.json())
      .then((data) => setAlbums(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.student}>Umit Kilinc 101232721</Text>
      <FlatList
        data={albums}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.main}
            onPress={() => navigation.navigate('Detail', { album: item })}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  student: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    margin: 5,
    padding: 5,
    fontSize: 15,
    color: 'F0DBDB',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DBA39A',
    padding: 12,
    textAlign: 'center',
  },
  main: {
    borderWidth: 3,
    textAlign: 'center',
    margin: 10,
    padding: 10,
    borderColor: '#FEFCF3',
  },
});

export default HomeScreen;
