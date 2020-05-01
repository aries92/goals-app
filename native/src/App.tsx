import { ApolloProvider } from "@apollo/react-hooks";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import React from "react";
import "react-native-gesture-handler";
import { SCREENS } from "./constants";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();
const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache,
  request: async operation => {
    const token = await AsyncStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={SCREENS.login}
            component={Login}
            initialParams={{ to: SCREENS.register }}
          />
          <Stack.Screen
            name={SCREENS.register}
            component={Register}
            initialParams={{ to: SCREENS.login }}
          />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
