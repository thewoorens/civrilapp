import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const WaterOutageScreen = () => {
  const [kesintiler, setKesintiler] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock veri
  useEffect(() => {
    const fetchKesintiler = async () => {
      try {
        const data = [
          { id: "1", mahalle: "Merkez Mah.", tarih: "2025-01-17", saat: "10:00 - 14:00", konum: "41.0082,28.9784" },
          { id: "2", mahalle: "Yenimahalle", tarih: "2025-01-18", saat: "08:00 - 12:00", konum: "39.9208,32.8541" },
          { id: "3", mahalle: "Bahçelievler", tarih: "2025-01-19", saat: "14:00 - 18:00", konum: "38.4237,27.1428" },
        ];
        setKesintiler(data);
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKesintiler();
  }, []);

  const openMaps = (location) => {
    const url = `https://www.google.com/maps?q=${location}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Hata", "Haritalar uygulaması açılamadı.");
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Su Kesintileri</Text>
      <FlatList
        data={kesintiler}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.kesintiItem}>
            <View style={styles.info}>
              <Text style={styles.mahalle}>{item.mahalle}</Text>
              <Text style={styles.tarih}>Tarih: {item.tarih}</Text>
              <Text style={styles.saat}>Saat: {item.saat}</Text>
            </View>
            <TouchableOpacity
              onPress={() => openMaps(item.konum)}
              style={styles.iconContainer}
            >
              <Ionicons name="map" size={30} color="green" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  kesintiItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowRadius: 5,
    elevation: 2,
  },
  info: {
    flex: 1,
  },
  mahalle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tarih: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  saat: {
    fontSize: 16,
    color: "#555",
  },
  iconContainer: {
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WaterOutageScreen;
