import { StyleSheet } from "react-native";
export const light = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    height: "100%",
  },
  ProfileZone: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:'space-around',
    // borderBottomColorColor: "red",
    // borderWidth: 1,
  },
  ProfileZoneText: {
    fontSize: 24,
    marginLeft: "10%",
  },
  settingMenu: {
    padding: 10,
  },
  menuText: {
    fontSize: 24,
   
  },
  menuItem: {
    padding: 10,
    flexDirection: "row",
  },
  menuItemIcon: {
    marginLeft: "auto",
  },
  menuItemLogout: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
    marginTop: "5%",
  },
  Separator: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 10,
  },
  togglebtn: {
    marginLeft: "auto",
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    height: "20%",
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    marginTop: "auto",
    paddingHorizontal: 20,
  },

  buttonClose: {
    backgroundColor: "#ccc",
  },
  buttonLogout: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 15,

    textAlign: "center",
  },
  modalBtns: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});
export const dark = StyleSheet.create({
  container: {
    backgroundColor: "#164863",//#0D0F11
    height: "100%",
  },
  ProfileZone: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:'space-around',
    // borderBottomColorColor: "red",
    // borderWidth: 1,
  },
  ProfileZoneText: {
    fontSize: 24,
    marginLeft: "10%",
  },
  settingMenu: {
    padding: 10,
  },
  menuText: {
    fontSize: 24,
    color:'#fff'
  },
  menuItem: {
    padding: 10,
    flexDirection: "row",
  },
  menuItemIcon: {
    marginLeft: "auto",
    color:'#fff'
  },
  menuItemLogout: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
    marginTop: "5%",
  },
  Separator: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 10,
  },
  togglebtn: {
    marginLeft: "auto",
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    height: "20%",
    margin: 20,
    backgroundColor: "#9BBEC8",
    borderRadius: 8,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    marginTop: "auto",
    paddingHorizontal: 20,
  },

  buttonClose: {
    backgroundColor: "#ccc",
  },
  buttonLogout: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    color:"#fff",
    textAlign: "center",
  },
  modalBtns: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});
