import React from 'react';
import {View, ActivityIndicator, StyleSheet, Image} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../images/nkf.png')} style={styles.logoImage} />
      <ActivityIndicator size={50} color="#222F3E" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    marginBottom: 48,
  },
});



export default LoadingScreen;
