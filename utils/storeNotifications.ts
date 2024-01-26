import { getDatabase, ref, push, set } from "firebase/database";

const storeNotificationForPost = async (
  userId: string,
  notificationData: any
) => {
  const db = getDatabase();

  try {
    const notificationsRef = ref(db, `notifications/${userId}`);

    const newNotificationRef = push(notificationsRef);

    const notificationId = newNotificationRef.key;

    await set(newNotificationRef, {
      id: notificationId,
      ...notificationData,
    });
  } catch (error) {
    console.error("Error storing notification:", error);
  }
};

export default storeNotificationForPost;
