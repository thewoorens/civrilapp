# Çivril Belediyesi Mobil Uygulaması

Bu proje, Çivril Belediyesi'nin mobil uygulamasını geliştirmek amacıyla React Native kullanılarak yapılmaktadır. Uygulama, belediye ile vatandaşlar arasındaki iletişimi geliştirmeyi, duyuruları ve hizmetleri daha kolay eriştirilebilir hale getirmeyi hedefler.

---

## 🌐 Proje Hakkında

- **Platform:** React Native (iOS ve Android desteği)
- **Amaç:** Vatandaşların belediye hizmetlerine kolayca ulaşması ve bilgi alışverişini geliştirmek.
- **Temel Özellikler:**
  - Haber ve duyuru takibi.
  - Canlı destek sistemi.
  - Hizmet taleplerini iletme.

---

## 📝 Kurulum Talimatları

### 1. Gereksinimler
- **Node.js:** 14.x veya üstü
- **npm veya yarn:** Paket yöneticisi
- **React Native CLI** veya **Expo CLI** (tercihinize göre)
- **Git:** Kod versiyon yönetimi için

### 2. Projeyi Klonlayın
```bash
git clone https://github.com/kullaniciadi/CivrilApp.git
cd CivrilApp
```

### 3. Bağımlılıkları Yükleyin
```bash
npm install
# veya
yarn install
```

### 4. Uygulamayı Çalıştırın
#### Android
```bash
npx react-native run-android
```
#### iOS
```bash
npx react-native run-ios
```

---

## 🚀 Geliştirme Süreci

### Branch Stratejisi
- **Ana branch:** `main`
  - Korumaya alınmıştır, direkt commit yapılamaz.
- **Geliştirme branch'i:** `develop`
  - Yeni özellikler bu branch'ten geliştirilir.
- **Özellik branch'leri:** `feature/feature-name`
  - Her yeni özellik için ayrı bir branch oluşturulur.

### Pull Request Kuralları
1. Özellik branch'inizi tamamladıktan sonra PR oluşturun.
2. Kod, en az iki ekip üyesi tarafından incelenmelidir.
3. PR onaylandıktan sonra `develop` branch'ine birleştirilir.

---

## 📊 Teknolojiler ve Araçlar
- **React Native**: Mobil uygulama geliştirme.
- **Redux** (Opsiyonel): Durum yönetimi.
- **GitHub**: Kod depolama ve ekip iş birliği.
- **GitHub Actions** (Opsiyonel): CI/CD entegrasyonu.

---

## 🔧 Katkıda Bulunma
1. Bu repoyu fork edin.
2. Yeni bir branch oluşturun: `git checkout -b feature/feature-name`
3. Değişikliklerinizi commit edin: `git commit -m "Açıklayıcı bir mesaj"`
4. Branch'inizi push edin: `git push origin feature/feature-name`
5. Pull Request oluşturun.

---

## ✨ Lisans
Bu proje, Çivril Belediyesi tarafından lisanslanmıştır. Tüm hakları saklıdır.

---

Eğer herhangi bir sorunuz varsa, lütfen proje sorumlusuyla iletişime geçin veya bir [issue](https://github.com/kullaniciadi/CivrilApp/issues) oluşturun.
