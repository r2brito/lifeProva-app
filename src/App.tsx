import React from "react";
import "react-native-gesture-handler";
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppProvider from "./hooks";
import Routes from "./routes";

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
