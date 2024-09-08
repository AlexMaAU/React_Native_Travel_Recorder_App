import { createContext, useContext, useState } from "react";

const PlacesContext = createContext();

function PlacesContextProvider({ children }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  return (
    <PlacesContext.Provider value={{ loadedPlaces, setLoadedPlaces }}>
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlacesContext() {
  const { loadedPlaces, setLoadedPlaces } = useContext(PlacesContext);
  return { loadedPlaces, setLoadedPlaces };
}

export default PlacesContextProvider;

