import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import React from "react";
import "react-native-gesture-handler";
import { SCREENS } from "./constants";
import Dashboard from "./screens/Dashboard";
import Index from "./screens/Entry";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();
const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={SCREENS.login}
            component={Index}
            initialParams={{ to: SCREENS.register }}
          />
          <Stack.Screen
            name={SCREENS.register}
            component={Index}
            initialParams={{ to: SCREENS.login }}
          />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
