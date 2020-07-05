import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TextInput,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Edit(props) {
  const movie = props.navigation.getParam("movie");
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);

  const saveMovie = () => {
    if (movie.id) {
      var id = `${movie.id}/`;
      var methody = "PUT";
    } else {
      var id = "";
      var methody = "POST";
    }
    fetch(`http://192.168.1.7:8000/api/movies/${id}`, {
      method: `${methody}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 663696096a72279f4981af590a5e687bf3c220c6",
      },
      body: JSON.stringify({ title: title, description: description }),
    })
      .then((resp) => resp.json())
      .then((movie) => {
        if (methody == "PUT") {
          props.navigation.navigate("Detail", {
            movie: movie,
            title: movie.title,
          });
        } else {
          props.navigation.navigate("MovieList");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Edit"
        onChangeText={(Text) => setTitle(Text)}
        value={title}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={(Text) => setDescription(Text)}
        value={description}
      />
      <Button onPress={() => saveMovie()} title="Save" />
    </View>
  );
}

Edit.navigationOptions = (screenProps) => ({
  title: screenProps.navigation.getParam("title"),
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

const removeClicked = (props) => {
  const movie = props.navigation.getParam("movie");
  fetch(`http://192.168.1.7:8000/api/movies/${movie.id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token 663696096a72279f4981af590a5e687bf3c220c6",
    },
  }).then((movie) => props.navigation.navigate("MovieList"));
};
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
});
