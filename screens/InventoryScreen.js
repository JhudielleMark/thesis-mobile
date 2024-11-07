import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, Image, Alert, Button } from 'react-native';
import axios from 'axios';

const InventoryScreen = () => {
  const [inventoryItems, setInventoryItems] = useState([]);

  // Fetch inventory data from the backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/inventory'); // Update with your backend URL
        setInventoryItems(response.data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
        Alert.alert('Error', 'Failed to load inventory data');
      }
    };
    fetchInventory();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Inventory</Text>

        {/* Add New Item Button */}
        <Button
          title="Add New Item"
          onPress={() => console.log('Navigate to add new item screen')}
        />

        <FlatList
          data={inventoryItems}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              <Image
                source={{ uri: item.qrCode }} // Display QR code image
                style={styles.qrCodeImage}
              />
            </View>
          )}
        />
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
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  itemName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: '#fff',
    fontSize: 14,
  },
  itemQuantity: {
    color: '#fff',
    fontSize: 16,
  },
  qrCodeImage: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
});

export default InventoryScreen;
