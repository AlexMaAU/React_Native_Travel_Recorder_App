import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";
import { usePlacesContext } from "../../store/placesContext";

export default function PlacesList() {
  const { loadedPlaces } = usePlacesContext();

  if (!loadedPlaces || loadedPlaces.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start by adding some
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={loadedPlaces}
      renderItem={({ item }) => <PlaceItem place={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 12,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});

