# 🚀 Talent Bridge - Remote Job Referral Platform

**Talent Bridge**, global uzak iş fırsatlarını Türk yeteneklerle buluşturan ve referral geliri elde etmenizi sağlayan tam kapsamlı bir platformdur.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

---

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknoloji Stack](#-teknoloji-stack)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [API Dokümantasyonu](#-api-dokümantasyonu)
- [Sosyal Medya Entegrasyonu](#-sosyal-medya-entegrasyonu)
- [Deployment](#-deployment)
- [Katkıda Bulunma](#-katkıda-bulunma)

---

## ✨ Özellikler

### 🎯 Temel Özellikler

- **İş Yönetimi**: İş ilanlarını ekleyin, düzenleyin ve takip edin
- **İçerik Üretimi**: Otomatik sosyal medya içeriği oluşturma
- **Çoklu Platform Desteği**: LinkedIn, Twitter, Discord, Telegram, Reddit
- **Analytics Dashboard**: Gerçek zamanlı performans takibi
- **Gelir Takibi**: Referral komisyonlarını izleyin
- **Link Tracking**: UTM parametreleri ve Bitly entegrasyonu

### 📊 Analytics & Reporting

- Conversion funnel analizi
- Platform performans karşılaştırması
- Günlük/aylık istatistikler
- Gelir raporları
- En çok kazandıran işlerin analizi

### 🤖 Otomasyon

- Otomatik içerik üretimi
- Zamanlanmış paylaşımlar
- Telegram bot entegrasyonu
- Discord webhook desteği
- API tabanlı genişletilebilir yapı

---

## 🛠 Teknoloji Stack

### Backend
- **Node.js** (v18+)
- **Express.js** - RESTful API
- **SQLite** - Hafif ve hızlı veritabanı
- **better-sqlite3** - Senkron SQLite driver

### Frontend
- **React** (v18+)
- **Vite** - Hızlı geliştirme ortamı
- **Tailwind CSS** - Modern UI framework
- **Recharts** - Veri görselleştirme
- **Lucide React** - İkonlar

### Entegrasyonlar
- **Twitter API v2**
- **Telegram Bot API**
- **Discord Webhooks**
- **Bitly API** - URL shortening

---

## 🚀 Kurulum

### Gereksinimler

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Adım 1: Repository'yi Klonlayın

```bash
git clone https://github.com/yourusername/talent-bridge.git
cd talent-bridge
```

### Adım 2: Tüm Bağımlılıkları Yükleyin

```bash
npm run setup
```

Bu komut hem backend hem frontend için tüm bağımlılıkları yükler.

### Adım 3: Environment Variables

#### Backend (.env)

```bash
cd backend
cp .env.example .env
```

`.env` dosyasını düzenleyin ve gerekli bilgileri girin:

```env
NODE_ENV=development
PORT=3001

# Mercor referral bilgileriniz
MERCOR_EMAIL=turhanhamza@gmail.com
MERCOR_REFERRAL_CODE=YOUR_REFERRAL_CODE

# Sosyal medya API anahtarları (opsiyonel)
TWITTER_API_KEY=your_key
TELEGRAM_BOT_TOKEN=your_token
DISCORD_WEBHOOK_URL=your_webhook_url
BITLY_ACCESS_TOKEN=your_token
```

#### Frontend (.env)

```bash
cd frontend
cp .env.example .env
```

Varsayılan ayarlar genellikle yeterlidir.

### Adım 4: Veritabanını Başlatın

```bash
cd backend
npm run db:migrate
npm run db:seed  # Örnek veri ekler (opsiyonel)
```

### Adım 5: Uygulamayı Başlatın

#### Development Mode (Recommended)

Root dizinden her iki servisi de başlatın:

```bash
npm run dev
```

Bu komut hem backend (port 3001) hem frontend (port 3000) servislerini başlatır.

#### Ayrı Ayrı Başlatma

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Adım 6: Tarayıcıda Açın

Frontend: http://localhost:3000
Backend API: http://localhost:3001

---

## 📖 Kullanım

### 1. İlk Yapılandırma

Dashboard'a giriş yaptıktan sonra:

1. **Jobs** bölümünden ilk işinizi ekleyin
2. **Content** bölümünden içerik oluşturun
3. **Analytics** ile performansı takip edin

### 2. İş Ekleme

```javascript
// API Example
POST /api/jobs
{
  "title": "Senior AI/ML Engineer",
  "company": "Anthropic",
  "salary_min": 120,
  "salary_max": 180,
  "location": "Remote - Worldwide",
  "tech_stack": ["Python", "PyTorch", "AWS"],
  "referral_link": "https://work.mercor.com/jobs/123?ref=YOUR_CODE"
}
```

### 3. İçerik Üretme

```javascript
// API Example
POST /api/content/generate
{
  "job_id": "job_123",
  "platform": "linkedin"
}
```

### 4. Analytics Takibi

Dashboard'daki analytics bölümünden:
- Toplam görüntüleme
- Tıklama oranları (CTR)
- Başvuru sayıları
- İşe alım dönüşümleri

---

## 🔌 API Dokümantasyonu

### Jobs API

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/jobs` | Tüm işleri listele |
| GET | `/api/jobs/:id` | Tek bir iş detayı |
| POST | `/api/jobs` | Yeni iş ekle |
| PUT | `/api/jobs/:id` | İşi güncelle |
| DELETE | `/api/jobs/:id` | İşi sil (soft delete) |
| GET | `/api/jobs/stats` | İş istatistikleri |
| POST | `/api/jobs/:id/click` | Tıklama takibi |

### Content API

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/content` | Tüm içerikleri listele |
| GET | `/api/content/:id` | Tek bir içerik detayı |
| POST | `/api/content` | Yeni içerik ekle |
| POST | `/api/content/generate` | İçerik oluştur |
| PUT | `/api/content/:id` | İçeriği güncelle |
| DELETE | `/api/content/:id` | İçeriği sil |

### Analytics API

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/analytics/dashboard` | Dashboard özeti |
| GET | `/api/analytics/jobs/:id` | İş bazlı analytics |
| GET | `/api/analytics/platforms` | Platform performansı |
| GET | `/api/analytics/funnel` | Conversion funnel |
| GET | `/api/analytics/revenue` | Gelir istatistikleri |
| POST | `/api/analytics/track` | Event tracking |

### API Response Format

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

---

## 📱 Sosyal Medya Entegrasyonu

### Twitter/X

1. [Twitter Developer Portal](https://developer.twitter.com/) üzerinden API anahtarlarınızı alın
2. `.env` dosyasına ekleyin
3. Content bölümünden tweet oluşturun ve paylaşın

### Telegram

1. [@BotFather](https://t.me/botfather) ile yeni bot oluşturun
2. Bot token'ı `.env` dosyasına ekleyin
3. Kanal oluşturun ve botu admin yapın
4. İçerik otomatik olarak paylaşılacak

### Discord

1. Discord sunucunuzda webhook oluşturun
2. Webhook URL'ini `.env` dosyasına ekleyin
3. İçerik otomatik olarak gönderilecek

### LinkedIn

LinkedIn API'nin OAuth 2.0 gerektirdiği için, başlangıçta manuel paylaşım önerilir. İlerleyen versiyonlarda:
- Buffer entegrasyonu
- Hootsuite entegrasyonu
- LinkedIn official API

---

## 🎨 İçerik Şablonları

Sistem aşağıdaki formatta içerik şablonları kullanır:

```javascript
{
  "platform": "linkedin",
  "template_content": `
🚀 {{company}} is hiring {{title}}!

💰 Salary: ${{salary_min}}-{{salary_max}}/hour
🌍 Location: {{location}}
🛠 Stack: {{tech_stack}}

👉 Apply now: {{referral_link}}

#remotejobs #hiring #{{primary_tech}}
  `
}
```

### Değişkenler

- `{{company}}` - Şirket adı
- `{{title}}` - İş pozisyonu
- `{{salary_min}}` - Minimum maaş
- `{{salary_max}}` - Maksimum maaş
- `{{location}}` - Lokasyon
- `{{tech_stack}}` - Teknoloji stack
- `{{requirements}}` - Gereksinimler
- `{{referral_link}}` - Referral linki

---

## 📊 Database Schema

```sql
-- Jobs Table
CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  location TEXT,
  tech_stack TEXT,
  referral_link TEXT NOT NULL,
  status TEXT DEFAULT 'active'
);

-- Content Table
CREATE TABLE content (
  id TEXT PRIMARY KEY,
  job_id TEXT,
  platform TEXT NOT NULL,
  content_text TEXT NOT NULL,
  status TEXT DEFAULT 'draft'
);

-- Analytics Table
CREATE TABLE analytics (
  id TEXT PRIMARY KEY,
  job_id TEXT,
  metric_type TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Revenue Table
CREATE TABLE revenue (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  commission_amount REAL NOT NULL,
  payment_status TEXT DEFAULT 'pending'
);
```

---

## 🚢 Deployment

### Vercel (Frontend)

```bash
cd frontend
npm run build
vercel deploy
```

### Railway / Render (Backend)

1. GitHub'a push yapın
2. Railway/Render'da yeni proje oluşturun
3. Repository'yi bağlayın
4. Environment variables'ı ekleyin
5. Deploy edin

### VPS (Full Stack)

```bash
# PM2 ile production deployment
npm install -g pm2

# Backend
cd backend
pm2 start src/index.js --name talent-bridge-api

# Frontend (build and serve)
cd frontend
npm run build
pm2 serve dist 3000 --name talent-bridge-frontend
```

---

## 📈 İş Akışı

### Günlük Rutin

1. **Sabah (09:00)**: Yeni işleri kontrol et ve ekle
2. **Öğle (12:00)**: İçerik oluştur ve planla
3. **Akşam (18:00)**: Analytics kontrol et ve rapor al

### Haftalık Görevler

- **Pazartesi**: Haftalık içerik takvimi hazırla
- **Çarşamba**: Performans analizi yap
- **Cuma**: Haftalık özet raporu oluştur

### Aylık Görevler

- Gelir raporunu incele
- En iyi performans gösteren platformları belirle
- Strateji optimizasyonu yap

---

## 🔐 Güvenlik

- API key'leri **asla** commit etmeyin
- `.env` dosyaları `.gitignore`'da olmalı
- Production'da HTTPS kullanın
- Rate limiting aktif
- Input validation mevcut

---

## 🐛 Sorun Giderme

### Backend Başlamıyor

```bash
# Port çakışması kontrolü
lsof -i :3001
kill -9 <PID>

# Database sorunları
rm backend/data/talent-bridge.db
npm run db:migrate
```

### Frontend Build Hatası

```bash
# Cache temizleme
rm -rf node_modules
npm install
npm run build
```

### API Bağlantı Sorunu

Frontend `.env` dosyasında `VITE_API_BASE_URL`'nin doğru olduğundan emin olun.

---

## 📚 Daha Fazla Kaynak

- [Mercor Platform](https://work.mercor.com/explore)
- [Twitter API Docs](https://developer.twitter.com/en/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Discord Webhooks](https://discord.com/developers/docs/resources/webhook)

---

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📝 License

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

## 👨‍💻 Geliştirici

**Turhan Hamza**
- Email: turhanhamza@gmail.com
- GitHub: [@turhanhamza](https://github.com/turhanhamza)

---

## 🙏 Teşekkürler

Bu proje aşağıdaki açık kaynak projeleri kullanmaktadır:

- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)

---

## 🎯 Roadmap

### v1.1 (Q2 2025)
- [ ] AI-powered content generation (OpenAI integration)
- [ ] Multi-user support
- [ ] Email campaign integration
- [ ] Advanced scheduling with cron jobs

### v1.2 (Q3 2025)
- [ ] Mobile app (React Native)
- [ ] Browser extension
- [ ] WordPress plugin
- [ ] Slack integration

### v2.0 (Q4 2025)
- [ ] Multi-language support
- [ ] White-label solution
- [ ] API marketplace
- [ ] Advanced ML-based optimization

---

## ⭐ Star History

Eğer bu proje işinize yaradıysa, ⭐ vermeyi unutmayın!

---

**Made with ❤️ for the remote work community**
