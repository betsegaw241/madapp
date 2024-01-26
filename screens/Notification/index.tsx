import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import NotificationComponent from "./component/Notification";
import { Button } from "../../components/Basic/Button/Button";
import {getNotificationsForPost ,removeNotificationsForUser } from "./getNotifications";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../hooks/firebaseconfig";
import { IUserData } from "../PostDetails/types";

export interface IAppProps {}

const Notification = ({refreshCount}:any) => {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState<IUserData>()
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
      }
    });
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = user?.uid; // Replace with the actual post ID
      const fetchedNotifications = await getNotificationsForPost(userId);
      setNotifications(fetchedNotifications);
      refreshCount()
    };

    fetchNotifications();
     const intervalId = setInterval(() => {
      fetchNotifications();
    }, 30 * 1000); 

    return () => clearInterval(intervalId);
  }, [user,refreshCount]); 

  const handleChange = async () => {
    const userId = user?.uid;

    try {
      await removeNotificationsForUser(userId);
      setNotifications([]);
      refreshCount()

    } catch (error) {
      console.error("Error clearing notifications:", error);
    }  };
  return (
    <View>
      <View style={styles.Notificationheader}>
        <Button onPress={handleChange}>
          <Text style={styles.NotificationButtonlabel}>Clear</Text>
        </Button>
      </View>
      <View style={styles.container}>
      {notifications.map((notification, index) => (
          <NotificationComponent key={index} data={notification} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  
    
   
  },
  Notificationheader: {
 
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingVertical: 10,
  },
  NotificationButtonlabel: {
    fontSize: 15,
  },
  notficationtitle: {},

  notficationbody: {},
});
export default Notification;
