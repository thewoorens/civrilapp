import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const CouncilDecisionsScreen = () => {
  const [expandedId, setExpandedId] = useState(null);

  const decisions = [
    {
      id: 1,
      number: "2025/42",
      date: "15 Ocak 2025",
      title: "Park ve Bahçeler Düzenlemesi 🌳",
      description: "Çivril ilçesi merkez mahallelerindeki park ve bahçelerin yenilenmesi ve modern spor aletlerinin kurulması hakkında karar",
      details: "1. Park ve bahçelerin modern bir görünüme kavuşturulması\n2. Yeni spor aletlerinin kurulması\n3. Çocuk oyun alanlarının yenilenmesi\n4. Aydınlatma sistemlerinin LED sistemine geçirilmesi",
      status: "Kabul Edildi",
      type: "İmar",
      icon: "leaf"
    },
    {
      id: 2,
      number: "2025/43",
      date: "15 Ocak 2025",
      title: "Sokak Sağlıklaştırma Projesi 🏠",
      description: "Tarihi sokakların restorasyonu ve altyapı çalışmaları hakkında meclis kararı",
      details: "1. Tarihi doku korunarak restorasyon yapılması\n2. Altyapı sistemlerinin yenilenmesi\n3. Sokak aydınlatmalarının yenilenmesi\n4. Kaldırımların yeniden düzenlenmesi",
      status: "Kabul Edildi",
      type: "Restorasyon",
      icon: "home"
    },
    {
      id: 3,
      number: "2025/44",
      date: "15 Ocak 2025",
      title: "Kültür Merkezi İnşaatı 🎭",
      description: "Yeni kültür merkezi binası yapımı hakkında meclis kararı",
      details: "1. 500 kişilik çok amaçlı salon\n2. Sergi alanları\n3. Kütüphane\n4. Kafeterya\n5. Otopark düzenlemesi",
      status: "İncelemede",
      type: "Yapılandırma",
      icon: "layout"
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Kabul Edildi':
        return {
          color: '#059669',
          backgroundColor: '#d1fae5'
        };
      case 'İncelemede':
        return {
          color: '#b45309',
          backgroundColor: '#fef3c7'
        };
      case 'Reddedildi':
        return {
          color: '#dc2626',
          backgroundColor: '#fee2e2'
        };
      default:
        return {
          color: '#6b7280',
          backgroundColor: '#f3f4f6'
        };
    }
  };

  const DecisionCard = ({ decision }) => {
    const isExpanded = expandedId === decision.id;
    const statusStyle = getStatusStyle(decision.status);

    return (
      <TouchableOpacity 
        style={[styles.card, isExpanded && styles.cardExpanded]}
        onPress={() => setExpandedId(isExpanded ? null : decision.id)}
        activeOpacity={0.9}
      >
        <View style={[styles.cardHeader, isExpanded && styles.cardHeaderExpanded]}>
          <View style={styles.iconContainer}>
            <Icon name={decision.icon} size={24} color="#059669" />
          </View>
          <View style={styles.headerContent}>
            <View style={styles.titleRow}>
              <Text style={styles.decisionNumber}>Karar No: {decision.number}</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
                <Text style={[styles.status, { color: statusStyle.color }]}>
                  {decision.status}
                </Text>
              </View>
            </View>
            <Text style={styles.date}>{decision.date}</Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.title}>{decision.title}</Text>
          <Text style={styles.description}>{decision.description}</Text>
          
          {isExpanded && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsTitle}>Karar Detayları:</Text>
              <Text style={styles.details}>{decision.details}</Text>
            </View>
          )}

          <View style={styles.cardFooter}>
            <View style={styles.typeContainer}>
              <Icon name="bookmark" size={16} color="#059669" />
              <Text style={styles.type}>{decision.type}</Text>
            </View>
            <View style={styles.expandButton}>
              <Icon 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#059669" 
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.decisionsList}>
          {decisions.map((decision) => (
            <DecisionCard key={decision.id} decision={decision} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  header: {
    backgroundColor: '#059669',
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerContent: {
    padding: 20,
  },
  headerDecoration: {
    height: 20,
    backgroundColor: '#f0fdf4',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#d1fae5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  decisionsList: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#059669',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#ecfdf5',
  },
  cardExpanded: {
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecfdf5',
    alignItems: 'center',
  },
  cardHeaderExpanded: {
    backgroundColor: '#ecfdf5',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  decisionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#064e3b',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
    lineHeight: 24,
  },
  detailsContainer: {
    backgroundColor: '#ecfdf5',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#064e3b',
    marginBottom: 8,
  },
  details: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  type: {
    marginLeft: 8,
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  expandButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CouncilDecisionsScreen;