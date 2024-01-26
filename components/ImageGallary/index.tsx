import { ImageGallery } from '@georstat/react-native-image-gallery';

const images = [
  {
    id: 1,
    url: 'https://...',
    // any other extra info you want
  },
  ...
]

const MyGallery = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openGallery = () => setIsOpen(true);
    const closeGallery = () => setIsOpen(false);

    return (
        <View>
            <Button onPress={openGallery} title="Open Gallery" />
            <ImageGallery close={closeGallery} isOpen={isOpen} images={images} />
        </View>
    )
}