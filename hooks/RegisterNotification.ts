import * as Notifications from "expo-notifications"; // Adjust the import statement
import * as Permissions from "expo-permissions"; // Adjust the import statement
import "firebase/database";
import { getDatabase } from "firebase/database";

export const registerForPushNotificationsAsync = async () => {
  const db = getDatabase();
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Permission to receive push notifications was denied");
    return;
  }
  console.log("Expo Push Token:", 2);
  const token = (
    await Notifications.getExpoPushTokenAsync({ projectId: "eventpost-69eca" })
  ).data;
  console.log("Expo Push Token:", token);

  return token;

  // Save the token to your backend or database
  // const userId = auth.currentUser?.uid; // Access 'uid' using optional chaining
  // await db.ref(`users/${userId}`).update({
  //   expoPushToken: token,
  // });
};
