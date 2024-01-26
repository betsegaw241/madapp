import {
    ColorProps,
    LayoutProps,
    TypographyProps,
    SpaceProps,
    FlexProps,
    JustifyContentProps,
    AlignItemsProps,
    FlexDirectionProps,
    FlexGrowProps,
    FontSizeProps,
    FontStyleProps,
    FontWeightProps,
    AlignSelfProps,
    JustifySelfProps,
    BoxShadowProps,
    BorderProps,
    FlexboxProps,
    FlexBasisProps,
    GridGapProps,
    FontFamilyProps,
    PositionProps,
    MarginProps,
    BackgroundImageProps,
    ZIndexProps,
    SizeProps,
    WidthProps,
    BackgroundPositionProps,
    BackgroundProps,
    BackgroundSizeProps,
    BorderRadiusProps,
    OpacityProps,
    HeightProps,
    ShadowProps,
  } from 'styled-system';
  
  export interface ButtonProps
    extends ColorProps,
      LayoutProps,
      JustifyContentProps,
      TypographyProps,
      SpaceProps,
      PositionProps,
      BorderProps,
      FlexDirectionProps,
      AlignSelfProps,
      JustifySelfProps,
      AlignItemsProps,
      ZIndexProps {
    variant?:
      | 'primary'
      | 'secondary'
      | 'tertiary'
      | 'outlined'
      | 'status'
      | 'padded'
      | 'paddedOutline'
      | 'ghost'
      | 'normal'
      | 'rightOutlinedLeaf';
    loading?: boolean;
    children?: any;
    onPress?: () => void;
    type?: string;
    disabled?: boolean;
  }