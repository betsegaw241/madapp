import { getDatabase, ref, get } from "firebase/database";
import * as Notifications from "expo-notifications";

export const sendNotification = async (
  expoPushToken: string| undefined,
  action: string,
  name:string | undefined
) => {
  const db = getDatabase();

  try {
    // Retrieve the author's Expo push token from Realtime Database
    // const authorSnapshot = await get(ref(db, `users/${authorId}`));

    // const expoPushToken = authorSnapshot.val()?.expoPushToken;
   

    if (!expoPushToken) {
      console.error(`Invalid Expo push token: ${expoPushToken}`);
      return;
    }

    // Construct the notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: `New ${action}!`,
      body: `${name} ${action}ed your post.`, // Action is whether liked or commented
    };

    // Send the notification
    await Notifications.scheduleNotificationAsync({
      content: message,
      trigger: null, // Send immediately
    });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
