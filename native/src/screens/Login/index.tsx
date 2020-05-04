import { useMutation } from "@apollo/react-hooks";
import AsyncStorage from "@react-native-community/async-storage";
import React, { useContext } from "react";
import Entry from "../../components/Entry";
import { SCREENS } from "../../constants";
import AuthContext from "../../context";
import { Container, Link } from "../../Styled";
import { IForm } from "../../types";
import { LOGIN } from "./schema";
import { Props } from "./type";

function Login({ navigation }: Props) {
  const [login, { loading, error }] = useMutation(LOGIN);
  const { signIn } = useContext(AuthContext);

  function handleEntryPress() {
    navigation.navigate(SCREENS.register);
  }

  async function handleSubmit(form: IForm) {
    const { data } = await login({ variables: { ...form } });
    await AsyncStorage.setItem("token", data?.login);
    signIn(data?.login);
  }

  return (
    <Container>
      <Entry onSubmit={handleSubmit} loading={loading} error={error?.message} />
      <Link onPress={handleEntryPress}>Register instead</Link>
    </Container>
  );
}

export default Login;
