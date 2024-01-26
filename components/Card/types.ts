import { StackNavigationProp } from "@react-navigation/stack";

export interface IPost {
  date: string;
  location: string;
  collectionId: string;
  collectionName: string;
  comments: number;
  created: string;
  description: string;
  id: string;
  images: string[];
  likes: number;
  title: string;
  updated: string;
  userId: string;
}

export interface IParsedData {
  items: IPost[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

type RootStackParamList = {
  PostDetails: { post: IPost };
};

export type CardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PostDetails"
>;
export interface IUserData {
  email: string;
  displayName: string;
  image: string;
  uid: string;
  expoPushToken: string;
}
export interface ICommentCard {
  item: ICommentData;
}

export interface ICommentData {
  userId: string;
  content: string;
  timestamp: string;
}
