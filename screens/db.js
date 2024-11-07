import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ImageBackground } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [users, setUsers] = useState([]);


  const db = SQLite.openDatabaseSync('account.db');


  useEffect(() => {
    const initDb = async () => {
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );`
      );
      fetchUsers();
    };
    initDb();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await db.getAllAsync('SELECT * FROM users');
      if (result && result[0] && result[0].rows) {
        console.log(result)
        setUsers(result[0].rows._array);
      } else {
        console.log('No users found or unexpected result structure:', result);
        setUsers([]); // Set users to an empty array if no results
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Error fetching users: ' + error.message);
    }
  };


  const addUser = async () => {
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
  
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Insert new user
      const result = await db.runAsync(
        'INSERT INTO users (email, password) VALUES (?, ?);',
        [email, password]
      );
      
    setUsers(prev => [
      ...prev,
      { id: result.lastInsertRowId, email, password },
    ]);

    alert('Account created successfully!');
    
    // Clear input fields
    setEmail('');
    setPassword('');
    setConfirmPassword(''); 
    fetchUsers();
  } catch (error) {
    console.error('Error adding user:', error);
    alert('Error creating account: ' + error.message);
  }
};

const deleteUser = async (id) => {
  await db.runAsync('DELETE FROM users WHERE id = ?;', [id]);
  fetchUsers();
};

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <Button title="Sign Up" onPress={addUser} />
      <Text style={styles.listTitle}>User Accounts</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.email}</Text>
            <Button title="Delete" onPress={() => deleteUser(item.id)} />
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  listTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
});
