import { StackNavigationProp } from "@react-navigation/stack";

export interface IRprops {}
type RootStackParamList = {
    login: undefined;
};

export interface IsignUp {
  username:string;
  email:string;
  password:string
}

  export type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "login">;
  