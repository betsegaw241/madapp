import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

// Function to download and save the file
const downloadAndSaveFile = async (path) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, path);

    // Get the download URL for the file
    const downloadURL = await getDownloadURL(storageRef);

    // Fetch the file using the download URL
    const response = await fetch(downloadURL);
    const blob = await response.blob();

    // Get the local file URI
    const localURI = FileSystem.documentDirectory + 'downloadedFile.jpg';

    // Save the file locally
    await FileSystem.writeAsStringAsync(localURI, blob, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log('File downloaded and saved locally:', localURI);
  } catch (error) {
    console.error('Error downloading and saving file:', error);
  }
};

// Call the function to download and save the file
export default downloadAndSaveFile;
