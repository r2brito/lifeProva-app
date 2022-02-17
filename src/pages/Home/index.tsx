import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Container } from "./styles";

import Button from "../../components/Button";
import { View } from "react-native";

const Home: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <View style={{ width: 200 }}>
        <Button onPress={() => navigation.navigate("Mapa")}>
          rastreamento
        </Button>
      </View>
    </Container>
  );
};

export default Home;
