import styled from 'styled-components/native';
import {
  compose,
  layout,
  space,
  border,
  zIndex,
  position,
  margin,
  height,
  width,
} from 'styled-system';
import { ImageProps, ImageBackgroundProps } from './types';

export const Image = styled.Image<ImageProps>`
  ${compose(layout, space, border, zIndex, position, margin, height, width)}
`;

export const ImageBackground = styled.ImageBackground<ImageBackgroundProps>``;
