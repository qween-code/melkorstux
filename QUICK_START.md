# ⚡ Quick Start Guide - Talent Bridge

Bu rehber, Talent Bridge platformunu 10 dakikada çalıştırmanızı sağlar.

---

## 🎯 Hızlı Kurulum (3 Adım)

### 1️⃣ Klonla ve Kur

```bash
git clone https://github.com/yourusername/talent-bridge.git
cd talent-bridge
npm run setup
```

### 2️⃣ Environment Ayarla

```bash
# Backend
cd backend
cp .env.example .env
# .env dosyasını düzenle (en azından MERCOR_REFERRAL_CODE ekle)

# Frontend
cd ../frontend
cp .env.example .env
```

### 3️⃣ Veritabanı ve Başlat

```bash
# Root dizine dön
cd ..

# Database oluştur
cd backend
npm run db:migrate
npm run db:seed

# Tüm sistemi başlat
cd ..
npm run dev
```

✅ Frontend: http://localhost:3000
✅ Backend API: http://localhost:3001

---

## 🚀 İlk 5 Dakika

### 1. İlk İşinizi Ekleyin (Dashboard)

1. http://localhost:3000 adresini açın
2. **Jobs** → **Add Job** butonuna tıklayın
3. Formu doldurun:

```yaml
Title: Senior AI Engineer
Company: Anthropic
Salary: 120-180 ($/hour)
Location: Remote - Worldwide
Tech Stack: Python, PyTorch, AWS
Referral Link: https://work.mercor.com/jobs/123?ref=YOUR_CODE
```

4. **Save** butonuna tıklayın

### 2. İçerik Oluşturun

1. **Content** → **Generate Content** butonuna tıklayın
2. Platform seçin: **LinkedIn**
3. İşi seçin: Az önce eklediğiniz iş
4. **Generate** butonuna tıklayın

Otomatik olarak paylaşıma hazır içerik üretildi! 🎉

### 3. Analytics'i Görün

1. **Dashboard** sayfasına dönün
2. Canlı istatistiklerinizi görün:
   - Active Jobs
   - Impressions
   - Clicks
   - Revenue

---

## 📱 Sosyal Medya Bağlantısı (Opsiyonel)

### Telegram Bot Kurulumu (5 dk)

1. [@BotFather](https://t.me/botfather) ile konuş
2. `/newbot` komutunu gönder
3. Bot adını gir: `TalentBridgeTR`
4. Bot token'ı kopyala

5. `.env` dosyasına ekle:
```env
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHANNEL_ID=@YourChannelName
```

6. Backend'i yeniden başlat
7. Artık Telegram'dan otomatik paylaşım yapabilirsiniz!

### Discord Webhook (3 dk)

1. Discord sunucunuzda **Server Settings** → **Integrations** → **Webhooks**
2. **New Webhook** oluştur
3. Webhook URL'ini kopyala

4. `.env` dosyasına ekle:
```env
DISCORD_WEBHOOK_URL=your_webhook_url_here
```

5. Backend'i yeniden başlat

---

## 🎨 İlk İçeriğinizi Paylaşın

### Manuel Paylaşım

1. **Content** sayfasına gidin
2. Oluşturduğunuz içeriği bulun
3. Kopyala-yapıştır yöntemiyle LinkedIn'e paylaşın

### Otomatik Paylaşım (Telegram/Discord aktifse)

1. Content oluştururken **Schedule** seçin
2. Zaman belirleyin
3. Platform seçin: **Telegram** veya **Discord**
4. **Post** butonuna tıklayın

Sistem otomatik olarak belirtilen zamanda paylaşacak!

---

## 📊 İlk Metriklerinizi Görün

### Tracking Test

1. Bir işi açın: **Jobs** → İş kartına tıkla
2. **Apply** butonuna tıklayın
3. **Dashboard** → Impression ve Click sayıları arttı!

### Analytics'i İnceleyin

- **Analytics** sayfasına gidin
- Platform performansını görün
- Conversion funnel'ı inceleyin

---

## 🔥 Pro İpuçları

### 1. Toplu İçerik Üretimi

```bash
# Backend konsolunda
curl -X POST http://localhost:3001/api/content/generate \
  -H "Content-Type: application/json" \
  -d '{"job_id":"job_123","platform":"linkedin"}'
```

### 2. Haftalık Rapor

Dashboard'dan haftalık performans özetini CSV olarak export edin.

### 3. Şablon Optimizasyonu

En çok tıklanan içerik şablonlarını **Analytics** → **Top Content** bölümünden bulun ve kullanın.

---

## ❓ Hızlı Sorun Giderme

### Port zaten kullanımda

```bash
# Port 3001'i öldür (Backend)
lsof -i :3001
kill -9 <PID>

# Port 3000'i öldür (Frontend)
lsof -i :3000
kill -9 <PID>
```

### Database hatası

```bash
cd backend
rm -rf data/
npm run db:migrate
npm run db:seed
```

### Frontend boş sayfa

```bash
cd frontend
rm -rf node_modules
npm install
npm run dev
```

---

## 🎓 Sonraki Adımlar

1. ✅ [Tam README'yi oku](README.md)
2. ✅ [API Dokümantasyonu](README.md#-api-dokümantasyonu)
3. ✅ [Sosyal Medya Stratejisi](docs/SOCIAL_MEDIA_STRATEGY.md)
4. ✅ [Production Deployment](README.md#-deployment)

---

## 💬 Yardıma mı ihtiyacınız var?

- 📧 Email: turhanhamza@gmail.com
- 🐛 Issue aç: [GitHub Issues](https://github.com/yourusername/talent-bridge/issues)
- 💬 Discussion: [GitHub Discussions](https://github.com/yourusername/talent-bridge/discussions)

---

**Başarılar! 🚀 İlk referral gelirinizi bekliyoruz!**
