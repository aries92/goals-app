import { ApolloProvider } from "@apollo/react-common";
import { useQuery } from "@apollo/react-hooks";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import jwt from "jsonwebtoken";
import React from "react";
import { ActivityIndicator } from "react-native";
import "react-native-gesture-handler";
import { SCREENS } from "./constants";
import { GET_USER } from "./schema";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { Container } from "./Styled";
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
  },
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
      <Stack.Navigator>
        {data.user ? (
          <Stack.Screen name={SCREENS.dashboard} component={Dashboard} />
        ) : (
          <>
            <Stack.Screen name={SCREENS.login} component={Login} />
            <Stack.Screen name={SCREENS.register} component={Register} />
          </>
        )}
      </Stack.Navigator>
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
