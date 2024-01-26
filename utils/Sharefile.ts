import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

export const shareFiles = async (filePaths: string, filename: string) => {
  if (!filePaths) {
    console.warn("No file paths provided for sharing.");
    return;
  }

  const result = await FileSystem.downloadAsync(
    filePaths,
    FileSystem.documentDirectory + filename
  );

  save(result.uri);
};

const save = async (uri: string) => {
  shareAsync(uri);
};