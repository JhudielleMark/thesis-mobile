import { StyleSheet, Text, View, ImageBackground, FlatList } from 'react-native';
import React from 'react';

const notifications = [
  { id: '1', title: 'New Message', description: 'You have a new message from John.', time: '2 mins ago' },
  { id: '2', title: 'Update Available', description: 'A new update is available for the app.', time: '1 hour ago' },
  { id: '3', title: 'Friend Request', description: 'Sarah sent you a friend request.', time: '5 hours ago' },
  { id: '4', title: 'Reminder', description: 'Don\'t forget your meeting at 3 PM.', time: '6 hours ago' },
];

const NotificationScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  notificationCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    marginVertical: 5,
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
});
