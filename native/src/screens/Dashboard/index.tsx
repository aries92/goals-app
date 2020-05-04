import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import AuthContext from "../../context";
import { Props } from "./type";
import { Container } from "../../Styled";

function Dashboard(props: Props) {
  const { signOut } = useContext(AuthContext);

  return (
    <Container>
      <Button title="Sign Out" onPress={signOut} color="red" />
      <Text>dashboard</Text>
    </Container>
  );
}

export default Dashboard;
