import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const jobList = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "GreenTech Solutions",
    email: "contact@greentech.com",
    phone: "+123456789",
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "EcoSoft Inc.",
    email: "hr@ecosoft.com",
    phone: "+987654321",
  },
];

const JobCard = ({ title, company, email, phone }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.company}>{company}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
          <FontAwesome name="envelope" size={24} color="#4CAF50" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
          <FontAwesome name="phone" size={24} color="#4CAF50" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={jobList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard title={item.title} company={item.company} email={item.email} phone={item.phone} />
        )}
      />
    </View>
  );
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
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  icon: {
    marginLeft: 15,
  },
});
