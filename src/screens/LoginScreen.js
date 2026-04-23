import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Fingerprint } from 'lucide-react-native';

const LoginScreen = ({ navigation }) => {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    
    useEffect(() => {
        (async ()=> {
            // Verificar la biometria (hardware) del teléfono
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    }, []);

    const handleBiometricAuth = async () => {
        try {
            // Verificar que hayan datos biométricos registrados
            const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
            if (!savedBiometrics) {
                return Alert.alert(
                'No hay registros',
                'Por favor, configura la biometría en los ajustes de tu teléfono.'
                );
            }
            // Lanzar un cuadro de diálogo
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Autenticación requerida',
                fallbackLabel: 'Usar código',
                disableDeviceFallback: false,
            });
            
            if (result.success){
                navigation.replace('Home'); // Entramos a la app
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un fallo en la autenticación');
        }
    };
    
    return (
        <View style={styles.container}>
        <Fingerprint size={80} color="#2563eb" />
        <Text style={styles.title}>Bitácora Segura</Text>
        <Text style={styles.subtitle}>
            {isBiometricSupported 
            ? 'Usa tu huella para entrar' 
            : 'Tu hardware no soporta biometría'}
        </Text>

        <TouchableOpacity 
            style={[styles.button, !isBiometricSupported && styles.buttonDisabled]} 
            onPress={handleBiometricAuth}
            disabled={!isBiometricSupported}
        >
            <Text style={styles.buttonText}>Desbloquear</Text>
        </TouchableOpacity>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
    subtitle: { color: '#666', marginVertical: 10 },
    button: { backgroundColor: '#2563eb', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25, marginTop: 20 },
    buttonDisabled: { backgroundColor: '#ccc' },
    buttonText: { color: '#fff', fontWeight: 'bold' }
    });

export default LoginScreen;
