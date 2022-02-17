import styled, { css } from "styled-components/native";

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 0.5px;
  border-color: #232129;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #820101;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: 16px;
  font-family: "FuturaPTBook";
`;

export const TextError = styled.Text`
  color: #820101;
  font-size: 16px;
  font-family: "FuturaPTBook";
  margin-bottom: 8px;

  ${(props) =>
    props.isFocused &&
    css`
      display: none;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      display: none;
    `}
`;
