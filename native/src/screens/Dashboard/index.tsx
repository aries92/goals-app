import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { ActivityIndicator, Button, Text } from "react-native";
import Goal from "../../components/Goal";
import GoalForm from "../../components/GoalForm";
import { GET_GOALS, GET_USER, SIGN_OUT } from "../../schema";
import { Box, Container, Message, Title } from "../../Styled";
import { IGoal } from "../../types";
import { mapGoals } from "../../utils";
import { Props } from "./type";

function Dashboard({ navigation }: Props) {
  const {
    data: { user }
  }: any = useQuery(GET_USER);
  const [signOut] = useMutation(SIGN_OUT);
  const { loading, error, data } = useQuery(GET_GOALS);
  const goals = data ? mapGoals(data.goals) : null;

  if (error) {
    return (
      <Container>
        <Message.Error>{error.message}</Message.Error>
      </Container>
    );
  }

  function renderGoals(goals: IGoal[]) {
    return goals.map(g => <Goal key={g.id} {...g} />);
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <Container>
      {user && (
        <>
          <Box row a="center" j="space-between" m="0 0 20px">
            <Text>Hello, {user.email}</Text>
            <Button title="Sign Out" onPress={handleSignOut} color="red" />
          </Box>
          <Box m="0 0 10px">
            <Title>Add goals</Title>
          </Box>
          <Box m="0 0 10px">
            <GoalForm />
          </Box>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {goals && (
            <>
              <Box m="0 0 10px">
                <Title>Goals ToDo</Title>
                {renderGoals(goals.todo)}
              </Box>
              <Box m="0 0 10px">
                <Title>Goals Done</Title>
                {renderGoals(goals.done)}
              </Box>
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default Dashboard;
