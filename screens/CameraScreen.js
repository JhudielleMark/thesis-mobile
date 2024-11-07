import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [scanning, setScanning] = useState(true); 
  const [scanData, setScanData] = useState(null); 

  useEffect(() => {
    (async () => {
    
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      
    
      const { status: barcodeStatus } = await BarCodeScanner.requestPermissionsAsync();
      if (barcodeStatus !== 'granted') {
        console.log('Permission for barcode scanner was denied');
      }
    })();
  }, []);


  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const handleBarCodeScanned = ({ type, data }) => {
    setScanning(false); 
    setScanData(data); 
    console.log('QR Code scanned:', data);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ratio="16:9"
      >
        {scanning && (
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        )}
        
        <View style={styles.buttonContainer}>
          <Button
            title="Flip Camera"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </Camera>

      {scanData && (
        <View style={styles.scanResultContainer}>
          <Text style={styles.scanResultText}>Scanned Data: {scanData}</Text>
          <Button title="Scan Again" onPress={() => setScanning(true)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  scanResultContainer: {
    position: 'absolute',
    bottom: 50,
    left: '10%',
    right: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  scanResultText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CameraScreen;
