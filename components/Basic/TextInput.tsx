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
import { TextInputProps } from './types';

export const TextInput = styled.TextInput<TextInputProps>`
  ${compose(
    color,
    layout,
    space,
    typography,
    variant,
    border,
    zIndex,
    position,
  )};
`;
