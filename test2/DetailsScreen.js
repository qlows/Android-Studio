import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Details = ({ route }) => {
  const [user, setUser] = React.useState(null);
  const { album } = route.params;

  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [album]);

  return (
    <View style={styles.backdop}>
      <Text style={styles.id}>ID: {album.id}</Text>
      <Text style={styles.title}>Title: {album.title}</Text>
      {user && <Text style={styles.user}>User: {user.name}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'DBA39A',
    margin: 8,
    padding: 8,
    textAlign: 'center',
  },
  id: {
    fontStyle: 'normal',
    margin: 8,
    padding: 8,
    textAlign: 'center',
  },
  backdop: {
    backgroundColor: '#F0DBDB',
  },
  user: {
    color: 'FEFCF3',
    margin: 8,
    padding: 8,
    textAlign: 'center',
  },
});

export default Details;
