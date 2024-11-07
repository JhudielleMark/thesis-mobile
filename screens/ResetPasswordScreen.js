import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

function ResetPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    
    alert(`Password reset link sent to ${email}`);
    
    setEmail('');
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover" 
    >
      <View style={styles.container}>
        <Text style={styles.text}>Reset Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="gray" 
        />
        <Button title="Send Reset Link" onPress={handleReset} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10, 
    margin: 16, 
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ResetPasswordScreen;
