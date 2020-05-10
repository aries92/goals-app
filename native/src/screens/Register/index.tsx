import { useMutation } from "@apollo/react-hooks";
import React from "react";
import Entry from "../../components/Entry";
import { SCREENS } from "../../constants";
import { Container, Link } from "../../Styled";
import { IForm } from "../../types";
import { REGISTER } from "../../schema";
import { Props } from "./type";

function Register({ navigation }: Props) {
  const [register, { loading, error, data }] = useMutation(REGISTER);

  function handleEntryPress() {
    navigation.navigate(SCREENS.login);
  }
  async function handleSubmit(form: IForm) {
    await register({ variables: { ...form } });

    setTimeout(() => {
      navigation.navigate(SCREENS.login);
    }, 1000);
  }
  return (
    <Container>
      <Entry
        onSubmit={handleSubmit}
        loading={loading}
        error={error?.message}
        success={data?.createUser}
      />
      <Link onPress={handleEntryPress}>Login instead</Link>
    </Container>
  );
}

export default Register;
