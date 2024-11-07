import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';


function FrontScreen({ navigation }) {
  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000); 

    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#800000', 
  },
  logo: {
    width: 200, 
    height: 200,
  },
});

export default FrontScreen;
