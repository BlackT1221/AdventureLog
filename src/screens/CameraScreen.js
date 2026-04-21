import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';

const CameraScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null); // Usamos useRef para mayor estabilidad
  const [facing, setFacing] = useState('back');

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.textCenter}>Necesitamos permiso para la cámara</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.btnPermiso}>
          <Text style={{color: 'white'}}>Conceder Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    // Verificamos que la referencia exista
    if (cameraRef.current) {
      try {
        console.log('Capturando...');
        // 1. Tomar foto
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5, // Bajamos la calidad para que sea más rápido
          base64: false,
        });

        // 2. Obtener ubicación (Añadimos un timeout por si el GPS tarda)
        let location = null;
        try {
          location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
        } catch (e) {
          console.log("Error obteniendo ubicación, procediendo sin ella");
        }
        
        console.log('Foto tomada en:', photo.uri);

        // 3. Navegar de regreso
        navigation.navigate('Home', { 
          newLog: { 
            uri: photo.uri, 
            coords: location ? location.coords : null,
            date: new Date().toLocaleDateString()
          } 
        });

      } catch (error) {
        console.error("Error al capturar:", error);
        Alert.alert("Error", "No se pudo tomar la foto");
      }
    } else {
      console.log('La cámara no está lista aún');
    }
  };

  return (
    <View style={styles.container}>
      {/* LA CÁMARA AHORA ESTÁ SOLA (SIN HIJOS) */}
      <CameraView 
        style={StyleSheet.absoluteFillObject} 
        facing={facing} 
        ref={cameraRef}
      />

      {/* LOS BOTONES ESTÁN EN UN NIVEL SUPERIOR CON POSICIÓN ABSOLUTA */}
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
           <View style={styles.innerCircle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  textCenter: { textAlign: 'center', color: 'white', marginBottom: 20 },
  btnPermiso: { backgroundColor: '#2563eb', padding: 15, marginHorizontal: 50, borderRadius: 10, alignItems: 'center' },
  
  // Estilo para encimar los botones
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)' // Un fondo sutil para ver el botón
  },
  captureBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.5)'
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#000'
  }
});

export default CameraScreen;