import * as React from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function MainScreen({ navigation }) {
  const [Size, setSize] = React.useState(0);
  const [FlooringPrice, setFlooringPrice] = React.useState(0);
  const [InstallationPrice, setInstallationPrice] = React.useState(0);
  const [FlooringCost, setFlooringCost] = React.useState(0);
  const [InstallationCost, setInstallationCost] = React.useState(0);
  const [TotalCost, setTotalCost] = React.useState(0);
  const [Tax, setTax] = React.useState(0);
  const [SwitchVal, setSwitch] = React.useState(false);
  const clickSwitch = (value) => {
    setSwitch(value);
  };

  function calculator() {
    // Calculating installation cost
    const InstallationCost = Size * InstallationPrice;
    if (isNaN(InstallationCost)) {
      setInstallationCost(0);
    } else {
      setInstallationCost(InstallationCost);
    }

    // Calculating flooring cost
    const FlooringCost = Size * FlooringPrice;
    if (isNaN(FlooringCost)) {
      setFlooringCost(0);
    } else {
      setFlooringCost(FlooringCost);
    }

    // Calculating total cost
    const TotalCost = InstallationCost + FlooringCost;
    if (isNaN(TotalCost)) {
      setTotalCost(0);
    } else {
      setTotalCost(TotalCost);
    }

    // Calculating tax
    const Tax = TotalCost * 0.13;
    if (isNaN(TotalCost)) {
      setTax(0);
    } else {
      setTax(Tax);
    }
  }

  return (
    <SafeAreaView style={styles.main}>
      <SafeAreaView>
        <Button
          title="Go to Info"
          onPress={() => navigation.navigate('AboutScreen')}
        />
      </SafeAreaView>

      <SafeAreaView >
        <Text>
          {SwitchVal
            ? 'Size (Square Feet) of the room: '
            : 'Size (Square Metres) of the room: '}
        </Text>
        <TextInput
          type="number"
          keyboardType="numeric"
          value={Size}
          style={styles.input}
          onChangeText={(v) => {
            setSize(Number.parseFloat(v));
          }}
        />
        <Switch
          trackColor={{ true: '#D2B48C', false: '#800020' }}
          thumnColor={SwitchVal ? '#800020' : '#D2B48C'}
          onValueChange={clickSwitch}
          value={SwitchVal}
        />
      </SafeAreaView>

      <SafeAreaView>
        <Text>Price per unit of flooring: </Text>
        <TextInput
          type="number"
          keyboardType="numeric"
          value={FlooringPrice}
          style={styles.input}
          onChangeText={(v) => {
            setFlooringPrice(Number.parseFloat(v));
          }}
        />
      </SafeAreaView>

      <SafeAreaView>
        <Text>Price per unit of flooring installation: </Text>
        <TextInput
          type="number"
          keyboardType="numeric"
          value={InstallationPrice}
          style={styles.input}
          onChangeText={(v) => {
            setInstallationPrice(Number.parseFloat(v));
          }}
        />
      </SafeAreaView>

      <SafeAreaView>
        <Button onPress={calculator} title="Calculate" />
      </SafeAreaView>

      <SafeAreaView style={styles.output}>
        <Text>Cost of installation before tax: ${InstallationCost}</Text>
        <Text>Cost of flooring before tax: ${FlooringPrice}</Text>
        <Text>
          Total cost before tax: ${TotalCost}
        </Text>
        <Text>Tax: ${Tax}</Text>
        <Text>Total cost with tax: ${Tax + TotalCost}</Text>
      </SafeAreaView>
    </SafeAreaView>
  );
}

function AboutScreen({ navigation }) {
  return (
    <>
      <View>
        <h1>Umit Kilinc</h1>
        <h1>101232721</h1>
      </View>
    </>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="MainScreen" component={MainScreen} />
        <Tab.Screen name="AboutScreen" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 8,
    padding: 8,
    fontSize: 18,
    borderWidth: 2,
  },
  output:{
    flexDirection: "column",
    marginTop: 55,
  },
  main: {
    alignItems: "center"
  }
});
