import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    Settings: undefined;
    
  };
  
   export type EditProfileScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Settings"
   
  >;