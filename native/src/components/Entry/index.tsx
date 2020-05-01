import { Formik } from "formik";
import React from "react";
import { ActivityIndicator, Button } from "react-native";
import styled from "styled-components/native";
import * as Yup from "yup";
import { Input, Message } from "../../Styled";
import { IForm } from "../../types";

interface IStyledCenter {
  center: boolean;
}

interface IProps {
  onSubmit: (p: IForm) => void;
  loading: boolean;
  error: string | undefined;
  success?: string | undefined;
}

const EntrySchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string().required("Required")
});

const Row = styled.View`
  margin-bottom: 15px;
  ${({ center }: IStyledCenter) =>
    center &&
    `
      justify-content: center;
      align-items: center;
  `}
`;

function Entry({ onSubmit, loading, error, success }: IProps) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={EntrySchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
      }: any) => (
        <>
          <Row>
            <Input
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Message.Error>{errors.email}</Message.Error>
            )}
          </Row>
          <Row>
            <Input
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Message.Error>{errors.password}</Message.Error>
            )}
          </Row>
          <Row center>
            {error && <Message.Error>{error}</Message.Error>}
            {success && <Message.Success>{success}</Message.Success>}
          </Row>
          {loading ? (
            <Row center>
              <ActivityIndicator size="large" color="#0000ff" />
            </Row>
          ) : (
            <Row>
              <Button onPress={handleSubmit} title="Submit" />
            </Row>
          )}
        </>
      )}
    </Formik>
  );
}

export default Entry;
