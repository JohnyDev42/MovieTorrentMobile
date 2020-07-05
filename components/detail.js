import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Detail(props) {
  const movie = props.navigation.getParam("movie");
  const token = props.navigation.getParam("poken");
  const [highlight, setHighlight] = useState(0);
  const rateClicked = () => {
    if (highlight > 0 && highlight < 6) {
      fetch(`http://192.168.1.7:8000/api/movies/${movie.id}/rate_movie/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ stars: highlight }),
      })
        .then((resp) => resp.json())
        .then((res) => {
          setHighlight(0);
          Alert.alert("Rating", res.message);
          console.log(`new ${token}`);
        })
        .catch((err) => Alert.alert("Error", err));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        <FontAwesomeIcon
          style={movie.avg_rating > 0 ? styles.orange : styles.white}
          icon={faStar}
        />
        <FontAwesomeIcon
          style={movie.avg_rating > 1 ? styles.orange : styles.white}
          icon={faStar}
        />
        <FontAwesomeIcon
          style={movie.avg_rating > 2 ? styles.orange : styles.white}
          icon={faStar}
        />
        <FontAwesomeIcon
          style={movie.avg_rating > 3 ? styles.orange : styles.white}
          icon={faStar}
        />
        <FontAwesomeIcon
          style={movie.avg_rating > 4 ? styles.orange : styles.white}
          icon={faStar}
        />
        <Text style={styles.white}> ({movie.no_of_ratings})</Text>
      </View>
      <Text style={styles.description}>Description: {movie.description}</Text>
      <View style={{ borderBottomColor: "white", borderBottomWidth: 2 }} />
      <Text style={styles.description}>Rate It!!!</Text>
      <View style={styles.starContainer}>
        <FontAwesomeIcon
          style={highlight > 0 ? styles.purple : styles.grey}
          icon={faStar}
          size={45}
          onPress={() => setHighlight(1)}
        />
        <FontAwesomeIcon
          style={highlight > 1 ? styles.purple : styles.grey}
          icon={faStar}
          size={45}
          onPress={() => setHighlight(2)}
        />
        <FontAwesomeIcon
          style={highlight > 2 ? styles.purple : styles.grey}
          icon={faStar}
          size={45}
          onPress={() => setHighlight(3)}
        />
        <FontAwesomeIcon
          style={highlight > 3 ? styles.purple : styles.grey}
          icon={faStar}
          size={45}
          onPress={() => setHighlight(4)}
        />
        <FontAwesomeIcon
          style={highlight > 4 ? styles.purple : styles.grey}
          icon={faStar}
          size={45}
          onPress={() => setHighlight(5)}
        />
      </View>
      <Button title="Rate" onPress={() => rateClicked()} />
    </View>
  );
}

Detail.navigationOptions = (screenProps) => ({
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
      title="Edit"
      color="orange"
      onPress={() =>
        screenProps.navigation.navigate("Edit", {
          movie: screenProps.navigation.getParam("movie"),
          title: screenProps.navigation.getParam("title"),
        })
      }
    />
  ),
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282C35",
    padding: 10,
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: "#00ddff",
  },
  itemText: {
    color: "#fff",
    fontSize: 24,
  },
  starContainer: {
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  orange: {
    color: "orange",
  },
  white: {
    color: "white",
  },
  purple: {
    color: "purple",
  },
  grey: {
    color: "grey",
  },
  description: {
    fontSize: 20,
    color: "white",
    padding: 10,
  },
});
