import { StackNavigationProp } from "@react-navigation/stack";

export interface IAppProps {}
type RootStackParamList = {
  register: undefined;
  forget:undefined;
  Home:undefined;
};

 export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "register",
  "Home"
>;