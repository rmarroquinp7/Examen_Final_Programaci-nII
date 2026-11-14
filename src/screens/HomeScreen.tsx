import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { authService } from "../services/AuthService";

export default function HomeScreen() {
  const [imagen, setImagen] = useState<string | null>(null);

  const elegirDeGaleria = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    });
    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  };

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso denegado", "Necesitamos acceso a la cámara.");
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });
    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  };

  const eliminarFoto = () => setImagen(null);

  const cerrarSesion = async () => {
    try {
      await authService.cerrarSesion();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis fotografías</Text>

      <View style={styles.fila}>
        <Pressable style={styles.boton} onPress={elegirDeGaleria}>
          <Text style={styles.textoBoton}>
            {imagen ? "Cambiar (galería)" : "Galería"}
          </Text>
        </Pressable>
        <Pressable style={styles.boton} onPress={tomarFoto}>
          <Text style={styles.textoBoton}>
            {imagen ? "Cambiar (cámara)" : "Cámara"}
          </Text>
        </Pressable>
      </View>

      {imagen ? (
        <>
          <Image
            source={{ uri: imagen }}
            style={styles.imagen}
            resizeMode="contain"
          />
          <Pressable style={[styles.boton, styles.naranja]} onPress={eliminarFoto}>
            <Text style={styles.textoBoton}>Eliminar fotografía</Text>
          </Pressable>
        </>
      ) : (
        <Text style={styles.vacio}>No hay fotografía seleccionada.</Text>
      )}

      <Pressable style={[styles.boton, styles.rojo]} onPress={cerrarSesion}>
        <Text style={styles.textoBoton}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 60 },
  titulo: { fontSize: 28, fontWeight: "bold", marginBottom: 16 },
  fila: { flexDirection: "row", gap: 12 },
  boton: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  naranja: { backgroundColor: "#ea580c", flex: 0 },
  rojo: { backgroundColor: "#dc2626", flex: 0, marginTop: 24 },
  textoBoton: { color: "#fff", fontWeight: "bold" },
  imagen: { width: "100%", height: 300, marginTop: 16 },
  vacio: { marginTop: 24, textAlign: "center", color: "#666" },
});