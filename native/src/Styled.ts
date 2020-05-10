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
export const Container = styled.ScrollView`
  padding: 15px;
`;
export const Box = styled.View`
  display: flex;
  flex-direction: ${({ row }: { row: boolean }) => (row ? "row" : "column")}
    ${({ wrap }: { wrap: boolean }) => wrap && `flex-wrap: wrap`}
    ${({ j }: { j: string }) => j && `justify-content: ${j}`}
    ${({ a }: { a: string }) => a && `align-items: ${a}`}
    ${({ m }: { m: string }) => m && `margin: ${m}`}
    ${({ p }: { p: string }) => p && `padding: ${p}`};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const Message = {
  Error: styled.Text`
    color: red;
  `,
  Success: styled.Text`
    color: green;
  `
};
