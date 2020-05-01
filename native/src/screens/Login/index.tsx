import { useMutation } from "@apollo/react-hooks";
import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import Entry from "../../components/Entry";
import { Container, Link } from "../../Styled";
import { IForm } from "../../types";
import { LOGIN } from "./schema";
import { Props } from "./type";

function Login({ route, navigation }: Props) {
  const [login, { loading, error }] = useMutation(LOGIN);

  function handleEntryPress() {
    navigation.navigate(route.params.to);
  }
  async function handleSubmit(form: IForm) {
    const { data } = await login({ variables: { ...form } });
    await AsyncStorage.setItem("token", data?.login);
  }
  return (
    <Container>
      <Entry onSubmit={handleSubmit} loading={loading} error={error?.message} />
      <Link onPress={handleEntryPress}>Register instead</Link>
    </Container>
  );
}

export default Login;
