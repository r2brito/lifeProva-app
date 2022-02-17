import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";

import api from "../../services/api";

import { Container } from "./styles";

import { Text, StyleSheet, ActivityIndicator, View } from "react-native";

export interface IMarker {
  id: string;
  veiccodigo: number;
  veicnome: string;
  rastdata: string;
  rastlatitude: number;
  rastlongitude: number;
}

const Mapa: React.FC = () => {
  const [markers, setMarkers] = useState<IMarker[]>([]);

  useEffect(() => {
    api.get("rastreamento").then((response) => {
      console.log("teste", response.data);
      setMarkers(response.data);
    });
  }, []);

  if (!markers || markers.length === 0) {
    return <ActivityIndicator />;
  }

  return (
    <Container>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: markers[0].rastlatitude,
          longitude: markers[0].rastlatitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((item) => {
          return (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.rastlatitude,
                longitude: item.rastlatitude,
              }}
            >
              <Callout>
                <View>
                  <Text style={styles.selectedCategory}>{item.veicnome}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </Container>
  );
};

export default Mapa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
    width: 500,
    height: 300,
  },
  selectedCategory: {
    backgroundColor: "#fff",
    color: "#322153",
    fontSize: 16,
    padding: 10,
  },
});
