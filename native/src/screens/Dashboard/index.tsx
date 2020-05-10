import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { ActivityIndicator, Button, Text } from "react-native";
import Goal from "../../components/Goal";
import GoalForm from "../../components/GoalForm";
import AuthContext from "../../context";
import { GET_GOALS } from "../../schema";
import { Box, Container, Message, Title } from "../../Styled";
import { IGoal } from "../../types";
import { mapGoals } from "../../utils";
import { Props } from "./type";

function Dashboard({ navigation }: Props) {
  const { signOut, user } = useContext(AuthContext);
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

  return (
    <Container>
      {user && (
        <>
          <Box row a="center" j="space-between" m="0 0 20px">
            <Text>Hello, {user.email}</Text>
            <Button title="Sign Out" onPress={signOut} color="red" />
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
