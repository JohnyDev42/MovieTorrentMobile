import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Auth(props) {
  const movie = props.navigation.getParam("movie");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [regView, setRegView] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const auth = () => {
    if (regView) {
      fetch(`http://192.168.1.7:8000/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((resp) => resp.json())
        .then((res) => {
          setRegView(false);
        });
    } else {
      fetch(`http://192.168.1.7:8000/auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((resp) => resp.json())
        .then((res) => {
          saveData(res.token);
          props.navigation.navigate("MovieList");
        });
    }
  };

  const saveData = async (token) => {
    await AsyncStorage.setItem("MR_Token", token);
  };
  const getData = async () => {
    const token = await AsyncStorage.setItem("MR_Token");
    if (token) props.navigation.navigate("MovieList");
  };

  const toggleView = () => {
    setRegView(!regView);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(Text) => setUsername(Text)}
        value={username}
        autoCapitalize={"none"}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(Text) => setPassword(Text)}
        value={password}
        secureTextEntry={true}
        autoCapitalize={"none"}
      />
      <Button onPress={() => auth()} title={regView ? "Register" : "Login"} />
      <TouchableOpacity onPress={() => toggleView()}>
        {!regView ? (
          <Text style={styles.white}>Don't have an account? Register here</Text>
        ) : (
          <Text style={styles.white}>
            Already have an account? Go back to Login
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

Auth.navigationOptions = (screenProps) => ({
  title: "Login",
  headerStyle: {
    backgroundColor: "orange",
  },
  headerTintColor: "#fff",

  headerTitleAlign: "center",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 24,
    padding: 20,
  },
  headerRight: (
    <Button
      title="Remove"
      color="orange"
      onPress={() => removeClicked(screenProps)}
    />
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282C35",
    padding: 10,
  },
  label: {
    fontSize: 20,
    color: "white",
    padding: 10,
  },
  input: {
    fontSize: 20,
    margin: 10,
    backgroundColor: "white",
    padding: 10,
  },
  white: {
    color: "white",
    padding: 20,
    fontSize: 20,
  },
});
