import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";
import React, { useContext } from "react";
import { ActivityIndicator, Button } from "react-native";
import AuthContext from "../../context";
import { GET_GOALS, ADD_GOAL } from "../../schema";
import { Box, Input, Message } from "../../Styled";

function GoalForm() {
  const [addGoal, { loading, error }] = useMutation(ADD_GOAL);
  const { user } = useContext(AuthContext);

  function handleSubmit({ text }: { text: string }) {
    addGoal({
      variables: {
        text,
        userId: user.id
      },
      update(cache, { data: { addGoal } }) {
        const { goals }: any = cache.readQuery({ query: GET_GOALS });

        cache.writeQuery({
          query: GET_GOALS,
          data: { goals: [...goals, addGoal] }
        });
      }
    });
  }

  return (
    <>
      <Formik initialValues={{ text: "" }} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values }: any) => (
          <Box row a="center">
            <Input
              onChangeText={handleChange("text")}
              onBlur={handleBlur("text")}
              value={values.text}
              placeholder="Goal description"
              style={{ width: "100%" }}
            />
            <Box p="0 0 0 10px">
              <Button onPress={handleSubmit} title="Submit" />
            </Box>
          </Box>
        )}
      </Formik>
      {loading && <ActivityIndicator size="small" />}
      {error && (
        <Message.Error style={{ width: "100%" }}>{error.message}</Message.Error>
      )}
    </>
  );
}

export default GoalForm;
