import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { Button } from "../../components/Basic/Button/Button";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import DownloadIcon from "react-native-vector-icons/Octicons";
import Icons from "react-native-vector-icons/EvilIcons";
import MCI from "react-native-vector-icons/MaterialCommunityIcons";
import FormatNumber from "../../utils/NumberFormater";
import { TextInput } from "../../components/Basic/TextInput";
import { formatUtcDate } from "../../utils/dateFormat";
import { downloadFronUrl } from "../../utils/FileDownload";
import {
  get,
  getDatabase,
  ref,
  push,
  serverTimestamp,
  onValue,
  off,
} from "firebase/database";
import CommentCard from "../../components/Card/CommentCard";
import firebase from "firebase/app";
import fetchUserData from "../../utils/userData";
import fetchLikesForPost, { addOrRemoveLikeFromPost } from "../../utils/Likes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../hooks/firebaseconfig";
import { sendNotification } from "../../hooks/sendNotification";
import { IUserData } from "./types";
import {
  ImageGallery,
  ImageObject,
} from "@georstat/react-native-image-gallery";
import ComunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import storeNotificationForPost from "../../utils/storeNotifications";
import { shareFiles } from "../../utils/Sharefile";

const PostDetails = ({ route }: any) => {
  const post = route.params.post;
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);
  const [user, setUser] = useState<IUserData>();
  const [isloading, setIsLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>();
  //---
  const [isOpen, setIsOpen] = useState(false);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);

  const db = getDatabase();

  const postId = post.id;

  function addComment(postId: any, userId: any, content: any) {
    const notificationData = {
      sender: user?.uid,
      postId: postId,
      message: "New comment on your event!",
      timestamp: new Date().toISOString(),
    };

    const commentsRef = ref(db, `comments/${postId}`);
    const newCommentRef = push(commentsRef, {
      userId: userId,
      content: content,
      timestamp: serverTimestamp(),
    });
    // sendNotification(user?.expoPushToken, "comment", user?.displayName);
    setComment("");
    storeNotificationForPost(post.userId, notificationData);
  }
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
    //coments---------------
    const fetchComments = async () => {
      const commentsRef = ref(db, `comments/${post.id}`);
      try {
        onValue(commentsRef, (snapshot) => {
          const commentsData = snapshot.val();
          setComments(commentsData ? Object.values(commentsData) : []);
        });
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    //post-user-----------------
    const fetchPostDetails = async () => {
      try {
        const fetchedUser = await fetchUserData(post.userId, setUser);
        // setUser(fetchedUser);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    fetchComments();
    fetchPostDetails();
  }, [postId, user?.uid, isLiked]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesData = await fetchLikesForPost(postId);

        setLikes(likesData);

        setIsLiked(likesData.includes(currentUserId));
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [postId, user?.uid, comments]);

  const handleLikeButtonClick = async () => {
    try {
      await addOrRemoveLikeFromPost(post.userId, postId, currentUserId);

      const updatedLikes = await fetchLikesForPost(postId);

      setLikes(updatedLikes);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };

  if (isloading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const images = post.imageUrls.map((image: string, index: number) => ({
    id: index + 1,
    url: image,
  }));
  const renderHeaderComponent = (image: ImageObject, currentIndex: number) => {
    return (
      <View
        style={{
          marginTop: "20%",
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: "10%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            downloadFronUrl(
              post.imageUrls[currentIndex],
              `${Date.now()}downloaded_image.jpg`
            );
            closeGallery();
          }}
        >
          <ComunityIcon name="download" size={24} color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={closeGallery}>
          <ComunityIcon name="close" size={24} color={"#fff"} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.cardContainer}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cardHeader}>
            <View>
              <Image
                style={styles.avatar}
                source={
                  user?.image
                    ? {
                        uri: `${user.image}`,
                      }
                    : require("../../assets/images/def.jpg")
                }
              />
            </View>

            <View>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {user?.displayName}
              </Text>
              <Text style={{ fontSize: 14, paddingBottom: 5 }}>
                {post.timestamp && formatUtcDate(post.timestamp)}
              </Text>
            </View>
          </View>
          <View style={styles.cardDescription}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", marginVertical: 2 }}
            >
              {post.title}
            </Text>
            <Text style={{ fontSize: 15 }}>{post.description}</Text>
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Location: {post.location}
              </Text>

              <Text
                style={{ fontSize: 15, paddingBottom: 5, fontWeight: "bold" }}
              >
                Time: {formatUtcDate(post.date)}
              </Text>
            </View>
          </View>

          <View style={styles.imagedisplay}>
            {post.imageUrls &&
              Array.isArray(post.imageUrls) &&
              post.imageUrls.map((url: string, index: number) => (
                <TouchableOpacity key={index.toString()} onPress={openGallery}>
                  <Image
                    style={styles.imagi}
                    source={{
                      uri: `${url}`,
                    }}
                  />
                </TouchableOpacity>
              ))}
          </View>

          <View style={styles.cardBottom}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Button
                onPress={() => {
                  handleLikeButtonClick();
                }}
              >
                {isLiked ? (
                  <Icon name="heart" color={"red"} size={30} />
                ) : (
                  <Icon name="heart-o" size={30} />
                )}
              </Button>
              <Text>{FormatNumber(likes.length)}</Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Button>
                <Icon name="comment-o" size={30} />
              </Button>
              <Text>{FormatNumber(comments.length)}</Text>
            </View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Button
               onPress={() => {
                const image = post.imageUrls[0];
                shareFiles(image,"image.jpg");
              }}
              >
                <Icons name="share-google" size={30} />
              </Button>
            </View>
          </View>
          <View>
            <View style={styles.inputFild}>
              <TextInput
                multiline={true}
                placeholder="write comment here"
                numberOfLines={5}
                value={comment}
                onChangeText={setComment}
                style={styles.commentFild}
              />
              <TouchableOpacity
                onPress={() => addComment(post.id, currentUserId, comment)}
              >
                <MCI
                  name="send-circle-outline"
                  size={50}
                  style={styles.commentIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          {user &&
            comments.map((item, index) => (
              <CommentCard key={index.toString()} item={item} />
            ))}
        </ScrollView>
        <ImageGallery
          close={closeGallery}
          isOpen={isOpen}
          images={images}
          renderHeaderComponent={renderHeaderComponent}
          thumbColor="#fff"
          thumbSize={100}
        />
      </View>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ffff",
    width: "100%",
    height: "100%",
    // margin: 5,
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
  inputFild: {
    width: "100%",
    gap: 5,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  commentFild: {
    height: 80,
    width: "80%",
    borderColor: "#b1e8e8",
    // backgroundColor: "#ede7e6",
    borderWidth: 1,
    padding: 8,
    textAlignVertical: "top",
    fontSize: 16,
    borderRadius: 8,
  },
  commentIcon: {
    color: "blue",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 1000,
  },
});

export default PostDetails;
