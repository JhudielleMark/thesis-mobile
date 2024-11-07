import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const handleLogin = () => {
    
    if (email === '' && password === '') {
      navigation.navigate('Home');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image 
          source={require('../assets/Logo.png')}
          style={styles.logo}
          resizeMode="cover"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button title="Login" onPress={handleLogin} />
        <Text style={styles.link} onPress={() => navigation.navigate('Database')}>
          Don't have an account? Sign up
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
    marginTop: 12,
    textAlign: 'center',
  },
  logo: {
    width: 150, 
    height: 150,
    alignSelf: 'center',
    marginBottom: 60,
    borderRadius: 75,
  },
  passwordContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  passwordInput: {
    flex: 1, 
    height: 40,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgotPasswordText: {
    marginTop: 10,
    textAlign: 'right',
    color: 'blue', 
    marginBottom: 20,
  },
  login: {
    backgroundColor: '#800000'
  }
});
export default LoginScreen;
