import styled from "styled-components/native";

export const Input = styled.TextInput`
  height: 40px;
  border-color: #ccc;
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  border-width: 1px;
`;
export const Link = styled.Text`
  color: blue;
`;
export const Container = styled.View`
  padding: 15px;
`;

export const Message = {
  Error: styled.Text`
    color: red;
  `,
  Success: styled.Text`
    color: green;
  `
};
