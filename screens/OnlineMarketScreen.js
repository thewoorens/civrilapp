import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

const MarketPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const categories = [
    'Tümü',
    'Meyve & Sebze',
    'Süt Ürünleri',
    'Kahvaltılık',
    'Bakliyat',
    'İçecek'
  ];

  const products = [
    {
      id: 1,
      name: 'Organik Domates',
      price: 14.90,
      unit: 'kg',
      category: 'Meyve & Sebze',
      seller: 'Çivril Organik',
      rating: 4.8,
      icon: 'food-apple'
    },
    {
      id: 2,
      name: 'Ezine Peyniri',
      price: 189.90,
      unit: 'kg',
      category: 'Süt Ürünleri',
      seller: 'Çivril Mandıra',
      rating: 4.9,
      icon: 'cheese'
    },
    {
      id: 3,
      name: 'Yeşil Mercimek',
      price: 29.90,
      unit: 'kg',
      category: 'Bakliyat',
      seller: 'Bereket Bakliyat',
      rating: 4.7,
      icon: 'food'
    },
    {
      id: 4,
      name: 'Taze Elma',
      price: 12.90,
      unit: 'kg',
      category: 'Meyve & Sebze',
      seller: 'Çivril Bahçe',
      rating: 4.8,
      icon: 'fruit-cherries'
    },
  ];

  const filteredProducts = selectedCategory === 'Tümü' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard} activeOpacity={0.9}>
      <View style={styles.productImageContainer}>
        <MaterialCommunityIcons name={item.icon} size={32} color="#1B5E20" />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.sellerName}>{item.seller}</Text>
        <View style={styles.ratingContainer}>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price.toFixed(2)} ₺</Text>
          <Text style={styles.unit}>/{item.unit}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1B5E20" barStyle="light-content" />
      
 

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#2E7D32',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
    textAlign: 'center',
  },
  categoriesContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  categoriesContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    elevation: 2,
  },
  selectedCategory: {
    backgroundColor: '#2E7D32',
  },
  categoryText: {
    fontSize: 15,
    color: '#424242',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
  productGrid: {
    padding: 16,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: CARD_WIDTH,
    marginBottom: 16,
    elevation: 2,
    overflow: 'hidden',
  },
  productImageContainer: {
    height: 110,
    backgroundColor: '#F1F8E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
  },
  sellerName: {
    fontSize: 13,
    color: '#757575',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 13,
    color: '#757575',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2E7D32',
  },
  unit: {
    fontSize: 13,
    color: '#757575',
    marginLeft: 2,
  },
});

export default MarketPage;