import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { Alert, Platform } from "react-native";

export const downloadFronUrl = async (
  filepath: string | null,
  filenamei: string
) => {
  if (filenamei && filepath) {
    const path = filepath;
    const filename = filenamei;
    const result = await FileSystem.downloadAsync(
      path,
      FileSystem.documentDirectory + filename
    );

    console.log(result);
    save(result.uri, filename, result.headers["Content-Type"]);
  }
};

const save = async (uri: string, filename: string, mimetype: string) => {
  if (Platform.OS === "android") {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        if (filename) {
          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            filename,
            "image/jpeg"
          )
            .then(async (createdUri) => {
              await FileSystem.writeAsStringAsync(createdUri, base64, {
                encoding: FileSystem.EncodingType.Base64,
              });
              Alert.alert("Downloaded", "image downloaded sucessfully");
            })
            .catch((e) => console.log(e));
        } else {
          console.error("Filename or mimetype is null or undefined.");
        }
      } catch (error) {
        console.error("Error reading file as base64:", error);
      }
    } else {
      shareAsync(uri);
    }
  } else {
    shareAsync(uri);
  }
};
