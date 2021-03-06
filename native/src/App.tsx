import { ApolloProvider } from "@apollo/react-common";
import { useQuery } from "@apollo/react-hooks";
import AsyncStorage from "@react-native-community/async-storage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { split } from "apollo-link";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import jwt from "jsonwebtoken";
import React from "react";
import { ActivityIndicator } from "react-native";
import "react-native-gesture-handler";
import { SCREENS } from "./constants";
import { GET_USER } from "./schema";
import Chat from "./screens/Chat";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { Container } from "./Styled";
import { RootStackParamList } from "./types";

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql"
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createMaterialTopTabNavigator();

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
  resolvers: {
    Query: {
      user: async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          const { user }: any = jwt.verify(token as string, "test");
          return user;
        } catch (e) {
          return null;
        }
      }
    },
    Mutation: {
      signIn: async (_, { token }) => {
        await AsyncStorage.setItem("token", token);
        const { user }: any = jwt.verify(token as string, "test");
        cache.writeQuery({
          query: GET_USER,
          data: { user }
        });
      },
      signOut: async () => {
        await AsyncStorage.removeItem("token");
        cache.writeQuery({
          query: GET_USER,
          data: { user: null }
        });
      }
    }
  }
});

function Screens() {
  const { data, loading } = useQuery(GET_USER);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
      </Container>
    );
  }

  return (
    <NavigationContainer>
      {data.user ? (
        <Tab.Navigator>
          <Tab.Screen name={SCREENS.chat} component={Chat} />
          <Tab.Screen name={SCREENS.dashboard} component={Dashboard} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name={SCREENS.login} component={Login} />
          <Stack.Screen name={SCREENS.register} component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Screens />
    </ApolloProvider>
  );
}
