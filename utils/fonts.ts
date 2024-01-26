import React, { useEffect, useState, ReactNode } from 'react';
import * as Font from 'expo-font';

interface FontLoaderProps {
  children: (fontsLoaded: boolean) => ReactNode;
}

const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'NovaSquare-Regular': require('../assets/fonts/NovaSquare-Regular.ttf'),



      
    });
  } catch (error) {
    console.error('Error loading fonts:', error);
  }
};

const FontLoader: React.FC<FontLoaderProps> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAsyncFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAsyncFonts();
  }, []);

  return children(fontsLoaded);
};

export default FontLoader;
