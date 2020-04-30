import { Formik } from "formik";
import React from "react";
import { Button } from "react-native";
import styled from "styled-components/native";
import { SCREENS } from "../../constants";
import { Container, Input, Link } from "../../Styled";
import { Props, IForm, IStyledCenter } from "./types";

const Row = styled.View`
  margin-bottom: 15px;
  ${({ center }: IStyledCenter) =>
    center &&
    `
      justify-content: center;
      align-items: center;
  `}
`;

function Entry({ route, navigation }: Props) {
  function handleEntryPress() {
    navigation.navigate(route.params.to);
  }

  function handleSubmit(values: IForm) {
    // console.log(values);
  }

  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }: any) => (
        <Container>
          <Row>
            <Input
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
          </Row>
          <Row>
            <Input
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
          </Row>
          <Row>
            <Button onPress={handleSubmit} title="Submit" />
          </Row>
          <Row center>
            <Link onPress={handleEntryPress}>
              {route.name !== SCREENS.login ? SCREENS.login : SCREENS.register}{" "}
              instead
            </Link>
          </Row>
        </Container>
      )}
    </Formik>
  );
}

export default Entry;
