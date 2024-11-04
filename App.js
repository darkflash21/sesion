import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const LoginScreen = () => {
  const [selectedImage, setSelectedImage] = useState('https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg');

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
        Alert.alert("Permisos denegados", "Se requieren permisos para acceder a la cámara y galería.");
      }
    })();
  }, []);

  const chooseFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        setSelectedImage(result.assets[0].uri);
      } else {
        Alert.alert("Selección cancelada", "No se seleccionó ninguna imagen.");
      }
    } catch (error) {
      console.error("Error al seleccionar imagen de la galería:", error);
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        setSelectedImage(result.assets[0].uri);
      } else {
        Alert.alert("Captura cancelada", "No se tomó ninguna foto.");
      }
    } catch (error) {
      console.error("Error al tomar la foto:", error);
    }
  };

  const shareImage = async () => {
    if (!selectedImage) {
      Alert.alert("Error", "No hay ninguna imagen para compartir.");
      return;
    }

    try {
      await Sharing.shareAsync(selectedImage);
    } catch (error) {
      console.error("Error al compartir imagen:", error);
      Alert.alert("Error al compartir", "No se pudo compartir la imagen.");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Bienvenido</Text>
      
      <TouchableOpacity onPress={chooseFromGallery} style={styles.imageContainer}>
        <Image source={{ uri: selectedImage }} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity onPress={shareImage} style={styles.shareButton}>
        <Text style={styles.buttonText}>Compartir Imagen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
        <Text style={styles.buttonText}>Tomar Foto</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput style={styles.input} placeholder="Ingresa tu usuario" />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput style={styles.input} placeholder="Ingresa tu contraseña" secureTextEntry={true} />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => Alert.alert('Sesión Iniciada')}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f0f0f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  imageContainer: {
    backgroundColor: '#e0e0eb',
    borderRadius: 100,
    padding: 5,
    marginBottom: 20,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  inputContainer: {
    width: '100%',
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#3b5998',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 15,
    alignItems: 'center',
  },
  photoButton: {
    backgroundColor: '#34a853',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
