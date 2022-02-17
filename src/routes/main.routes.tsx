import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Home from "../pages/Home";
import Mapa from "../pages/Mapa";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName={"Home"}>
      <HomeStack.Screen
        name={"Home"}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name={"Mapa"}
        component={Mapa}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
