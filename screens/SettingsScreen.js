import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ayarlar</Text>

      {/* Kullanıcı Profili ve Kişisel Bilgiler */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kullanıcı Profili</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ProfileEdit')}>
          <Ionicons name="person-outline" size={28} color="#4c9f70" />
          <Text style={styles.optionText}>Profili Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('AddressEdit')}>
          <Ionicons name="location-outline" size={28} color="#4c9f70" />
          <Text style={styles.optionText}>Adres Bilgileri</Text>
        </TouchableOpacity>
      </View>

      {/* Bildirim Ayarları */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bildirim Ayarları</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('NewsNotifications')}>
          <Ionicons name="notifications-outline" size={28} color="#4c9f70" />
          <Text style={styles.optionText}>Haberler ve Duyurular</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('EventsNotifications')}>
          <Ionicons name="calendar-outline" size={28} color="#4c9f70" />
          <Text style={styles.optionText}>Etkinlikler ve Festivaller</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('BillsReminder')}>
          <Ionicons name="cash-outline" size={28} color="#4c9f70" />
          <Text style={styles.optionText}>Fatura Hatırlatmaları</Text>
        </TouchableOpacity>
      </View>

      {/* Dil ve Anlık Bildirimler */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dil ve Bildirimler</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('LanguageSettings')}>
          <Ionicons name="language-outline" size={28} color="#4c9f70" />
          <Text style={styles.optionText}>Dil Seçimi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('EmergencyNotifications')}>
          <Ionicons name="alert-circle-outline" size={28} color="#e63946" />
          <Text style={styles.optionText}>Anlık Bildirimler</Text>
        </TouchableOpacity>
      </View>

      {/* Belediye Hizmetleri */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Belediye Hizmetleri</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ServiceApplications')}>
          <Ionicons name="add-circle-outline" size={28} color="#4c9f70" />
          <Text style={styles.optionText}>Hizmet Başvuruları</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ReportFault')}>
          <Ionicons name="alert-circle-outline" size={28} color="#e63946" />
          <Text style={styles.optionText}>Hızlı Arıza Bildirimi</Text>
        </TouchableOpacity>
      </View>

      {/* Teknik Ayarlar */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Teknik Ayarlar</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('AppUpdates')}>
          <Ionicons name="cloud-download-outline" size={28} color="#4c9f70" />
          <Text style={styles.optionText}>Uygulama Güncellemeleri</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ServiceStatus')}>
          <Ionicons name="bulb-outline" size={28} color="#4c9f70" />
          <Text style={styles.optionText}>Hizmet Durumu</Text>
        </TouchableOpacity>
      </View>

      {/* Geri Bildirim ve İletişim */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Geri Bildirim</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Feedback')}>
          <Ionicons name="chatbubble-ellipses-outline" size={28} color="#4c9f70" />
          <Text style={styles.optionText}>Geri Bildirim Gönder</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('LiveSupport')}>
          <Ionicons name="call-outline" size={28} color="#4c9f70" />
          <Text style={styles.optionText}>Canlı Destek</Text>
        </TouchableOpacity>
      </View>

      {/* Input Alanları */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>E-posta:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="E-posta adresinizi girin"
          keyboardType="email-address"
        />
        <Text style={styles.inputLabel}>Telefon Numarası:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Telefon numaranızı girin"
          keyboardType="phone-pad"
        />
        <Text style={styles.inputLabel}>Adres:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Adres bilgilerinizi girin"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4c9f70', // Modern, dikkat çekici renk
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333', // Koyu yazı rengi
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#f4f4f4', // Daha soft, temiz bir görünüm
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    color: '#333', // Okunabilir metin
    flex: 1,
    paddingLeft: 15,
    fontWeight: '600',
  },
  inputContainer: {
    marginTop: 30,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  inputField: {
    height: 50,
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default SettingsScreen;
