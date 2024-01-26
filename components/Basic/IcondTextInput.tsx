import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import {
  color,
  compose,
  layout,
  space,
  typography,
  variant,
  border,
  zIndex,
  position,
} from 'styled-system';

interface StyledInputProps extends TextInputProps {
  width?: number | string;
  height?: number | string;
}

const StyledTextInput = styled(TextInput)<StyledInputProps>`
  ${compose(
    color,
    layout,
    space,
    typography,
    variant,
    border,
    zIndex,
    position,
  )}
`;

export const IcondTextInput: React.FC<StyledInputProps> = (props) => {
  return <StyledTextInput {...props} />;
};
