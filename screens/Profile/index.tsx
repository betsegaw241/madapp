import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref as dbref,
  get,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import ProfileComponent from "./component/ProfileComponent";

export interface IUserData {
  email: string;
  displayname: string;
  imageurl: string;
  uid: string;
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IUserData>({
    email: "",
    displayname: "",
    imageurl: "",
    uid: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const db = getDatabase();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getAuth().currentUser;

      if (user) {
        const userId = user.uid;
        const userDocRef = dbref(db, `users/${userId}`);

        try {
          const userSnapshot = await get(userDocRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            setData({
              email: userData.email,
              displayname: userData.displayName,
              imageurl: userData.image,
              uid: userData.uid,
            });
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Error getting user data:", error);
        } finally {
          setLoading(false);
        }

        // Fetch events for the user
        const eventsRef = dbref(db, "events");
        const eventsQuery = query(
          eventsRef,
          orderByChild("userId"),
          equalTo(user.uid)
        );
        const eventsSnapshot = await get(eventsQuery);

        if (eventsSnapshot.exists()) {
          const eventsData = eventsSnapshot.val();
          console.log(eventsData.length);
          const imageUrlsArray = Object.values(eventsData).map(
            (event: any) => event.imageUrls
          );

          // Filter out undefined imageUrls and flatten the array
          const allImageUrls = imageUrlsArray
            .filter((imageUrls) => imageUrls)
            .flat();
          setImages(allImageUrls);
        } else {
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [db]);

  return loading ? null : (
    <ProfileComponent
      email={data.email}
      username={data.displayname}
      image={data.imageurl}
      id={data.uid}
      event={images}
    />
  );
};

export default Profile;
