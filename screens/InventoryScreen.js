import { StyleSheet, Text, View, ImageBackground, Button, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'

const InventoryScreen = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem('');
    } else {
      Alert.alert('Error', 'Please enter a valid item name');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Inventory</Text>

        <View style={styles.itemList}>
          {items.map((item, index) => (
            <Text key={index} style={styles.item}>{item}</Text>
          ))}
        </View>

        <View style={styles.addItemSection}>
          <TextInput
            style={styles.input}
            placeholder="Enter new item"
            value={newItem}
            onChangeText={setNewItem}
          />
          <Button title="Add Item" onPress={addItem} />
        </View>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemList: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    fontSize: 18,
    color: '#000',
    marginVertical: 5,
  },
  addItemSection: {
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});


export default InventoryScreen;