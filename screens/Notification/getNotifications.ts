import { getDatabase, ref, child, get, remove } from "firebase/database";

export const getNotificationsForPost = async (userId: any) => {
  const db = getDatabase();
  const notificationsRef = ref(db, `notifications/${userId}`);

  try {
    const snapshot = await get(notificationsRef);

    if (snapshot.exists()) {
      // Convert the snapshot data to an array of notifications
      const notifications: any[] = [];
      snapshot.forEach((childSnapshot) => {
        const notification = childSnapshot.val();
        notifications.push(notification);
      });

      return notifications;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error getting notifications:", error);
    return [];
  }
};
export const removeNotificationsForUser = async (userId: any) => {
  const db = getDatabase();
  const notificationsRef = ref(db, `notifications/${userId}`);

  try {
    // Remove all notifications under the user's node
    await remove(notificationsRef);
  } catch (error) {
    console.error("Error removing notifications:", error);
  }
};
