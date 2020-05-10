import { useMutation } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { ActivityIndicator, Button, Text } from "react-native";
import AuthContext from "../../context";
import { IGoal } from "../../types";
import { DELETE_GOAL, SET_GOAL, GET_GOALS } from "../../schema";
import { Box, Message } from "../../Styled";

function Goal({ id, text, complete, userId }: IGoal) {
  const { user } = useContext(AuthContext);
  const [setGoal, propSet] = useMutation(SET_GOAL);
  const [deleteGoal, propDelete] = useMutation(DELETE_GOAL);

  const error = propSet.error || propDelete.error;
  const loading = propSet.loading || propDelete.loading;

  function handlePress(id: number, complete: boolean) {
    setGoal({
      variables: {
        id,
        complete,
        userId: user.id
      }
    });
  }
  function handleDeletePress() {
    deleteGoal({
      variables: { id },
      update: cache => {
        // @ts-ignore
        const { goals } = cache.readQuery({ query: GET_GOALS });

        cache.writeQuery({
          query: GET_GOALS,
          data: {
            goals: goals.filter(({ id: itemId }: any) => itemId !== id)
          }
        });
      }
    });
  }
  return (
    <>
      <Box a="center" row>
        <Box p="0 10px 0 0" m="0 auto 0 0">
          <Text>{text}</Text>
        </Box>
        {complete ? (
          <>
            <Box p="0 10px" m="0 0 0 auto">
              <Text>completed by useID {userId}</Text>
            </Box>
            <Button
              title="Todo"
              color="blue"
              onPress={() => handlePress(id, false)}
            />
          </>
        ) : (
          <Button
            title="Done"
            color="green"
            onPress={() => handlePress(id, true)}
          />
        )}
        <Box m="0 0 0 10px">
          <Button title="delete" color="red" onPress={handleDeletePress} />
        </Box>
      </Box>
      <Box p="5px 0 20px">
        {loading && <ActivityIndicator size="small" />}
        {error && (
          <Message.Error style={{ width: "100%" }}>
            {error.message}
          </Message.Error>
        )}
      </Box>
    </>
  );
}

export default Goal;
