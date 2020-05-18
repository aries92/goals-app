import { useMutation } from "@apollo/react-hooks";
import React from "react";
import Entry from "../../components/Entry";
import { SCREENS } from "../../constants";
import { LOGIN, SIGN_IN } from "../../schema";
import { Container, Link } from "../../Styled";
import { IForm } from "../../types";
import { Props } from "./type";

function Login({ navigation }: Props) {
  const [login, { loading, error }] = useMutation(LOGIN);
  const [signIn] = useMutation(SIGN_IN);

  function handleEntryPress() {
    navigation.navigate(SCREENS.register);
  }

  async function handleSubmit(form: IForm) {
    const { data } = await login({ variables: { ...form } });
    signIn({ variables: { token: data?.login } });
  }

  return (
    <Container>
      <Entry onSubmit={handleSubmit} loading={loading} error={error?.message} />
      <Link onPress={handleEntryPress}>Register instead</Link>
    </Container>
  );
}

export default Login;
