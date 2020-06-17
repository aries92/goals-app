import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { ActivityIndicator, Button, Text } from "react-native";
import { DELETE_GOAL, GET_GOALS, GET_USER, SET_GOAL } from "../../schema";
import { Box, Message } from "../../Styled";
import { IGoal } from "../../types";

function Goal({ id, text, complete, userId }: IGoal) {
  const { data } = useQuery(GET_USER);
  const [setGoal, propSet] = useMutation(SET_GOAL);
  const [deleteGoal, propDelete] = useMutation(DELETE_GOAL);

  const error = propSet.error || propDelete.error;
  const loading = propSet.loading || propDelete.loading;

  function handleGoalPress(id: number, complete: boolean) {
    setGoal({
      variables: {
        id,
        complete,
        userId: data.user.id
      }
    });
  }
  function handleDeletePress() {
    deleteGoal({
      variables: { id },
      update: cache => {
        const { goals }: any = cache.readQuery({ query: GET_GOALS });

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
              onPress={() => handleGoalPress(id, false)}
            />
          </>
        ) : (
          <Button
            title="Done"
            color="green"
            onPress={() => handleGoalPress(id, true)}
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
