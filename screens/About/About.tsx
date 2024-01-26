// AboutPage.js

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutPage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.jpg')}
        style={styles.logo}
      />
      <Text style={styles.description}>
        EventPost is a mobile application where everyone can post events, and
        users can like, share, and comment on them.
      </Text>
      <Text style={styles.developer}>
        Developed by: Betsegaw Abebe
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#ffff'
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize:16
  },
  developer: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default AboutPage;
