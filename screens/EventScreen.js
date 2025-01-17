import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const CivrilEventsScreen = () => {
  const events = [
    {
      id: 1,
      title: "Çivril Kiraz Festivali",
      date: "20 Haziran 2025",
      time: "14:00",
      location: "Çivril Merkez Meydanı",
      image: 'https://picsum.photos/400/200', // Online placeholder görsel
      description: "Geleneksel kiraz festivalimizde muhteşem etkinlikler sizleri bekliyor 🍒",
    },
    {
      id: 2,
      title: "Geleneksel El Sanatları Sergisi",
      date: "25 Haziran 2025",
      time: "10:00",
      location: "Çivril Kültür Merkezi",
      image: 'https://picsum.photos/400/201', // Farklı görsel için farklı boyut
      description: "Yöresel el sanatlarımızın en güzel örnekleri bu sergide 🎨",
    },
    {
      id: 3,
      title: "Açık Hava Konseri",
      date: "1 Temmuz 2025",
      time: "20:00",
      location: "İşçehisar Parkı",
      image: 'https://picsum.photos/400/202', // Farklı görsel için farklı boyut
      description: "Yaz akşamında unutulmaz bir müzik şöleni 🎵",
    },
  ];

  const EventCard = ({ event }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: event.image }}  // uri kullanımı ile online görsel
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>{event.title}</Text>
          <TouchableOpacity>
            <Icon name="heart" size={24} color="#22c55e" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.description}>{event.description}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="calendar" size={20} color="#22c55e" />
            <Text style={styles.infoText}>{event.date}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Icon name="clock" size={20} color="#22c55e" />
            <Text style={styles.infoText}>{event.time}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Icon name="map-pin" size={20} color="#22c55e" />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.8}  // Dokunma efektini iyileştirme
        >
          <Text style={styles.buttonText}>Detayları Görüntüle</Text>
          <Icon name="chevron-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
  

      {/* Events List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.eventsList}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
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
    backgroundColor: '#15803d',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#dcfce7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  eventsList: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden', // Android için shadow fix
  },
  cardImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f3f4f6', // Görsel yüklenene kadar arka plan
  },
  cardContent: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 12,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#4b5563',
  },
  button: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default CivrilEventsScreen;