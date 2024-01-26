import {
  getDatabase,
  ref,
  get,
  update,
  set,
  push,
  child,
  remove,
} from "firebase/database";
import storeNotificationForPost from "./storeNotifications";
const addOrRemoveLikeFromPost = async (
  authorId:any,
  postId: string,
  userId: string | undefined
) => {
  const notificationData = {
    sender: userId,
    postId:postId,
    message: 'New Like on your event!',
    timestamp: new Date().toISOString(),
  };
  if (postId && userId) {
    const db = getDatabase();
    const postLikesRef = ref(db, `likes/${postId}`);
//  storeNotificationForPost(authorId, notificationData);
    try {
      const snapshot = await get(postLikesRef);

      if (snapshot.exists()) {
        const likesData = snapshot.val();
        if (!likesData || !Object.values(likesData).includes(userId)) {
                  
          await push(postLikesRef, userId);
        } else {
          const userKey = Object.keys(likesData).find(
            (key) => likesData[key] === userId
          );
          if (userKey) {
            const userRef = child(postLikesRef, userKey);
            await remove(userRef);
          }
        }
      } else {
        // If the document doesn't exist, create a new one with the like
        await push(postLikesRef, userId);
        storeNotificationForPost(authorId, notificationData);

      }
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  } else {
    console.error("Invalid postId or userId");
  }
};

export { addOrRemoveLikeFromPost };

const fetchLikesForPost = async (postId: String) => {
  const db = getDatabase();
  const likesRef = ref(db, `likes/${postId}`);

  try {
    const likesSnapshot = await get(likesRef);

    if (likesSnapshot.exists()) {
      const likesData = likesSnapshot.val();
      return likesData ? Object.values(likesData) : [];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching likes:", error);
    throw error; // Re-throw the error to handle it in the calling component
  }
};

export default fetchLikesForPost;
