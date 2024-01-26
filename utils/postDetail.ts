import {
    get,
    getDatabase,
    ref,
    push,
    serverTimestamp,
    onValue,
    off,
    Database,
  } from "firebase/database";
  const db = getDatabase();

export function addComment(postId: any, userId: any, content: any) {
    const commentsRef = ref(db, `comments/${postId}`);
    const newCommentRef = push(commentsRef, {
      userId: userId,
      content: content,
      timestamp: serverTimestamp(),
    });
   
  }


export const fetchComments = async (db: Database, postId: string, setComments:any) => {
    const commentsRef = ref(db, `comments/${postId}`);
    try {
      onValue(commentsRef, (snapshot) => {
        const commentsData = snapshot.val();
        setComments(commentsData ? Object.values(commentsData) : []);
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };