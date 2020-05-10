import { ApolloProvider } from "@apollo/react-hooks";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import jwt from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import "react-native-gesture-handler";
import { SCREENS } from "./constants";
import AuthContext from "./context";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { Container } from "./Styled";
import { IAuth, IToken, RootStackParamList } from "./types";

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
  const [user, setUser] = useState<IToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        // @ts-ignore
        const { user } = jwt.verify(token as string, "test");
        setUser(user);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () =>
      (({
        signIn: async (token: string) => {
          await AsyncStorage.setItem("token", token);
          // @ts-ignore
          const { user } = jwt.verify(token as string, "test");
          setUser(user);
        },
        signOut: async () => {
          await AsyncStorage.removeItem("token");
          setUser(null);
        },
        user
      } as unknown) as IAuth),
    [user]
  );

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
      </Container>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            {user ? (
              <Stack.Screen name={SCREENS.dashboard} component={Dashboard} />
            ) : (
              <>
                <Stack.Screen name={SCREENS.login} component={Login} />
                <Stack.Screen name={SCREENS.register} component={Register} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
