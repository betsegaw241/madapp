import React, { useEffect, useState } from "react";
import HomeComponent from "./component/Home";
import {
  get,
  getDatabase,
  onValue,
  ref,
  DataSnapshot,
} from "firebase/database";
import { IParsedData } from "./types";
import { View } from "react-native";
import { Text } from "../../components/Basic/Text";
import { ActivityIndicator } from "react-native-paper";

export default function Home() {
  const [data, setData] = useState<IParsedData>();
  const [loading, setLoading] = useState(true);
  const db = getDatabase();

 const parseEventData = (eventData: any) => {
  const sortedEventData = Object.keys(eventData)
    .map((eventId) => ({
      id: eventId,
      ...eventData[eventId],
    }))
    .sort((a, b) => b.timestamp - a.timestamp); 
  return sortedEventData;
};

  useEffect(() => {
    const eventsRef = ref(db, "events");

    // Listen for real-time updates
    const unsubscribe = onValue(
      eventsRef,
      (snapshot: DataSnapshot) => {
        const fetchedData: IParsedData = snapshot.val();
        const eventdata: any = parseEventData(fetchedData);
        setData(eventdata);
        setLoading(false);
      },
      {
        
      }
    );

    return () => unsubscribe();
  }, []);

  return loading ? <ActivityIndicator size={'large'} /> :( 
    <View>
        <HomeComponent data={data} />
    </View>);

}
