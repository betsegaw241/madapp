import { StackNavigationProp } from "@react-navigation/stack";

export interface IAppProps {
  id:string,
  username:string,
  email:string,
  image:string
}
type RootStackParamList = {
  editProfile: undefined;
  Profile:undefined;
  changePassword:undefined;
  About:undefined;
};

 export type SettingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'editProfile' | 'Profile' | 'changePassword' | 'About'>;