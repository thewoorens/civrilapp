import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

const StarIcon = ({ filled }) => (
  <Text style={{ fontSize: 30, color: filled ? '#FFD700' : '#D1D5DB' }}>
    ★
  </Text>
);

const RatingSurveyScreen = () => {
  const [ratings, setRatings] = useState({});
  const [hoveredRatings, setHoveredRatings] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const surveys = [
    {
      id: 'belediye-hizmetleri',
      title: 'Belediye Hizmetleri Değerlendirmesi',
      questions: [
        {
          id: 'temizlik',
          title: 'Şehir Temizlik Hizmetleri',
          description: 'Çivril\'in genel temizlik hizmetlerinden memnuniyet düzeyiniz',
        },
        {
          id: 'ulasim',
          title: 'Ulaşım Hizmetleri',
          description: 'Toplu taşıma ve yol bakım çalışmalarının kalitesi',
        },
        {
          id: 'parklar',
          title: 'Park ve Bahçeler',
          description: 'Park ve yeşil alanların bakımı ve yeterliliği',
        },
        {
          id: 'kulturel',
          title: 'Kültürel Etkinlikler',
          description: 'Düzenlenen kültürel ve sosyal etkinliklerin kalitesi',
        },
        {
          id: 'altyapi',
          title: 'Altyapı Çalışmaları',
          description: 'Su, kanalizasyon ve yol çalışmalarının etkinliği',
        }
      ]
    }
  ];

  const handleRatingClick = (questionId, rating) => {
    setRatings({
      ...ratings,
      [questionId]: rating
    });
  };

  const getRatingLabel = (rating) => {
    switch (rating) {
      case 1: return 'Çok Kötü';
      case 2: return 'Kötü';
      case 3: return 'Orta';
      case 4: return 'İyi';
      case 5: return 'Mükemmel';
      default: return '';
    }
  };

  const getAverageRating = () => {
    const values = Object.values(ratings);
    return values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : 0;
  };

  const handleSubmit = () => {
    if (Object.keys(ratings).length === surveys[0].questions.length) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.submittedContainer}>
          <Text style={styles.submittedTitle}>Değerlendirmeniz Alındı</Text>
          <Text style={styles.submittedText}>Katılımınız için teşekkür ederiz!</Text>
          <View style={styles.averageContainer}>
            <Text style={styles.averageTitle}>Genel Değerlendirme Ortalamanız</Text>
            <Text style={styles.averageRating}>{getAverageRating()}/5</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Çivril Belediyesi Hizmet Değerlendirmesi</Text>
          <Text style={styles.subtitle}>
            Lütfen her hizmet için 1-5 arası bir değerlendirme yapınız
          </Text>
        </View>

        {surveys[0].questions.map((question) => (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionTitle}>{question.title}</Text>
            <Text style={styles.questionDescription}>{question.description}</Text>
            
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  onPress={() => handleRatingClick(question.id, rating)}
                >
                  <StarIcon filled={ratings[question.id] >= rating} />
                </TouchableOpacity>
              ))}
              <Text style={styles.ratingLabel}>
                {ratings[question.id] > 0 && getRatingLabel(ratings[question.id])}
              </Text>
            </View>

            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${(ratings[question.id] || 0) * 20}%` }
                ]}
              />
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={[
            styles.submitButton,
            {
              backgroundColor:
                Object.keys(ratings).length === surveys[0].questions.length
                  ? '#32CD32'
                  : '#E2E8F0'
            }
          ]}
          onPress={handleSubmit}
          disabled={Object.keys(ratings).length !== surveys[0].questions.length}
        >
          <Text
            style={[
              styles.submitButtonText,
              {
                color:
                  Object.keys(ratings).length === surveys[0].questions.length
                    ? 'white'
                    : 'white'
              }
            ]}
          >
            Değerlendirmeyi Tamamla
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a365d',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a5568',
    textAlign: 'center',
  },
  questionContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 4,
  },
  questionDescription: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLabel: {
    marginLeft: 12,
    fontSize: 14,
    color: '#718096',
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#EDF2F7',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#32CD32',
  },
  submitButton: {
    marginHorizontal: 16,
    marginVertical: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  submittedContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submittedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '    ',
    marginBottom: 8,
  },
  submittedText: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 24,
  },
  averageContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  averageTitle: {
    fontSize: 16,
    color: '#2d3748',
    marginBottom: 8,
  },
  averageRating: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2b6cb0',
  },
});

export default RatingSurveyScreen;