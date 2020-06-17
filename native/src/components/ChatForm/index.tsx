import { useLazyQuery, useMutation, useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { Button, Text } from "react-native";
import styled from "styled-components/native";
import { GET_MESSAGES, GET_USER, SEND_MESSAGE } from "../../schema";
import { Box, Container, Input } from "../../Styled";

interface IChatFrom {
  id: string;
}

interface IChatProps {
  fromId: number;
  toId: number;
}

const Chat = styled(Container)`
  background-color: #fff;
`;

function ChatForm({ id }: IChatFrom) {
  const { data } = useQuery(GET_USER);
  return (
    <Container>
      {data?.user?.id && (
        <>
          <ChatHistory fromId={data.user.id} toId={id} />
          <ChatMessage fromId={data.user.id} toId={id} />
        </>
      )}
    </Container>
  );
}

function ChatHistory({ fromId, toId }: IChatProps) {
  const { loading, data } = useQuery(GET_MESSAGES, {
    variables: {
      userIdList: [fromId, toId]
    }
  });

  return (
    <Chat>
      {loading && <Text>Loading..</Text>}
      {data?.messages?.length === 0 && <Text>No messages</Text>}
    </Chat>
  );
}

function ChatMessage({ fromId, toId }: IChatProps) {
  const [text, setText] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE);

  return (
    <Box a="center" row style={{ padding: "15px", backgroundColor: "#fff" }}>
      <Input
        placeholder="message"
        style={{ width: "100%", marginRight: 15 }}
        onChangeText={v => setText(v)}
        value={text}
      />
      <Button
        title="send"
        onPress={() =>
          sendMessage({
            variables: { userIdList: [fromId, toId], userId: fromId, text }
          })
        }
      />
    </Box>
  );
}

export default ChatForm;
