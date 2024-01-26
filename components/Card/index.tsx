import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { get, getDatabase, ref, onValue } from "firebase/database";
// import { Image } from "../Basic/Image";
import { Button } from "../Basic/Button/Button";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/EvilIcons";
import FormatNumber from "../../utils/NumberFormater";
import { CardNavigationProp, IUserData } from "./types";
import { useNavigation } from "@react-navigation/native";

import { formatUtcDate } from "../../utils/dateFormat";
import { shareFiles } from "../../utils/Sharefile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../hooks/firebaseconfig";
import fetchLikesForPost, { addOrRemoveLikeFromPost } from "../../utils/Likes";
import { sendNotification } from "../../hooks/sendNotification";
import { useTheme } from "../../utils/ThemProvider";
import storeNotificationForPost from "../../utils/storeNotifications";

const Card = (props: any) => {
  const [showMore, setShowMore] = useState(false);
  const [liked, setIsliked] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [author, setAuthor] = useState<IUserData>();
  const postContent = props.description;
  const navigation = useNavigation<CardNavigationProp>();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState<any>([]);
  const [user, setUser] = useState<IUserData>();
  const [comment, setComment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [comments, setComments] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>();
  const displayContent = postContent.split(" ", 15).join(" ");
  const showDetail = () => {
    navigation.navigate("PostDetails", { post: props });
  };
  const db = getDatabase();

  const { isDarkTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        const currentuserId = user.uid;
        setCurrentUserId(currentuserId);
        setIsLoading(false);
      } else {
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchAuthorData = async () => {
      const authorId = props.userId; // Assuming userId is passed as a prop

      if (authorId) {
        const db = getDatabase();
        const userRef = ref(db, `users/${authorId}`);

        try {
          const userSnapshot = await get(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            setAuthor(userData);
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Error getting user data:", error);
        }
      }
    };

    const fetchComments = async () => {
      const commentsRef = ref(db, `comments/${props.id}`);
      try {
        onValue(commentsRef, (snapshot) => {
          const commentsData = snapshot.val();
          setComments(commentsData ? Object.values(commentsData) : []);
        });
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const fetchPostDetails = async () => {
      try {
        // setUser(fetchedUser);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchAuthorData();

    fetchComments();
    fetchPostDetails();
  }, [props.userId]);
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesData = await fetchLikesForPost(props.id);

        setLikes(likesData);

        setIsLiked(likesData.includes(currentUserId));
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [props.id, user?.uid, comments]);

  if (!author) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  const handleLikeButtonClick = async () => {
    try {
      await addOrRemoveLikeFromPost(props.userId, props.id, currentUserId);

      const updatedLikes = await fetchLikesForPost(props.id);

      setLikes(updatedLikes);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };
  if (isloading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <TouchableOpacity onPress={showDetail}>
      <View
        style={[
          styles.cardContainer,
          { backgroundColor: isDarkTheme ? "#9BBEC8" : "#fff" },
        ]}
      >
        <View style={styles.cardHeader}>
          <View>
            <Image
              style={styles.avatar}
              source={
                author?.image
                  ? {
                      uri: `${author.image}`,
                    }
                  : require("../../assets/images/def.jpg")
              }
            />
          </View>

          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {author?.displayName}
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", paddingBottom: 5 }}
            >
              {props.timestamp && formatUtcDate(props.timestamp)}
            </Text>
          </View>
        </View>
        <View style={styles.cardDescription}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {props.title}
          </Text>
          {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icons name="location" size={20} />

            <Text style={{ fontSize: 16,  }}>
              {props.location}
            </Text>
          </View> */}
          <View>
            {/* <Text
              style={{ fontSize: 14,  paddingBottom: 5 }}
            >
              {formatUtcDate(props.date)}
            </Text> */}
          </View>
          <Text style={{ fontSize: 14 }}>{displayContent}</Text>

          <Button
            onPress={() => {
              showDetail();
            }}
          >
            <Text style={{ fontSize: 15, color: "#34e", margin: 3 }}>
              see more
            </Text>
          </Button>
        </View>

        <View style={styles.imagedisplay}>
          {props.imageUrls &&
            props.imageUrls.map((uri: string, index: number) => (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => setSelectedImage(uri)}
              >
                <Image
                  style={styles.imagi}
                  source={{
                    uri: `${uri}`,
                  }}
                />
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.cardBottom}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Button
              onPress={() => {
                handleLikeButtonClick();
              }}
            >
              {isLiked ? (
                <Icon name="heart" color={"red"} size={30} />
              ) : (
                <Icon name="heart-o" size={25} />
              )}
            </Button>
            <Text>{FormatNumber(likes.length)}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Button onPress={showDetail}>
              <Icon name="comment-o" size={25} />
            </Button>
            <Text>{FormatNumber(comments.length)}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Button
              onPress={() => {
                const image = props.imageUrls[0];
                shareFiles(image,"image.jpg");
              }}
            >
              <Icons name="share-google" size={25} />
            </Button>
          </View>
        </View>
      </View>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ffff",
    // width: "90%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
  },
  imagi: {
    width: 190,
    height: 200,
  },
  cardHeader: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  cardDescription: {
    paddingVertical: 10,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
    height: 50,
    marginTop: 10,
  },
  postimages: {
    height: 300,
    width: 300,
  },
  imagedisplay: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  downloadButton: {
    // position: "absolute",
    bottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundzColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 5,
    marginTop: "auto",
    alignSelf: "flex-end",
    marginRight: 50,
  },
  downloadButtonText: {
    color: "#fff",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 1000,
  },
});

export default Card;
