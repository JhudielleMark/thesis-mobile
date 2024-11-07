import { StyleSheet, Text, View, Button, Image, ImageBackground } from 'react-native';
import React from 'react';

const AccountProfile = ({ navigation }) => {

  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePic: 'https://example.com/profile.jpg' 
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>

        <Image source={{ uri: user.profilePic }} style={styles.profilePic} />

 
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>


        <Button title="Log out" onPress={() => navigation.navigate('Login')} />
      </View>
    </ImageBackground>
  );
};

export default AccountProfile;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderRadius: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
});
