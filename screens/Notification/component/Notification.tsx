import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { formatUtcDate } from "../../../utils/dateFormat";

export interface IAppProps {}

const NotificationComponent = (props: any) => {
  return (
    <View style={styles.notficationContainer}>
      <View style={styles.notficationbody}>
        <Text style={styles.notficationmessage}>{props.data.message}</Text>
        <View style={styles.notficationdate}>
          <Text style={styles.date}>{formatUtcDate(props.data.timestamp)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notficationContainer: {
    backgroundColor: "#fff",
    padding: 5,
    width: "90%",
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
  },
  date: {
    fontSize: 10,
  },
  notficationdate: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  notficationbody: {
   
  },
  notficationmessage: {
     fontSize:16,
  },

});
export default NotificationComponent;
