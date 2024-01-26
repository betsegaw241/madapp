import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { downloadFronUrl } from "../../utils/FileDownload";
import DownloadIcon from "react-native-vector-icons/Octicons";

const CustomImageGallery = ({ images, modalVisible, onClose }: any) => {
  const [selectedImage, setSelectedImage] = useState(null);

  
  return (
    <Modal
    visible={selectedImage !== null}
    transparent={true}
    onRequestClose={() => setSelectedImage(null)}
  >
    <TouchableWithoutFeedback onPress={() => setSelectedImage(null)}>
      <View style={styles.modalContainer}>
        <Image
          source={{
            uri: `${selectedImage}`,
          }}
          style={styles.modalImage}
        />

        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => {
            downloadFronUrl(
              selectedImage,
              `${Date.now()}downloaded_image.jpg`
            );

            setSelectedImage(null);
          }}
        >
          <DownloadIcon
            style={styles.downloadButtonText}
            name="download"
            size={30}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            setSelectedImage(null);
          }}
        >
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnailStrip: {
    height: 100,
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  downloadButton: {
    // position: "absolute",
    bottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundzColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 5,
    marginTop: "auto",
    alignSelf: "flex-end",
    marginRight: 50,
  },
  downloadButtonText: {
    color: "#fff",
  },


});

export default CustomImageGallery;
