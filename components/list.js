import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

let token = null;
export default function MovieList(props) {
  const [movies, setMovies] = useState([]);

  const getData = async () => {
    token = await AsyncStorage.getItem("MR_Token");
    if (token) {
      getMovies();
    } else {
      props.navigation.navigate("Auth");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(`bist ${token}`);
  var poken = token;
  const getMovies = () => {
    // console.log(token);
    fetch("http://192.168.1.7:8000/api/movies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((jsonRes) => {
        setMovies(jsonRes);
      })
      .catch((err) => console.log(err));
  };
  console.log(`jist ${poken}`);
  const movieClicked = (movie) => {
    props.navigation.navigate("Detail", {
      movie: movie,
      title: movie.title,
      poken: poken,
    });
  };
  return (
    <View>
      <Image
        source={require("../assets/header.png")}
        style={{
          width: "100%",
          height: 150,
          paddingTop: 0,
          paddingBottom: 0,
        }}
        resizeMode="contain"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => movieClicked(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

MovieList.navigationOptions = (screenProps) => ({
  title: "List of Movies",
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
      title="Add New"
      color="orange"
      onPress={() =>
        screenProps.navigation.navigate("Edit", { movie: "", description: "" })
      }
    />
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: "#282C35",
  },
  itemText: {
    color: "#fff",
    fontSize: 24,
  },
});
