import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import ChatForm from "../../components/ChatForm";
import { GET_USERS } from "../../schema";
import { Box, Container, Message, Title } from "../../Styled";
import Accordion from "react-native-collapsible/Accordion";

function Chat(props: any) {
  const { data, loading, error } = useQuery(GET_USERS);
  const [activeSections, setActiveSections] = useState([]);

  return (
    <Container>
      <Title>Chat</Title>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && (
        <Message.Error style={{ width: "100%" }}>{error.message}</Message.Error>
      )}
      {data?.users && (
        <Accordion
          sections={data.users}
          activeSections={activeSections}
          renderHeader={({ email }) => (
            <Box m="15px 0 0">
              <Text>
                {"\uD83D\uDCAC"} {email}
              </Text>
            </Box>
          )}
          renderContent={({ id }, i, isActive) => {
            if (isActive) {
              return <ChatForm id={id} />;
            }
          }}
          onChange={active => setActiveSections(active)}
        />
      )}
    </Container>
  );
}

export default Chat;
