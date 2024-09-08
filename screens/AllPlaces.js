import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { usePlacesContext } from "../store/placesContext";

export default function AllPlaces({ route }) {
  const { setLoadedPlaces } = usePlacesContext();

  // using isFocused within the useEffect hook to ensure that operations only occur when the screen is focused.
  const isFocused = useIsFocused();

  useEffect(() => {
    // useEffect take effect only when route has params and screen back to AllPlaces
    if (isFocused && route.params) {
      setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [route]);

  return <PlacesList />;
}

