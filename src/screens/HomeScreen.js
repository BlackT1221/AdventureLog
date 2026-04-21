import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Plus, MapPin } from 'lucide-react-native';

// Recibimos 'route' para acceder a los parámetros enviados desde la cámara
const HomeScreen = ({ navigation, route }) => {
  const [logs, setLogs] = useState([
    { id: '1', title: 'Caminata Inicial', date: '2026-04-20', uri: null },
  ]);

  // ESCUCHADOR DE PARÁMETROS: 
  // Cada vez que 'route.params' cambie, verificamos si hay una nueva foto
  useEffect(() => {
    if (route.params?.newLog) {
      const { newLog } = route.params;
      
      // Evitar duplicados (opcional pero recomendado)
      setLogs((prevLogs) => {
        const yaExiste = prevLogs.some(log => log.uri === newLog.uri);
        if (yaExiste) return prevLogs;

        return [
          {
            id: Date.now().toString(), // Generamos un ID único
            title: `Nueva Aventura #${prevLogs.length + 1}`,
            date: newLog.date,
            uri: newLog.uri,
            coords: newLog.coords
          },
          ...prevLogs
        ];
      });
    }
  }, [route.params?.newLog]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Aventuras</Text>
      
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Si el item tiene imagen, la mostramos */}
            {item.uri && (
              <Image source={{ uri: item.uri }} style={styles.cardImage} />
            )}
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDate}>{item.date}</Text>
              {item.coords && (
                <View style={styles.geoTag}>
                  <MapPin size={12} color="#666" />
                  <Text style={styles.geoText}>Ubicación capturada</Text>
                </View>
              )}
            </View>
          </View>
        )}
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('Camera')}
      >
        <Plus color="#FFF" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    marginBottom: 15,
    elevation: 3,
    overflow: 'hidden' // Importante para que la imagen respete los bordes redondeados
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#ddd'
  },
  cardContent: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: '600' },
  cardDate: { color: '#666', marginTop: 5 },
  geoTag: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  geoText: { fontSize: 12, color: '#666', marginLeft: 4 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#2563eb',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  }
});

export default HomeScreen;