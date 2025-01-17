import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const jobList = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "GreenTech Solutions",
    description: "React ve Redux kullanarak projeler geliştirebilecek bir frontend geliştirici arıyoruz.",
    location: "İstanbul, Türkiye",
    email: "contact@greentech.com",
    phone: "+123456789",
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "EcoSoft Inc.",
    description: "Node.js ve MongoDB konusunda deneyimli bir backend geliştirici arıyoruz.",
    location: "Ankara, Türkiye",
    email: "hr@ecosoft.com",
    phone: "+987654321",
  },
];

export default function App() {
  const [selectedJob, setSelectedJob] = useState(null);

  const renderJobList = () => (
    <FlatList
      data={jobList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => setSelectedJob(item)}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.company}>{item.company}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.email}`)}>
              <FontAwesome name="envelope" size={24} color="#4CAF50" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone}`)}>
              <FontAwesome name="phone" size={24} color="#4CAF50" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );

  const renderJobDetail = () => (
    <View style={styles.detailContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => setSelectedJob(null)}>
        <FontAwesome name="arrow-left" size={24} color="#4CAF50" />
      </TouchableOpacity>
      <Text style={styles.title}>{selectedJob.title}</Text>
      <Text style={styles.company}>{selectedJob.company}</Text>
      <Text style={styles.description}>{selectedJob.description}</Text>
      <Text style={styles.location}>Lokasyon: {selectedJob.location}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${selectedJob.email}`)}>
          <FontAwesome name="envelope" size={24} color="#4CAF50" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${selectedJob.phone}`)}>
          <FontAwesome name="phone" size={24} color="#4CAF50" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return <View style={styles.container}>{selectedJob ? renderJobDetail() : renderJobList()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    padding: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  company: {
    fontSize: 16,
    color: "#388E3C",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  detailContainer: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  icon: {
    marginRight: 15,
  },
});
