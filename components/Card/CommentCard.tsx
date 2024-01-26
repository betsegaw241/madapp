import { StyleSheet, View } from "react-native";
import { Text } from "../Basic/Text";
import { useEffect, useState } from "react";
import fetchUserData from "../../utils/userData";
import { ICommentCard, IUserData } from "./types";
import { formatUtcDate } from "../../utils/dateFormat";
const commentCard = (props: ICommentCard) => {
  const [user, setUser] = useState<IUserData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(props.item.userId, setUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [props.item.userId]);

  if (!user) {
    // User data is still being fetched
    return (
      <View style={styles.commentsContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.commentsContainer}>
      <View style={styles.commentCard}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentHeaderText}>{user?.displayName}</Text>
          <Text>{formatUtcDate(props.item.timestamp)}</Text>
        </View>
        <View style={styles.commentcontent}>
          <Text style={styles.commentcontenttext}>{props.item.content}</Text>
        </View>
      </View>
    </View>
  );
};
export default commentCard;

const styles = StyleSheet.create({
  commentsContainer: {
    marginTop: 10,
    
    justifyContent: "center",
    alignItems: "center",
  },
  commentCard: {
    width: "80%",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
  borderColor:'#b1e8e8',
   
    
  },
  commentcontent: {},
  commentHeader: {
    flexDirection: "column",
  },
  commentHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  commentcontenttext: {
    margin: 5,
  },
});
