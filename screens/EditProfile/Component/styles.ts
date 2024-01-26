import { StyleSheet } from "react-native";

export const light = StyleSheet.create({
  topContainer: {
  
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
    height: "100%",
  },
  cameraicon: {
    alignSelf: "flex-end",
    marginTop: -30,
    color: "#BBB9B8",
  },
  inputcontainer: {
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  input: {
    height: 50,
    borderColor: "#06739b",
    backgroundColor: "#F9FBF9",
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
    width: "100%",
    fontSize: 18,
    borderWidth:1,
    
  },
  passwordFild: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    fontSize: 16,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 10000,
    borderWidth: 5,
    borderColor: "#ffff",
  },
  passwordFildWraper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FBF9",
    borderRadius: 8,
  },
  inputFild: {
    width: "100%",
    gap: 5,
  },
  label: {
    paddingLeft: 5,
    fontSize: 18,
  },
  editButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#06739b",
    height: 50,
    paddingLeft: 8,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonlabel: {
    fontSize: 20,
    fontWeight: "bold",
    color:'#fff'
  },
});
export const dark = StyleSheet.create({
  topContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#164863",
    height: "100%",
  },
  cameraicon: {
    alignSelf: "flex-end",
    marginTop: -30,
    color: "#DDF2FD",
  },
  inputcontainer: {
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  input: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "#427D9D",
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
    width: "100%",
    fontSize: 18,
    color: "#fff",
  },
  passwordFild: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    fontSize: 16,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 10000,
    borderWidth: 5,
    borderColor: "#ffff",
  },
  passwordFildWraper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FBF9",
    borderRadius: 8,
  },
  inputFild: {
    width: "100%",
    gap: 5,
  },
  label: {
    paddingLeft: 5,
    fontSize: 18,
    color: "#fff",
  },
  editButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#06739b",
    height: 50,
    paddingLeft: 8,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonlabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
